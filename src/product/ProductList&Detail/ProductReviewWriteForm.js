import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import StarIcon from '@material-ui/icons/Star';
import CardTravelIcon from '@material-ui/icons/CardTravel';

const ProductReviewWriteForm = () => {
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
                </div><br /><br/>
                <div className="service-review-question-wrap">
                    <div className="service-review-question">
                        <div style={{marginTop:'3%'}}>
                            <AccountCircleIcon style={{ color: 'purple', width: '50px', fontSize: '30pt'}} /><strong style={{ fontSize: '20pt' }}>서비스 리뷰</strong>
                        </div>
                        <div style={{fontSize:'11pt'}}>로켓배송의 배송,포장,질문,응대 등의 판매자의 전체적인 서비스는 어떠셨나요?</div>
                    </div>
                    <div className="service-review-wrap">
                        <div style={{ float: 'left', lineHeight: '100px' }}><div></div><strong>만족도</strong></div>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span style={{ lineHeight: '100px' }}><ThumbUpIcon></ThumbUpIcon></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span><ThumbDownIcon></ThumbDownIcon></span>
                    </div>
                </div><br /><br/>
                <div className="product-review-wrap">
                    <div className="product-review-question">
                        <div style={{marginTop:'3%'}}>
                            <CardTravelIcon style={{ color: 'orange', width: '50px', fontSize: '30pt' }} /><strong style={{ fontSize: '20pt' }}>상품 품질 리뷰</strong>
                        </div>
                        <div style={{fontSize:'11pt'}}>이 상품의 품질에 대해서 얼마나 만족하시나요?</div>
                    </div>
                    <div className="service-review-wrap">
                        <div style={{ float: 'left' }}><img style={{ width: '100px', height: '100px' }} alt="이미지x" src="" /></div>
                        <span>아이워너 맨즈 육각아령 블랙, 8kg, 2개</span><br />
                        <span style={{ color: 'orange' }}><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /><h style={{ color: 'black' }}>최고</h></span>
                    </div>
                    <div className="review-content">
                        <div style={{ float: 'left' }}><strong>상세리뷰</strong></div>
                        <div style={{ float: 'left', width: '70%', height: '80%' }}><textarea style={{ width: '100%' }}></textarea></div>
                    </div>
                    <div className="review-image-wrap">
                        <div><strong>사진첨부</strong></div>
                        <div><input type="file"></input></div>
                    </div><br />
                    <div>
                        <div><strong>한줄요약</strong></div>
                        <span><textarea></textarea></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductReviewWriteForm;