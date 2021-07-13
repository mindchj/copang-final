import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, CardActions, CardContent, Box } from "@material-ui/core";
import styled from "styled-components";
import MarkunreadMailboxRoundedIcon from "@material-ui/icons/MarkunreadMailboxRounded";
import { PersonRounded, PhoneAndroidRounded } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const MyCopangAddress = ({ history, match, location }, props) => {
  const [addrList, setAddrList] = useState([]);
  // 주소 목록 읽어오기
  const addrListUrl = "https://alconn.co/api/address";
  const getAddrList = async () => {
    const {
      data: { data },
    } = await axios.get(addrListUrl);
    setAddrList(data);
    // console.log(data);
  };
  useEffect(() => {
    getAddrList();
  }, []);
  //
  const onDelete = (addressId) => {
    console.log(addressId);
    const deleteUri = "https://alconn.co/api/address/" + addressId;
    const deleteAddrList = async () => {
      await axios.delete(deleteUri);
    };
    deleteAddrList().then(() => getAddrList());
  };

  const useStyles = makeStyles({
    root: {
      minWidth: 275,
      border: "hidden",
      padding: "5px",
      marginBottom: "5px",
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 14,
      fontStyle: "bold",
    },
    deleteBtn: {
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      border: 0,
      borderRadius: 3,
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      color: "white",
    },
    updateBtn: {
      background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
      border: 0,
      borderRadius: 3,
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      color: "white",
    },
    cardContent: {
      padding: "5px",
      backgroundColor: "beige",
      paddingBottom: "5px",
      marginBottom: "5px",
      borderRadius: 5,
    },
    addBtn: {
      background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
      border: 0,
      borderRadius: 3,
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      color: "white",
    },
  });
  const classes = useStyles();
  return (
    <div className="MyCopangAddr-box" style={{ marginLeft: "2px" }}>
      <Card className={classes.root} variant="outlined">
        {addrList.map((addr) => (
          <Box>
            <CardContent
              className={classes.cardContent}
              key={addr.addressId}
              style={{ border: "1px solid black" }}
            >
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {/* <PersonRounded />  */}
                {addr.receiverName}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {addr.priority === "PRIMARY" ? "기본배송지" : ""}
              </Typography>
              <Typography variant="h6" component="h2">
                {/* <MarkunreadMailboxRoundedIcon color={"primary"} />{" "} */}
                {addr.address} {addr.detail}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {/* <PhoneAndroidRounded />  */}
                {addr.receiverPhone}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {addr.preRequest}
              </Typography>
              <CardActions>
                <Button
                  className={classes.deleteBtn}
                  onClick={() => onDelete(addr.addressId)}
                >
                  삭제
                </Button>
                <Button
                  className={classes.updateBtn}
                  onClick={() =>
                    history.push({
                      pathname: "/mycopang/address-update-page",
                      state: { addrValues: addr },
                    })
                  }
                >
                  수정
                </Button>
              </CardActions>
            </CardContent>
          </Box>
        ))}
        <div
          className="MyCopangAddr-add-wrap"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            className={classes.addBtn}
            onClick={() => history.push("/mycopang/address-add-page")}
          >
            추가하기
          </Button>
        </div>
      </Card>

      <br />
    </div>
  );
};

export default MyCopangAddress;
