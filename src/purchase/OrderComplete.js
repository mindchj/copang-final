import React, { useEffect } from 'react';
import {Table, Button} from 'reactstrap';
import img from "./component_orderpage/profile.png";

const OrderComplete = ({location : state, history}) => {

    const numberFormat = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    
    return (
        <div>
            {/* 받아온 값 : {JSON.stringify(state)} */}
            <div className = "row top align-items-center">
                <div className = "col-6" >
                    <h1>주문/결제 완료</h1>
                </div>
            </div>
                <div className = "row member">
                    <div className = "col-2">
                        <h3>Customer</h3><br></br>
                        <img src = {img} alt = "profile-pic"></img>
                    </div>
                    <div className = "col memberInfo my-auto" style={{float:'left'}}>
                        <h5>주문 번호 : {state.state && state.state.orderId}</h5>
                        <h5>주문자명 : {state.state && state.state.client.realName}</h5>
                        <h5>주소 : {state.state && state.state.address.address}</h5>
                        <h5>요청 사항 : {state.state && state.state.address.preRequest}</h5>
                    </div>
                    <div className = "col memberInfo my-auto" style={{float:'left'}}>
                        <h5>주문 일시 : {state.state && state.state.orderDate}</h5>
                        <h5>받는 사람 : {state.state && state.state.address.receiverName}</h5>
                        <h5>연락처 : {state.state && state.state.client.phone}</h5>
                        <h5>상세 주소 : {state.state && state.state.address.detail}</h5>
                    </div>
        </div>
        <div className = "row category">
            <div className = "col-6">
                <h5>Product Details</h5>
            </div>
            <div className = "col">
                <h5 className = "text-right">Price</h5>
            </div>
            <div className = "col">
                <h5 className = "text-right">Quantity</h5>
            </div>
            <div className = "col">
                <h5 className = "text-right">Subtotal</h5>
            </div>
        </div>

     
      {state.state && state.state.orderItems.map((entry, idx) => {
        return (
          <div key={idx} className="row product">
            <div className="col-2 productImage">
              <img src={entry.mainImg} alt="product img"></img>
            </div>
            <div className="col-4" >
              <h5 className="productName" style = {{color: "dodgerblue", fontWeight: "bold"}}>
                {entry.itemName}
              </h5>
              <h6>Item No: {entry.itemId}</h6>
              <h6>{entry.optionName}</h6>
              <h6>{entry.optionValue}</h6>
            </div>
            <div className="col-2 my-auto">
              <h6 className="text-right">{numberFormat(entry.price)}원</h6>
            </div>
            <div className="col-2 my-auto">
              <h6 className="text-right">{entry.amount}개</h6>
            </div>
            <div className="col-2 my-auto">
              <h6 className="text-right">{numberFormat(entry.price * entry.amount)}원</h6>
            </div>
          </div>
        );
      })}
      <div className="row bottom">
        <div className="col-9">
          <h5 style={{ fontWeight: "bold" }} className="text-right">
            Total Payment:{" "}
          </h5>
        </div>
        <div className="col-3">
          <h3 className="text-right">{state.state && numberFormat(state.state.totalPrice)}원</h3>
        </div>
      </div>
      <div className="row button justify-content-end">
        <div className="col-12 button">
          <button type="button" onClick={()=>history.push("/")} className="btn btn-primary btn-lg btnOrder">
            홈으로 이동
          </button>
          <button type="button" onClick={()=>history.push("/mycopang")} className="btn btn-primary btn-lg btnCancel">
            주문 목록
          </button>
        </div>
      </div>
      {/* {totalPrice && <BottomSection totalPrice={totalPrice} convert={convert} clientId={location.state.clientId} 
                      cartId={location.state.cartId} from={location.state.from} addr={addr[idx]} payment={payment}/>} */}
    </div>
    );
};

export default OrderComplete;