import React, { useState,useEffect } from 'react';
import axios from 'axios';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import StarIcon from '@material-ui/icons/Star';
import CardTravelIcon from '@material-ui/icons/CardTravel';

//리뷰작성하기클릭->주문목록(orderId보내기)->리뷰작성폼(현재 페이지/orderId받기)
const ProductReviewWriteForm = (props) => {
    let itemId = props.match.params.itemId;
    

    //개별상품의 정보를 itemId로 받아 ProductOne에 저장 
    const [ProductOne, setProductOne] = useState([]);
    useEffect(() => {
        const res = async () => {
            const result = await axios.get("https://alconn.co/api/item/list/itemid=" + itemId);
            setProductOne(result.data.data)
        }
        res();
    }, [itemId])
    // let itemDetailId=ProductOne.itemDetailFormList&&ProductOne.itemDetailFormList[0].itemDetailId;
    
    const [img, setImg] = useState(null);

    const onChange = (e) => {
        setImg(e.target.files[0]);
    }
    const [imgUrl, setimgUrl] = useState()
    const imgUpload = async () => {
        const formData = new FormData()
        formData.append('image', img);
        const res = await axios.post("https://alconn.co/upload", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log(res);
        setimgUrl(res.data.data.publicPath)
    }

    const [review,setReview] =useState({
        "title" : "",
        "content" : ""
    })

    const handleReviewChange = (e) => {
        const { name, value } = e.target;
        setReview({ ...review, [name]: value })
    }


    const reviewData ={
        // "itemId":Number(itemId),
        // "itemDetailId" : itemDetailId,
        // "orderItemId" : 10,
        "title" : review.title,
        "content" : review.content,
        "image" : imgUrl,
        "rating" : 5,
        "satisfied" : true
    }
    const writeReview = () => {
        const axioswriteReview = async () => {
            const token = localStorage.getItem("accessToken");
            const res=await axios.post("https://alconn.co/api/review/register", reviewData,{
                headers:{ Authorization: `Bearer ${token}`
                }
            })
            console.log(res);
        }
        axioswriteReview();
        alert("리뷰가 등록되었습니다.");
    }



    return (
        <div>
            <div style={{ width: '50%', marginLeft: '25%', height: '1200px' }}>
                <div className="review-header-wrap"><span style={{ fontSize: '28pt', fontWeight: 'bolder' }}>리뷰관리</span><span style={{ fontSize: '12pt', color: '#346Aff', cursor: 'pointer' }}>리뷰 운영원칙</span></div>
                <div className="review-header-section">
                    <div className="review-header-section-content">
                        <div style={{ float: 'left', width: '100px', height: '100px' }}><AccountCircleIcon style={{ width: '100%', height: '100%' }}></AccountCircleIcon></div>
                        <div style={{ float: 'left', margin: '3%', fontSize: '15pt' }}>사용자이름</div>
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
                        <span style={{ lineHeight: '100px' }}><ThumbUpIcon></ThumbUpIcon></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span><ThumbDownIcon></ThumbDownIcon></span>
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
                        <div style={{ float: 'left',margin:'2%' }}><img style={{ width: '100px', height: '100px' }} alt="이미지x" src={ProductOne.itemDetailFormList&&ProductOne.itemDetailFormList[0].mainImg} /></div>
                        <span style={{margin:'3%',lineHeight:'130px'}}>{ProductOne.itemName},{ProductOne.itemDetailFormList&&ProductOne.itemDetailFormList[0].optionValue}</span>
                        <span style={{ color: 'orange',margin:'3%' }}><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /><h style={{ color: 'black' }}>최고</h></span>
                    </div>
                    <div className="review-content">
                    <div style={{ float: 'left', margin:'3%' }}><strong>한줄요약</strong></div>
                        <span><textarea name="title" onChange={handleReviewChange} value={review.title}></textarea></span>
                    </div>
                    <div className="review-image-wrap">
                        <div style={{ float: 'left',margin:'3%' }}><strong>사진첨부</strong></div>
                        <span><input type="file" onChange={onChange}></input ><button onClick={imgUpload}>사진등록</button></span>
                    </div>
                    <div style={{borderTop:'1px solid #ddd'}}>
                        <div style={{ float: 'left', margin:'3%' }}><strong>한줄요약</strong></div>
                        <span><textarea name="content" onChange={handleReviewChange} value={review.content}></textarea></span>
                    </div>
                </div>
            </div>
            <button type="submit" onClick={writeReview}>등록하기</button>
        </div>
    )
}

export default ProductReviewWriteForm;