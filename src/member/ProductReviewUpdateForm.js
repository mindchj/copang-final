import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';


//리뷰작성하기클릭->주문목록(orderId보내기)->리뷰작성폼(현재 페이지/orderId받기)
const ProductReviewUpdateForm = (props) => {
    // console.log(props.history.location.state)
    let clientName = localStorage.getItem("userId");
    let orderItemId = props.location.state.orderItemId;
    let itemId = props.location.state.itemId;
    let itemDetailId = props.location.state.itemDetailId;
    let mainImg = props.location.state.image;
    let itemName = props.location.state.itemName;
    let optionValue = props.location.state.optionValue;
    let optionName = props.location.state.optionName;
    let reviewId = props.location.state.reviewId;
    const [value, setValue] = React.useState(props.location.state.rating);

    //만족도 true & false
    const useToggle = (initialState = true) => {
        const [state, setState] = useState(initialState);
        const toggle = useCallback(() => setState(state => !state), []);
        return [state, toggle]
    }

    const [isSatisfied, setIsSatisfied] = useToggle(props.location.state.satisfied);

    useEffect(() => {

    }, [isSatisfied])


    //개별상품의 정보를 itemId로 받아 ProductOne에 저장 

    const [img, setImg] = useState(null);

    const onChange = (e) => {
        setImg(e.target.files[0]);
    }
    //리뷰 작성시 올리는 이미지 mainImg
    const [imgUrl, setimgUrl] = useState(mainImg)
    const imgUpload = async () => {
        const formData = new FormData()
        formData.append('image', img);
        const res = await axios.post("https://alconn.co/upload", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        // console.log(res);
        //서버에 저장된 사진 주소 가져오기 
        setimgUrl(res.data.data.publicPath)
    }

    const [review, setReview] = useState({
        "title": props.location.state.title,
        "content": props.location.state.content
    })

    const handleReviewChange = (e) => {
        const { name, value } = e.target;
        setReview({ ...review, [name]: value })
    }
    // console.log(itemId)
    const reviewData = {
        "itemId": Number(itemId),
        "itemDetailId": itemDetailId,
        "orderItemId": orderItemId,
        "title": review.title,
        "content": review.content,
        "image": imgUrl,
        "rating": value,
        "satisfied": isSatisfied
    }
    // console.log(reviewData)
    // console.log("title(상세리뷰)" + reviewData.title)

    const updateReview = () => {
        const axiosUpdateReview = async () => {
            const res = await axios.put("https://alconn.co/api/review/"+reviewId, reviewData)
            
            console.log(res);
        }
        axiosUpdateReview();

        alert("리뷰가 수정되었습니다.");
    }

    return (
        <div>
            <div style={{ height: '1400px' }}>
                <div className="review-header-wrap"><span style={{ fontSize: '28pt', fontWeight: 'bolder' }}>리뷰관리</span><span style={{ fontSize: '12pt', color: '#346Aff', cursor: 'pointer' }}>리뷰 운영원칙</span></div>
                <div className="review-header-section">
                    <div className="review-header-section-content">
                        <div style={{ float: 'left', width: '100px', height: '100px' }}><AccountCircleIcon style={{ width: '100%', height: '100%' }}></AccountCircleIcon></div>
                        <div style={{ float: 'left', margin: '3%', fontSize: '15pt' }}>{clientName }</div>
                        <div style={{ float: 'left', width: '1px', height: '74px', border: '1px solid #ddd', marginTop: '2%' }}></div>
                        <div style={{ float: 'left', margin: '3%' }}><span><strong>도움</strong></span><br /><span>0명</span></div>
                        <div style={{ float: 'left', margin: '3%' }}><span><strong>랭킹</strong></span><br /><span>-등</span></div>
                    </div>
                </div><br /><br />
                <div className="service-review-question-wrap">
                    <div className="service-review-question">
                        <div style={{ marginTop: '3%' }}>
                            <AccountCircleIcon style={{ color: 'purple', width: '50px', fontSize: '30pt' }} /><strong style={{ fontSize: '20pt' }}>서비스 리뷰</strong>
                        </div>
                        <div style={{ fontSize: '11pt' }}>로켓배송의 배송,포장,질문,응대 등의 판매자의 전체적인 서비스는 어떠셨나요?</div>
                    </div>
                    <div className="service-review-wrap">
                        <div style={{ float: 'left', lineHeight: '100px' }}><div></div><strong>만족도</strong></div>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span onClick={setIsSatisfied} style={{ lineHeight: '100px', cursor: 'pointer' }}>{isSatisfied ? <ThumbUpIcon style={{ color: 'blue' }}></ThumbUpIcon> : <ThumbUpAltIcon></ThumbUpAltIcon>}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span onClick={setIsSatisfied} style={{ lineHeight: '100px', cursor: 'pointer' }}>{isSatisfied ? <ThumbDownAltIcon></ThumbDownAltIcon> : <ThumbDownIcon style={{ color: 'red' }}></ThumbDownIcon >}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                </div><br /><br />
                <div className="product-review-wrap">
                    <div className="product-review-question">
                        <div style={{ marginTop: '3%' }}>
                            <CardTravelIcon style={{ color: 'orange', width: '50px', fontSize: '30pt' }} /><strong style={{ fontSize: '20pt' }}>상품 품질 리뷰</strong>
                        </div>
                        <div style={{ fontSize: '11pt' }}>이 상품의 품질에 대해서 얼마나 만족하시나요?</div>
                    </div>
                    <div className="service-review-wrap">
                        <span style={{ float: 'left', marginTop: '3%' }}>{itemName}, {optionName}, {optionValue}<br /><br />
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <Typography component="legend"></Typography>
                                <Rating
                                    name="simple-controlled"
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }} />
                            </Box>
                        </span>
                    </div>
                    <div className="review-content">
                        <div style={{ float: 'left', margin: '3%' }}><span>상세리뷰</span></div>
                        <span style={{ marginRight: '3%' }}>
                            <TextareaAutosize style={{ float: 'right', marginTop: '3%', marginBottom: '3%', minWidth: '500px', minHeight: '100px' }} name="title" onChange={handleReviewChange} value={review.title}></TextareaAutosize>
                        </span>
                    </div>
                    <div className="review-image-wrap">
                        <div style={{ float: 'left', margin: '3%' }}><span>사진첨부</span></div>
                        <div style={{ float: 'left', width: '100px', height: '100px', border: '1px solid black', marginTop: '3%', marginLeft: '7%' }}><img alt="" src={imgUrl} style={{ width: '100%', height: '100%' }} /></div>
                        <div><input type="file" onChange={onChange} style={{ float: 'left', marginTop: '3%', width: '210px', marginLeft: '70px' }}></input></div>
                        <div><button style={{ float: 'left', marginTop: '3%' }} onClick={imgUpload}>사진등록</button></div>
                    </div>
                    <div style={{ borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', height: '150px' }}>
                        <div style={{ float: 'left', margin: '3%' }}><span>한줄요약</span></div>
                        <span ><textarea style={{ float: 'right', marginTop: '3%', marginBottom: '3%', width: '500px', height: '50px' }} name="content" onChange={handleReviewChange} value={review.content}></textarea></span>

                    </div>
                    <div style={{ textAlign: 'center', marginBottom: '5%' }}><button style={{ marginTop: '5%', color: 'white', backgroundColor: '#346aff', border: 'none', width: '100px', height: '30px' }} type="submit" onClick={updateReview}>수정하기</button></div>
                </div>
            </div>

        </div>
    )
}

export default ProductReviewUpdateForm;