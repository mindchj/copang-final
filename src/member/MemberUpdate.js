import axios from "axios";
import React, { useState, useEffect } from "react";

import { Grid, TextField, Typography, Button } from "@material-ui/core";
import { loginUser, getCookie } from "../_actions/user_actions";
import { useDispatch } from "react-redux";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const MemberUpdate = (props, { history }) => {
  let xs = 8;
  const [Username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [Password, setPassword] = useState("");

  const onPasswordHanlder = (e) => {
    setPassword(e.currentTarget.value);
    setUsername(userId.username);
  };

  const [formErrorMessage, setFormErrorMessage] = useState("");

  const fetchUserInfo = async () => {
    const { data } = await axios.get("https://alconn.co/api/user");
    setUserId(data.data);
    console.log(data.data);
  };
  const dispatch = useDispatch();
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const useStyles = makeStyles((abc) => ({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: abc.spacing(2),
      },
    },
  }));
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  // const handleClick = () => {
  //     setOpen(true);
  // };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const checkMessage = () => {
    if (formErrorMessage === "로그인 실패") {
      // <div className={classes.root}>
      // <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
      //     <Alert onClose={handleClose} severity="error">
      //     </Alert>
      // </Snackbar>
      // </div>
      alert("비밀번호를 확인해주세요.");
    }
  };
  const onSubmitHandler = (e) => {
    console.log("SubmitHandler 시작");
    setTimeout((e) => {
      let dataToSubmit = {
        username: Username,
        password: Password,
      };

      dispatch(loginUser(dataToSubmit))
        .then((response) => {
          const accessToken = response.payload.data.access_token;
          if (response.payload.message === "success") {
            window.localStorage.setItem(
              "userId",
              response.payload.data.username
            );
            window.localStorage.setItem("accessToken", accessToken);
            document.cookie = `accessToken=${accessToken}`;
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${getCookie("accessToken")}`;
            props.history.push({
              pathname: "/mycopang/userinfo/updateform",
              state: { userId: userId },
            });
          } else {
            setFormErrorMessage("비밀번호 또는 계정을 확인해주세요");
            checkMessage();
          }
        })
        .catch((err) => {
          setFormErrorMessage("비밀번호 또는 계정을 확인해주세요");
          setTimeout(() => {
            setFormErrorMessage("로그인 실패");
            checkMessage();
          }, 2000);
        });
    }, 500);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  // const user = {
  //     description : userId&&userId.description,
  //     phone : userId&&userId.phone,
  //     profileImage :userId&&userId.profileImage,
  //     realName : userId&&userId.realName,
  //     role : userId&&userId.role,
  //     username : userId&&userId.username,
  //     signInDate : userId&&userId.signInDate
  // }

  return (
    <React.Fragment>
      {/* { userId ? <div><div>{userId.clientId}</div>
                <div>{userId.description}</div>
                <div>{userId.phone}</div>
                <div>{userId.profileImage}</div>
                <div>{userId.realName}</div>
                <div>{userId.role}</div>
                <div>{userId.signInDate}</div>
                <div>{userId.username}</div></div> : "Loading1"} */}
      <div style={{ textAlign: "center", paddingTop: "5%" }}>
        <h2>개인정보 확인하기</h2>
      </div>
      <div
        style={{
          paddingLeft: "30%",
          paddingRight: "30%",
          paddding: "30%",
          /* padding: 30%; */
          paddingTop: "7%",
        }}
      >
        <div>
          {/* <Grid item xs={xs} sm={4}> */}
          아이디
          <TextField
            disabled
            id="username"
            name="username"
            value={userId.username}
            fullWidth
            autoComplete="given-name"
            // onChange={onUsernameHandler}
          />
          {/* </Grid> */}
        </div>
        <div style={{ paddingTop: "10%" }}>
          {/* <Grid item xs={xs} sm={4}> */}
          비밀번호
          <TextField
            required
            id="password"
            name="password"
            type="password"
            fullWidth
            onChange={onPasswordHanlder}
          />
          {/* </Grid> */}
        </div>
        <div style={{ paddingTop: "10%" }}>
          <Button variant="contained" color="primary" onClick={onSubmitHandler}>
            확인하기
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MemberUpdate;
