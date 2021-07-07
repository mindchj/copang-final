import React, { useEffect } from "react";
//import {totalPrice} from "./ProductInfo";
import axios from 'axios';
import { useState } from "react";

function BottomSection(props) {
 
  const numberFormat = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const placeOrder = () => {
    const orderData = {
      clientId : props.clientId,
      cartId : props.cartId,
      addressId : props.addr.addressId,
      totalAmount : 0, //임시값
      totalPrice : 0, // 임시값
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
