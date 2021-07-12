import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const pg_status = {
  kcp: "NHN KCP",
  kcp_billing: "NHN KCP 정기결제",
  uplus: "LGU+",
  nice: "나이스페이",
  jtnet: "JTNet",
  kakaopay: "카카오페이",
  danal: "다날휴대폰소액결제",
  danal_tpay: "다날일반결제",
  mobilians: "모빌리언스 휴대폰소액결제",
  settle: "세틀뱅크",
  syrup: "시럽페이",
  payco: "페이코",
  paypal: "페이팔",
  eximbay: "엑심베이",
  naverco: "주문형-네이버페이",
  naverpay: "결제형-네이버페이",
  smilepay: "스마일페이",
};

function Payment() {
  const [pgRequest, setPgRequest] = useState({
    pg: "kakaopay", // PG사
    pay_method: "card", // 결제수단
    merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
    amount: 200, // 결제금액
    name: "아임포트 결제 데이터 분석", // 주문명
    // buyer_name: '홍길동',                           // 구매자 이름
    buyer_tel: "01012341234", // 구매자 전화번호
    // buyer_email: 'example@example',               // 구매자 이메일
    // buyer_addr: '신사동 661-16',                    // 구매자 주소
    // buyer_postcode: '06018',
    // pg: "kakaopay",
    // merchant_uid : 1,
    // amount : 2,
    // buyer_tel: "010",
  });

  const [orderId, setOrderId] = useState();
  const [completeRes, setCompleteRes] = useState();
  const [callbackRes, setCallbackRes] = useState();

  useEffect(() => {
    if (orderId == null) {
      console.log("orderId == null입니다");
      return;
    }
    const { IMP } = window; // html cdn에서 받아옴
    IMP.init("imp48486822");
    if (!pgRequest.pg || pgRequest.amount !== 0) {
      alert("select!");
    }
    IMP.request_pay(pgRequest, callback); // 여기서 신호를 보냄
  }, [orderId]);

  useEffect(() => {
    if (completeRes == null) {
      console.log("completeRes == null 입니다");
      return;
    }
    console.log("completeRes 결과:");
    console.log(completeRes);
  }, [completeRes]);

  useEffect(() => {
    if (callbackRes == null) {
      console.log("callbackRes == null 입니다");
      return;
    }
    console.log("callbackRes 결과:");
    console.log(callbackRes);
  }, [callbackRes]);

  const onClickPayment = async () => {
    try {
      const orderData = {
        addressId: 1209, //부산
        orderItems: [
          {
            amount: 1,
            itemName: "수박",
            itemId: 61,
            itemDetailId: 62,
            optionName: "aa",
            optionValue: "bb",
            price: 200,
          },
        ],
        totalAmount: 1,
        totalPrice: 20000,
      };
      const result = await axios.post(
        "https://alconn.co/api/orders/ready",
        orderData
      );
      console.log("ready 리턴값:");
      console.log(result.data.data.orderId);
      setOrderId(result.data.data.orderId);
    } catch (err) {
      console.error(err);
    }
  };

  function callback(res) {
    console.log("orderId출력2");
    console.log(orderId);
    console.log("res출력");
    console.log(res);
    setCallbackRes(res);
    const { imp_uid, success, merchant_uid, error_msg } = res;

    if (success) {
      alert("successs! imp_uid:" + imp_uid);

      //res.imp_uid 받아와서
      axios
        .post("https://alconn.co/api/orders/" + orderId + "/pay/" + imp_uid) // 우리쪽 api로 imp_uid를 보내줌
        .then((res) => {
          setCompleteRes(res);
        });

      //받아온 result를 완료창에 띄워줌
    } else {
      alert(`Failed ${error_msg}`);
    }
  }

  return (
    <>
      <button type="button" onClick={onClickPayment}>
        pay
      </button>
      <br />
      orderId : {orderId && orderId}
      <br />
      callBack imp_uid : {callbackRes && callbackRes.imp_uid} <br />
      order result : {completeRes && JSON.stringify(completeRes)}
    </>
  );
}

export default Payment;
