import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './ProductReviewModal';
import StarIcon from '@material-ui/icons/Star';

const ProductReviewBottom = (props) => {
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

    const [Review, setReview] = useState([]);
    useEffect(() => {
        const res = async () => {
            const result = await axios.get("https://alconn.co/api/review/" + itemId);
            setReview(result.data.data)
            console.log(result.data)
        }
        res();
    }, [])
    console.log(Review)
    const [modalOpen, setModelOpen] = useState(false);

    const openModal = () => {
        setModelOpen(true);
    }

    const closeModal = () => {
        setModelOpen(false);
    }

    return (
        <div className="product-review-wrap">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="product-review">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="product-review-header">

                    <div style={{ fontWeight: 'bold', fontSize: '1.5em', marginTop: '3%' }}>
                        상품리뷰&nbsp;&nbsp;
                        <span style={{ width: '300px', height: '44' }}>
                            <StarIcon className="star"></StarIcon>
                            <StarIcon className="star"></StarIcon>
                            <StarIcon className="star"></StarIcon>
                            <StarIcon className="star"></StarIcon>
                            <StarIcon className="star"></StarIcon>
                            &nbsp;&nbsp;
                            <span className="reviewlength">{Review.length}</span>
                        </span>
                        <button className="write-review" onClick={() => props.history.push("/mycopang")}>상품리뷰 작성</button>
                        <button className="review-rules" onClick={openModal}>상품리뷰 운영원칙</button>
                    </div>

                    <Modal open={modalOpen} close={closeModal} header="상품평 운영원칙">
                        <div style={{ fontWeight: 'bold', fontSize: '1.5em' }}>※ 상품평 운영원칙 및 관련 법령에 위반되는 경우에는 해당 상품평에 대한 임시 대처, 비공개 전환, 삭제 등의 필요한 조치가 취해질 수 있습니다.</div>
                        ①  본 운영정책에서 말하는 상품평 및 상품문의 게시판(이하 ‘게시판 등’)은 다음과 같습니다.<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;1. 상품평: 상품의 실구매자가 작성하는 ‘상품평게시판’과 ‘상품후기게시판’을 총칭<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;2. 상품문의: 해당 상품에 대한 문의와 답변을 받는 ‘상품문의게시판’<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;3. 판매자평 : 상품의 실구매자가 작성하는 ‘판매자평게시판’과 ‘판매자후기게시판’을 총칭<br />
                        ② 동조 제1항의 게시판 등은 회원의 구매 결정을 위한 참고 자료로 활용되는 것으로, 기본적으로 다음과 같이운영됩니다.<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;1. 회원이 게시판 등에 작성한 게시물은 공개를 원칙으로 합니다.<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;2. 게시판 등에는 개별 게시판의 목적에 맞게 작성된 게시물만이 노출됩니다.<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;3. 게시판 등에 글/댓글 작성시 쿠팡에서 사용되는 ID 일부 및 이미지가 노출됩니다.<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;4. 판매가 종료된 상품의 상품문의는 마이쿠팡의 내 게시물로 이동됩니다.<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;5. 상품문의 중 답변이 완료되거나 의문이 해소된 경우 회원의 동의를 얻어 회사가 게시물을 블라인드 처리할 수 있습니다.<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;6. 회사는 판매 촉진을 위해 포털, 소셜 네트워크 서비스를 포함하여 회사가 승인한 국내외 웹사이트, 모바일 앱 등에 회원이 등록한 상품
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;평 및 판매자평을 공개할 수 있습니다.<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;7. 메일로 발송되는 '쿠팡에 대한 설문조사'를 통하여 받은 회원의 의견 중 상품에 대한 내용이 일정기준에 준하여 선별된 경우 상품평
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;및 판매자평에 노출될 수 있습니다. (별점 평가 포함)<br />
                        ③ 회사는 다음 각 호에 해당하는 경우, 회원이 작성한 게시물을 사전 고지 없이 블라인드 처리 또는 이동, 삭제할 수 있습니다.<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;1. 회사가 제공하는 서비스의 내용이나 화면 구성이 변경되는 경우<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;2. 게시물과 연관된 상품이 노출 중단/품절/수정된 경우<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;3. 회사의 게시물 관련 운영정책에 따라 정해진 기간 또는 시점을 기준으로 조정이 필요한 경우<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;4. 기술적 지원의 어려움 등 회사의 사정으로 인해 더 이상 해당 게시물을 노출할 수 없거나 이동 또는 삭제가필요한 상황인 경우<br />
                        ④ 회사는 회원이 ‘게시판 등’에 작성한 게시물이 본 운영정책을 준수하지 않는 경우 블라인드 처리 또는 이동, 삭제할 수 있으며, 회원이 운
                        &nbsp;&nbsp;&nbsp;&nbsp;영정책을 위반하는 행위를 반복할 경우 게시물 작성 권한 제한 등 적절한 조치를 취할 수 있습니다.<br />
                        ⑤ 회사는 회사의 합병, 영업양도, 회사가 운영하는 사이트 간의 통합, 서비스 개편 등의 사유로 원래의 게시물의 내용을 변경하지 않고 게
                        &nbsp;&nbsp;&nbsp;&nbsp;시물의 게시 위치를 변경할 수 있습니다<br />
                    </Modal><br />

                    <br /><br />
                    <div className="product-review-searchbar">
                        <div className="searchbar-btn" style={{ display: 'inline-block', float: 'left' }}>
                            <div style={{ display: 'inline-block', float: 'left' }}><button className="bestbtn">별점순&nbsp;&nbsp;&nbsp;|</button></div>
                            <div style={{ display: 'inline-block', float: 'left' }}><button className="lastbtn">최신순</button></div>
                        </div>
                        <div style={{ marginRight: '20px' }}>
                            <div style={{ marginTop: '10px' }}><div style={{ width: '30px', display: 'inline-block', float: 'right' }}><span className="search glyphicon glyphicon-search" style={{ padding: '1px', height: '29px', float: "right" }} /></div></div>
                            <div style={{ marginTop: '10px' }}><div style={{ width: '350px', display: 'inline-block', float: 'right' }}><input style={{ width: '350px', height: '30px', borderRight: 'none', float: 'right' }} type="text" placeholder="상품평을 검색해보세요." /></div></div>
                        </div>

                    </div>
                    {
                        Review.length !== 0 ?
                            Review && Review.map((row, idx) => {
                                return (
                                    <div className="product-review-body" row={row} key={idx}>
                                        <div style={{ float: 'left' }}>
                                            <span className="user-photo glyphicon glyphicon-user"></span>
                                        </div>
                                        <div style={{ float: 'left' }}>
                                            <div style={{ float: 'left' }}>{row.writerName}</div>
                                            <span style={{ float: 'left' }}>
                                                <div>
                                                    {
                                                        row.rating === 1 ? <div><StarIcon className="smstar"></StarIcon><span className="writeDate">{row.registerDate}</span></div>
                                                            : row.rating === 2 ? <div><StarIcon className="smstar"></StarIcon><StarIcon className="smstar"></StarIcon><span className="writeDate">{row.registerDate}</span></div>
                                                                : row.rating === 3 ? <div><StarIcon className="smstar"></StarIcon><StarIcon className="smstar"></StarIcon> <StarIcon className="smstar"></StarIcon><span className="writeDate">{row.registerDate}</span></div>
                                                                    : row.rating === 4 ? <div><StarIcon className="smstar"></StarIcon><StarIcon className="smstar"></StarIcon><StarIcon className="smstar"></StarIcon><StarIcon className="smstar"></StarIcon><span className="writeDate">{row.registerDate}</span></div>
                                                                        : row.rating === 5 ? <div><StarIcon className="smstar"></StarIcon><StarIcon className="smstar"></StarIcon><StarIcon className="smstar"></StarIcon><StarIcon className="smstar"></StarIcon><StarIcon className="smstar"></StarIcon><span className="writeDate">{row.registerDate}</span></div> : <div>별x</div>
                                                    }
                                                    {/* <span className="smstar glyphicon glyphicon-star"></span>
                                            <span className="smstar glyphicon glyphicon-star"></span>
                                            <span className="smstar glyphicon glyphicon-star"></span>
                                            <span className="smstar glyphicon glyphicon-star"></span>
                                        <span className="smstar glyphicon glyphicon-star"></span>&nbsp; */}
                                                </div>
                                            </span>&nbsp;&nbsp;
                                        </div>
                                        <div style={{textAlign:'left', color: '#777' }}>{ProductOne.itemName}/{ProductOne.itemDetailFormList && ProductOne.itemDetailFormList[0].optionName}:{ProductOne.itemDetailFormList && ProductOne.itemDetailFormList[0].optionValue}/{row.amount}EA/{row.satisfied===true?<span>만족</span>:<span>불만족</span>}</div>
                                        <br />
                                        <div><span style={{fontSize:'1.3em', fontWeight:'bold'}}>{row.title}</span></div>
                                        <div className="product-review-content">
                                            {row.content}
                                            <div style={{ border: '1px solid black', width: '70px', height: '70px' }}><img style={{ width: '100%', height: '100%' }} alt="" src={row.image} /></div>
                                        </div>
                                    </div>
                                )
                            }) : <div style={{ fontSize: '30pt', width: '100%', textAlign: 'center', borderBottom: '2px solid #555555', height: '300px', lineHeight: '300px' }}>상품리뷰가 없습니다.</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductReviewBottom;