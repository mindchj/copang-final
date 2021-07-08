import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const MyCopangReview = ({history}) => {

    const [reviewList, setReviewList] = useState([]);
    const uri = "https://alconn.co/api/review/user";
    const getReviewList = async () => {
        const { data } = await axios.get(uri);
        setReviewList(data)
        // console.log(data);
    }
    useEffect(() => { getReviewList() }, [])

    return (
        <div className="review-header">
            <h2>리뷰관리</h2>
            <div className="review-header-section">
                <div className="review-header-section-content">
                    <div style={{ float: 'left', width: '100px', height: '100px' }}><AccountCircleIcon style={{ width: '100%', height: '100%' }}></AccountCircleIcon></div>
                    <div style={{ float: 'left', margin: '3%', fontSize: '15pt' }}>{localStorage.getItem("userId")}</div>
                    <div style={{ float: 'left', width: '1px', height: '74px', border: '1px solid #ddd', marginTop: '2%' }}></div>
                    <div style={{ float: 'left', margin: '3%' }}><span><strong>도움</strong></span><br /><span>0명</span></div>
                    <div style={{ float: 'left', margin: '3%' }}><span><strong>랭킹</strong></span><br /><span>-등</span></div>
                </div>
            </div>
            <div>

            </div>
            <button onClick={() => console.log(reviewList)}>리뷰 버튼 확인하기</button>
            {
                reviewList.data && reviewList.data.map((review, idx) => (
                    <div className="review-box">
                        <Typography variant="h5" gutterBottom color="caption">
                            구매후기 : {review.content}
                        </Typography>
                        <Typography variant="body" gutterBottom color="caption"> {review.itemName} </Typography> {review.optionName ? review.optionName : "옵션이름 메롱"}, {review.optionValue ? review.optionValue : "옶션값 널값"}
                        <span><img src={review.image} alt="review" style={{ width: "100px", height: "100px" }} /></span>
                        <div>별갯수 : {review.rating} </div>
                        <div>등록일 : {review.registerDate}  </div>
                        <div>{review.title}</div>
                        <Box component="fieldset" mb={3} borderColor="transparent">
                            <Rating
                                name="simple-controlled"
                                value={review.rating}
                                readOnly
                            />
                        </Box>
                        <button>삭제</button>
                        <button onClick={() => history.push("/mycopang/review-page/update",review)}>수정하기</button>
                    </div>
                )
                )
            }
        </div>
    )
}


export default MyCopangReview;