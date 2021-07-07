import React, { useEffect } from "react";
import axios from 'axios';
import { useState } from "react";

function BottomSection(props) {
  
  const [orderId, setOrderId] = useState();
  const [callbackRes, setCallbackRes] = useState();
  const [pgRequest, setPgRequest] = useState({
    pg: 'kakaopay',                           // PG사
    pay_method: 'card',                           // 결제수단
    merchant_uid: `mid_${new Date().getTime()}`,   // 주문번호
    amount: 200,                                 // 결제금액
    name: '아임포트 결제 데이터 분석',                  // 주문명
    // buyer_name: '홍길동',                           // 구매자 이름
    buyer_tel: '01012341234',                     // 구매자 전화번호
    // buyer_email: 'example@example',               // 구매자 이메일
    // buyer_addr: '신사동 661-16',                    // 구매자 주소
    // buyer_postcode: '06018',
    // pg: "kakaopay",
    // merchant_uid : 1,
    // amount : 2,
    // buyer_tel: "010",
  });

  const numberFormat = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  // orderReady 신호 보낸 후 orderId 받아옴
  const orderReady = async () => {
    const orderData = {
      clientId : props.clientId,
      cartId : props.cartId,
      addressId : props.addr.addressId,
      totalAmount : 0, //임시값
      totalPrice : props.totalPrice, // 임시값
      orderItems : props.convert(), //상품들의 배열
    }
    const result = await axios.post("https://alconn.co/api/orders/ready",orderData);
    console.log("ready 리턴값:");
    console.log(result.data.data.orderId);
  }

  useEffect( () => {
    if(orderId == null)
    {
      console.log("orderId == null 입니다");
      return;
    } 
    else
    {
      const {IMP} = window; // html cdn에서 받아옴
      IMP.init('imp48486822');
      IMP.request_pay(pgRequest, callback); //여기서 신호를 보냄
    }
  },[orderId])

  const callback = (res) => {
    console.log("res출력");
    console.log(res);
    setCallbackRes(res);
    const {
      imp_uid,
      success,
      merchant_uid,
      error_msg
    } = res;

    if(success) {

    }
  }


  const placeOrder = () => {
    const orderData = {
      clientId : props.clientId,
      cartId : props.cartId,
      addressId : props.addr.addressId,
      totalAmount : 0, //임시값
      totalPrice : props.totalPrice, // 임시값
      orderItems : props.convert(),
    }
    console.log("orderData:");
    console.log(orderData);

    const axiosPlaceOrder = async () => {
      const result = await axios.post("https://alconn.co/api/orders",orderData);
      console.log("order result:");
      console.log(result);

      //여기서 주문완료후 받아온 response로 결제API 송신

      //이후 받아온 response로 주문API 재송신



      //주문후 기존 장바구니 체크박스 체크한 상품들 비우기
      if(props.from === "cart")
      {
        const cartItems = props.convert();
        for(let i=0; i<cartItems.length; i++)
        {
          const axiosDelCart = () => {
            const res = axios.delete("https://alconn.co/api/cart/item/"+cartItems[i].itemDetailId);
            console.log("delete 결과:");
            console.log(res);
          }
          axiosDelCart();
        }
      }
      
    }
    axiosPlaceOrder();
  }

  return (
    <div>
      <div className="row bottom">
        <div className="col-9">
          <h5 style={{ fontWeight: "bold" }} className="text-right">
            Total Payment:{" "}
          </h5>
        </div>
        <div className="col-3">
          <h3 className="text-right">{props.totalPrice && numberFormat(props.totalPrice)}원</h3>
        </div>
      </div>
      <div className="row button justify-content-end">
        <div className="col-12 button">
          <button type="button" onClick={placeOrder} className="btn btn-primary btn-lg btnOrder">
            Place Order
          </button>
          <button type="button" className="btn btn-danger btn-lg btnCancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default BottomSection;
