import React, { useState, useEffect } from "react";
import AddShoppingCart from "@material-ui/icons/AddShoppingCartRounded";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";

const MyCopangOrderDetail = (props) => {
  // console.log(props.location.state.order.orderId)
  const orderId = props.location.state.order.orderId;
  const uri = "https://alconn.co/api/orders/" + orderId;

  const [orderDetail, setOrderDetail] = useState();

  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
    cartBtn: {
      background: "linear-gradient(315deg, #f7b42c 0%, #fc575e 74%)",
      color: "#fff",
      border: "hidden",
      borderRadius: "5%",
    },
  }));

  const classes = useStyles();

  const getOrderDetail = async () => {
    const data = await axios.get(uri);
    setOrderDetail(data.data.data);
    console.log(data.data.data);
  };
  useEffect(() => {
    getOrderDetail();
  }, []);

  // 주문 목록 -> 장바구니 담기
  const onSendCart = (product) => {
    const sendData = {
      itemDetailId: product.itemDetailId,
      itemId: product.itemId,
      amount: product.amount,
    };

    const axiosAddOneCart = async () => {
      await axios.post("https://alconn.co/api/cart/item", sendData);
    };
    axiosAddOneCart();
    alert("장바구니에 담겼습니다.");
  };
  return (
    <div>
      <h2>주문 상세</h2>
      <div className="container">
        <div className="box-header">
          {/* <div className="header-date">{order.orderId}</div> */}
          <div>
            <span style={{ fontWeight: "bold" }}>
              {orderDetail && orderDetail.orderDate.substring(0, 10)} 주문
            </span>
            <span> 주문번호 {orderDetail && orderDetail.orderId}</span>
          </div>

          <div className="header-detail"></div>
        </div>
        {/* <div >{order.orderStatus}</div> */}
        {orderDetail &&
          orderDetail.orderItems.map((product, history) => (
            <div className="product-container">
              <div className="product-image">
                <img
                  src={product.mainImg}
                  style={{ width: "100%" }}
                  alt="product"
                />
              </div>
              <div className="title-price-divide">
                <div>{product.itemName}</div>
                <div className="price-ea-basket-container">
                  <div className="price-ea-container">
                    <div>{product.price} 원</div>
                  </div>
                  <div>{product.amount} 개</div>
                  <button
                    // className="btn-basket"
                    className={classes.cartBtn}
                    onClick={() => onSendCart(product)}
                  >
                    <AddShoppingCart />
                    장바구니
                  </button>
                </div>
                <br></br>
              </div>
              <div className="btn-container">
                <div className="btn-container-flex">
                  <button
                    className="content-btn btn-1"
                    onClick={() => props.history.push("/ship-tracking")}
                    style={{ borderColor: "dodgerblue" }}
                  >
                    배송 조회
                  </button>
                  <button className="content-btn btn-2">교환, 반품 신청</button>
                  <button
                    className="content-btn btn-3"
                    onClick={() =>
                      props.history.push({
                        pathname: "/mycopang/review",
                        state: { orderInfo: orderDetail },
                      })
                    }
                  >
                    리뷰 작성하기
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <hr />
      <div>
        <h3>받는사람 정보</h3>
        <div>받는 사람 : {orderDetail && orderDetail.address.receiverName}</div>
        <div>연락처 : {orderDetail && orderDetail.address.receiverPhone}</div>
        <div>
          받는 사람 주소 :{" "}
          {orderDetail &&
            orderDetail.address.address + " " + orderDetail.address.detail}
        </div>
        <div>요청 사항 : {orderDetail && orderDetail.address.preRequest}</div>
      </div>
    </div>
  );
};

export default MyCopangOrderDetail;
