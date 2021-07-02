import React, { useEffect } from "react";
//import {totalPrice} from "./ProductInfo";
import axios from 'axios';
import { useState } from "react";

function BottomSection(props) {
  // function cancelOrder(event) {

  // }

  // useEffect(() => {
  //   console.log(props.totalPrice);
  // }, [props.totalPrice]);
const [addId, setAddId] = useState();

useEffect( ()=>{
  const axiosAddress = async () => {
    const res = await axios.get("https://alconn.co/api/address");
    console.log(res.data.data[0].addressId);
    setAddId(res.data.data[0].addressId);
  }
  axiosAddress()
},[])

  const numberFormat = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const placeOrder = () => {
    const orderData = {
      clientId : props.clientId,
      cartId : props.cartId,
      addressId : addId, //임시값, address 작업후 수정
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
      //주문후 기존 장바구니 체크박스 체크한 상품들 비우기
      const cartItems = props.convert();
      // cartItems.map( (item) => {
      //   const axiosDelCart = () => {
      //     const res = axios.delete("https://alconn.co/api/cart/item/"+item.itemDetailId);
      //     console.log(res);
      //   }
      //   axiosDelCart();
      // })
      for(let i=0; i<cartItems.length; i++)
      {
        console.log("for 문 시작");
        const axiosDelCart = () => {
          const res = axios.delete("https://alconn.co/api/cart/item/"+cartItems[i].itemDetailId);
          console.log("delete 결과:");
          console.log(res);
        }
        axiosDelCart();
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
