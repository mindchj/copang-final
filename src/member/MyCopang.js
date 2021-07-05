import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, NavLink, Route, Switch } from 'react-router-dom';
import axios from 'axios';
// import DaumPostcode from "react-daum-postcode";

import './css/MyCopang.css';
import './css/OrderList.css';
import './css/Tab.css';

import { MyCopangPay } from './MyCopangPay';
import MyCopangAddress from './MyCopangAddress';
import MyCopangAddressAddForm from './MyCopangAddressForm';
import AddressUpdateForm from './AddressUpdateForm';
import MyCopangReview from './MyCopangReview';
import ProductReviewWriteForm from '../product/ProductList&Detail/ProductReviewWriteForm';

// Navigation
// const MyCopangNavi = () => {
//     return (
//         <nav>
//             <Link exact="true" to="/order">주문목록</Link>
//             <Link exact="true" to="/cancel-return">취소 반품</Link>
//             <Link exact="true" to="/wish">찜 리스트</Link>
//         </nav>
//     )
// }

const Order = ({ history }) => {
    const [orderList, setOrderList] = useState([]);

    const orderListUrl = "https://alconn.co/api/orders/client";
    //getOrderList 비동기 함수 생성 
    useEffect(() => {
        const getOrderList = async () => {
            const { data: { data } } = await axios.get(orderListUrl);
            setOrderList(data);
            console.log(data)
        }
        getOrderList();
    }, [])

    return (
        <div className="mc-main-content">
            <MainTab />
            {
                orderList.map(order => (
                    <div className="container">
                        <div className="box-header">
                            {/* <div className="header-date">{order.orderId}</div> */}
                            <div>{order.orderDate}</div>
                            <div className="header-detail">주문 상세 정보 보기 </div>
                        </div>
                        {/* <div >{order.orderStatus}</div> */}
                        {order.orderItems.map(product => (
                            <div className="product-container">
                            

                                <div className="product-image">
                                    <img src="favicon.ico" alt="product" />
                                </div>
                                <div className="title-price-divide">
                                    <div>아이템 이름 : {product.itemName}</div>
                                    <div className="price-ea-basket-container">
                                        <div className="price-ea-container">
                                            <div>{product.price} 원</div>
                                        </div>
                                        <div>{product.amount} 개</div>
                                        <button className="btn-basket">장바구니 담기</button>
                                    </div>
                                    <br></br>
                                </div>
                                <div className="btn-container">
                                    <div className="btn-container-flex">
                                        <button className="content-btn btn-1">배송 조회</button>
                                        <button className="content-btn btn-2">교환, 반품 신청</button>
                                        <button className="content-btn btn-3" onClick={() => history.push({ pathname: "/mycopang/review", state: { orderId: order.orderId } })}>리뷰 작성하기</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))
            }
        </div>
    )
}
// 취소 교환 환불 탭 내용 
const Cancel = () => {
    return (
        <div>
            <CancelTab />
            <CancelContent />
        </div>
    )
}

const Refund = () => {
    return (
        <div>
            <CancelTab />
            <NoAccount />
        </div>
    )
}
const CancelTab = () => {
    const activeStyle = {
        borderColor: "rgb(23, 149, 199)"
    }
    return (
        <div className="tab-box">
            <NavLink to='/cancel-return' activeStyle={activeStyle} className="tab-box-label">취소 / 반품 </NavLink>
            <NavLink to='/refund-account' activeStyle={activeStyle} className="tab-box-label"> 무통장 환불 </NavLink>
        </div>
    )
}

const CancelContent = () => {
    return (
        <div className="cancel-content">
            <div> 취소 하신 내역이 없습니다.</div>
            <div> 하단 상품목록에 없는 상품은 1:1문의 또는 고객센터(0000-0000)로 문의주세요. </div>
        </div>
    )
}

const NoAccount = () => {
    return (
        <div className="no-account">
            <div className="no-account-title">무통장환불 계좌정보</div>
            <div className="no-account-info">등록된 계좌정보가 없습니다. 환불받으실 계좌를 입력해주세요. </div>
        </div>
    )
}

const MainTab = () => {
    const activeStyle = {
        borderColor: "rgb(23, 149, 199)",
        textDecoration: "none",
        color: "blue"
    }
    return (
        <div className="main-tab">
            <NavLink exact to='/order' style={{ textDecoration: 'none' }} activeStyle={activeStyle} className="tab-box-label" >전체</NavLink>
            <NavLink to='/order' style={{ textDecoration: 'none' }} activeStyle={activeStyle} className="tab-box-label">배송상품</NavLink>
            <NavLink to='/trip' style={{ textDecoration: 'none' }} activeStyle={activeStyle} className="tab-box-label">여행상품</NavLink>
            <NavLink to='/ticket' style={{ textDecoration: 'none' }} activeStyle={activeStyle} className="tab-box-label">티켓상품</NavLink>
        </div>
    )
}

const TripRender = () => {
    return (
        <div className="mc-trip">
            <MainTab />
            <h3>최근 6개월 간 상품이 없습니다.</h3>
        </div>
    )
}

const TicketRender = () => {
    return (
        <div className="mc-ticket">
            <MainTab />
            <div> no data </div>
        </div>
    )
}

// first page
const MyCopangTemplate = () => {
    return (
        <Router>
            <section>
                <div className="mc">
                    <div className="mc-side">
                        <div className="mc-logo">MY 쿠팡</div>
                        <div className="mc-shopping">
                            <ul>
                                <li className="title-mid">My쇼핑</li>
                                <li><Link exact="true" to="/order" style={{ textDecoration: 'none' }}>주문목록</Link></li>
                                <li><Link exact="true" to="/cancel-return" style={{ textDecoration: 'none' }}>취소/반품/교환/환불내역</Link></li>
                                <li>정기배송관리</li>
                                <li>영수증 조회/출력</li>
                            </ul>
                        </div>
                        <div className="mc-benefit">
                            <ul>
                                <li className="title-mid">MY 혜택</li>
                                <li>할인쿠폰</li>
                                <li>쿠팡캐시/기프트카드</li>
                            </ul>
                    </div>
                        <div className="mc-activity">
                            <ul>
                                <li className="title-mid">My 활동</li>
                                <li>문의하기</li>
                                <li>문의내역 확인</li>
                                <li><Link exact="true" to="/review-page">리뷰 관리</Link></li>
                                <li>찜 리스트</li>
                            </ul>
                        </div>
                        <div className="mc-info">
                            <ul>
                                <li className="title-mid">My정보</li>
                                <li>개인정보확인/수정</li>
                                <li><Link exact="true" to="co-pay">결제수단/쿠페이 관리</Link></li>
                                <li><Link exact="true" to="/my-addr">배송지 관리</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mc-main">
                        <div className="mc-main-header">
                            <div className="mc-main-header-item">
                                <div>미사용 티켓</div>
                                <span>0</span>
                            </div>
                            <div className="mc-main-header-item">
                                <div>배송중</div>
                                <span>0</span>
                            </div>
                            <div className="mc-main-header-item">
                                <div>할인쿠폰</div>
                                <span>0</span>
                            </div>
                            <div className="mc-main-header-item">
                                <div className="test">
                                    <div>쿠페이머니</div>
                                    <div>0</div>
                                    <div>원</div>
                                </div>
                                <div className="test">
                                    <div>쿠페이머니</div>
                                    <div>0</div>
                                    <div>원</div>
                                </div>
                            </div>
                        </div>
                        <div className="mc-main-content">
                            <Switch>
                                <Route exact path="/order" component={Order} />
                                <Route exact path="/cancel-return" component={Cancel} />
                                <Route path="/trip" component={TripRender} />
                                <Route path="/ticket" component={TicketRender} />
                                <Route path="/refund-account" component={Refund} />
                                <Route path="/co-pay" component={MyCopangPay} />
                                <Route exact path="/my-addr" component={MyCopangAddress} />
                                <Route exact path="/address-add-page" component={MyCopangAddressAddForm} />
                                <Route exact path="/address-update-page" component={AddressUpdateForm} />
                                <Route exact path="/mycopang/review" component={ProductReviewWriteForm} />
                                <Route exact path="/review-page" component={MyCopangReview} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </section>
        </Router>
    )

}

// export default MyCopang;
export default MyCopangTemplate;