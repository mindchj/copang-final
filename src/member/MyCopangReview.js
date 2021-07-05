import React, { useState, useEffect } from 'react';
import axios from 'axios';


const MyCopangReview = () => {

    const [reviewList, setReviewList] = useState();
    const uri = "https://alconn.co/api/review/user";
    const getReviewList = async () => {
        const {data} = await axios.get(uri);
        setReviewList(data)
        console.log(data);
    }
    useEffect(() => { getReviewList() }, [])
    return (
        <div className="review-header">
            <h2>리뷰관리</h2>
            <button onClick={() => console.log(reviewList)}>리뷰 버튼 확인하기</button>
            {/* {
                reviewList.map(review => (
                    <div>
                        <div>{review.itemName}</div><button>수정</button><button>삭제</button>
                        <div>{review.rating} 별모양</div>
                        <div>{review.registerDate} 등록일 </div>
                        <div>{review.title}</div>
                    </div>
                )
                )
            } */}
        </div>
    )
}


export default MyCopangReview;