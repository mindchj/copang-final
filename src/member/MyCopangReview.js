import React, { useState, useEffect } from "react";
import axios from "axios";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const MyCopangReview = ({ history }) => {
  const [reviewList, setReviewList] = useState([]);
  const uri = "https://alconn.co/api/review/user";
  const getReviewList = async () => {
    const { data } = await axios.get(uri);
    setReviewList(data);
    console.log(data);
  };
  useEffect(() => {
    getReviewList();
  }, []);
  const useStyles = makeStyles((theme) => ({
    root: {
      // maxWidth: 345,
      width: "30%",
      margin: "1% 1%",
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
      height: "60px",
      width: "60px",
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
  }));

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div className="review-header" style={{ marginLeft: "5px" }}>
      <h2>리뷰관리</h2>
      {reviewList.data && reviewList.data.length > 0 && (
        <React.Fragment>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {reviewList.data &&
                  reviewList.data.length > 0 &&
                  reviewList.data[0].writerName.substring(0, 3)}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={
              reviewList.data &&
              reviewList.data.length > 0 &&
              reviewList.data[0].writerName
            }
            subheader="내가 바로 리뷰어.."
          />
          <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
            {reviewList.data &&
              reviewList.data.map((review, idx) => (
                <Card className={classes.root}>
                  <CardActionArea style={{ minHeight: "340px" }}>
                    {review.image != null && (
                      <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="100%"
                        image={review.image}
                        title="Contemplative Reptile"
                      />
                    )}
                    <CardContent style={{ padding: "5px" }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {review.title}
                      </Typography>
                      <Box
                        component="fieldset"
                        mb={1}
                        borderColor="transparent"
                      >
                        <Rating
                          name="simple-controlled"
                          value={review.rating}
                          readOnly
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {review.itemName}{" "}
                        {review.optionName
                          ? review.optionName
                          : "옵션이름 메롱"}
                        ,{" "}
                        {review.optionValue
                          ? review.optionValue
                          : "옶션값 널값"}{" "}
                        등록일 : {review.registerDate}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        구매후기 : {review.content}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" className={classes.deleteBtn}>
                      삭제
                    </Button>
                    <Button
                      size="small"
                      className={classes.updateBtn}
                      onClick={() =>
                        history.push("/mycopang/review-page/update", review)
                      }
                    >
                      수정
                    </Button>
                  </CardActions>
                  <br />
                </Card>
              ))}
            <br />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default MyCopangReview;
