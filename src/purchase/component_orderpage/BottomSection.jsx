import React, { useEffect } from "react";
import axios from 'axios';
import { useState } from "react";

function BottomSection(props) {
  
  const numberFormat = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const [orderId, setOrderId] = useState();
  const [pgRequest, setPgRequest] = useState({
    pg: 'kakaopay',                           // PG사
    pay_method: 'card',                           // 결제수단
    merchant_uid: `mid_${new Date().getTime()}`,   // 주문번호
    amount: 0,                        // 결제금액
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

  useEffect( () => {
    setPgRequest(
      {
        ...pgRequest,
        amount : props.totalPrice,
      }
    )
  },[])

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
    setOrderId(result.data.data.orderId);
  }

  // orderId 값이 들어오면 IMP.request_pay 실행
  useEffect( () => {
    if(orderId == null)
    {
      return;
    }
    else
    {
      const {IMP} = window; // html cdn에서 받아옴
      IMP.init('imp48486822');
      IMP.request_pay(pgRequest, callback); //여기서 신호를 보냄
    }
  },[orderId])

  // IMP.request_pay로 넘겨준 callback 함수 실행해서 imp_uid 받아옴
  const callback = async (res) => {

    const { imp_uid, success, merchant_uid, error_msg } = res;

    if(success) {
      const result = await axios.post("https://alconn.co/api/orders/"+orderId+"/pay/"+imp_uid) // 우리쪽 api로 imp_uid 보내고 result 받아옴

      //카트에서 주문했으면 주문한 상품들 카트에서 비우기
      if(props.from === "cart")
      {
        const cartItems = props.convert();
        for(let i=0; i<cartItems.length; i++)
        {
          const axiosDelCart = () => {
            const delres = axios.delete("https://alconn.co/api/cart/item/"+cartItems[i].itemDetailId);
            console.log("delete 결과:");
            console.log(delres);
          }
          //axiosDelCart();
        }
      }
      //받아온 result를 완료창에 띄워줌
      props.history.push("/order/complete",result.data.data);
    }
    else
    {
      alert(error_msg);
    }
  }

  const onChangePayment = (e) => {
    setPgRequest(
      {
        ...pgRequest,
        pg : e.target.value,
      }
    )
  }

  return (
    <div>
      <div className = "row payment align-items-center">
            <div className = "col">
                <h5>Payment Option</h5>
                <div className="form-check-inline">
                    <label className="form-check-label">페이코</label>
                        <input checked={pgRequest.pg === "payco" ? true : false} id="payco" type="radio" className="form-check-input" name="payment" value="payco" onChange={onChangePayment}  />
                </div>
                <div className="form-check-inline">
                    <label className="form-check-label">다날</label>
                        <input checked={pgRequest.pg === "danal" ? true : false} id="danal" type="radio" className="form-check-input" name="payment" value="danal" onChange={onChangePayment}  />
                </div>
                <div className="form-check-inline">
                    <label className="form-check-label">카카오페이</label>
                        <input checked={pgRequest.pg === "kakaopay" ? true : false} id="kakaopay" type="radio" className="form-check-input" name="payment" value="kakaopay" onChange={onChangePayment} />
                </div>
            </div>
        </div>
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
          <button type="button" onClick={orderReady} className="btn btn-primary btn-lg btnOrder">
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


const pg_status = {
  kcp:"NHN KCP",
  kcp_billing:"NHN KCP 정기결제",
  uplus:"LGU+",
  nice:"나이스페이",
  jtnet:"JTNet",
  kakaopay:"카카오페이",
  danal:"다날휴대폰소액결제",
  danal_tpay:"다날일반결제",
  mobilians:"모빌리언스 휴대폰소액결제",
  settle:"세틀뱅크",
  syrup:"시럽페이",
  payco:"페이코",
  paypal:"페이팔",
  eximbay:"엑심베이",
  naverco:"주문형-네이버페이",
  naverpay:"결제형-네이버페이",
  smilepay:"스마일페이",
}



export default BottomSection;
