import React, { useEffect } from 'react';
import {Table, Button} from 'reactstrap';
import img from "./component_orderpage/profile.png";

const OrderComplete = ({location : state, history}) => {

    const numberFormat = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    
    return (
        <div className="offset-md-2">
            {/* 받아온 값 : {JSON.stringify(state)} */}
            <div className = "col-10 row top align-items-center">
                <div className = "col-6" >
                    <h1><b>주문/결제 완료</b></h1>
                </div>
            </div>
                <div className = "row member">
                    <div className = "col-2">
                        <h4><b>　주문 정보</b></h4><br></br>
                        <img src = {img} alt = "profile-pic"></img>
                    </div>
                    <div className = "col-2 memberInfo my-auto" style={{float:'left'}}>
                        <h5>　</h5> 
                        <h5><b>주문 번호</b></h5>
                        <h5><b>주문자명</b></h5>
                        <h5><b>연락처</b></h5>
                    </div>
                    <div className = "col-2 memberInfo my-auto" style={{float:'left'}}>
                        <h5>　</h5> 
                        <h5>{state.state && state.state.orderId}</h5>
                        <h5>{state.state && state.state.client.realName}</h5>
                        <h5>{state.state && state.state.client.phone}</h5>
                    </div>
                    <div className = "col-2 memberInfo my-auto" style={{float:'left'}}>
                        <h5>　</h5> 
                        <h5><b>주문 날짜</b></h5>
                        <h5><b>받는사람</b></h5>
                        <h5>　</h5> 
                    </div>
                    <div className = "col-2 memberInfo my-auto" style={{float:'left'}}>
                        <h5>　</h5> 
                        <h5>{state.state && state.state.orderDate.substr(0,10)}</h5>
                        <h5>{state.state && state.state.address.receiverName}</h5>
                        <h5>　</h5>
                    </div>
                    <div className="col-2"></div><div className="col-1"></div><div className="col-1"></div>
                    <div className="col-2 memberInfo my-auto" style={{float:'left'}}>
                        <h5><b>주소</b></h5>
                        <h5><b>요청사항</b></h5>
                    </div>
                    <div className="col-6 memberInfo my-auto" style={{float:'left'}}>
                        <h5>{state.state && state.state.address.address+" "+state.state.address.detail}</h5>
                        <h5>{state.state && state.state.address.preRequest}</h5>
                    </div>
               
        </div>
        <div className = "col-10 row category">
            <div className = "col-6">
                <h4><b>상품 상세</b></h4>
            </div>
            <div className = "col-2">
                <h4 className = "text-right"><b>가격</b></h4>
            </div>
            <div className = "col-2">
                <h4 className = "text-right"><b>수량</b></h4>
            </div>
            <div className = "col-2">
                <h4 className = "text-right"><b>소계</b></h4>
            </div>
        </div>

     
      {state.state && state.state.orderItems.map((entry, idx) => {
        return (
          <div key={idx} className="col-10 row product">
            <div className="col-2 productImage">
              <img src={entry.mainImg} alt="product img"></img>
            </div>
            <div className="col-4 mx-auto my-auto" >
              <h5 className="productName" style = {{color: "dodgerblue", fontWeight: "bold"}}>
                {entry.itemName+" "+entry.optionName+" "+entry.optionValue}
              </h5>
            </div>
            <div className="col-2 my-auto">
              <h5 className="text-right">{numberFormat(entry.price)}원</h5>
            </div>
            <div className="col-2 my-auto">
              <h5 className="text-right">{entry.amount}개</h5>
            </div>
            <div className="col-2 my-auto">
              <h5 className="text-right">{numberFormat(entry.price * entry.amount)}원</h5>
            </div>
          </div>
        );
      })}
      <div className="col-10 row bottom">
        <div className="col-10">
          <h3 style={{ fontWeight: "bold" }} className="text-right">
          총 주문액 :{" "}
          </h3>
        </div>
        <div className="col-2">
          <h3 className="text"><b>{state.state && numberFormat(state.state.totalPrice)}원</b></h3>
        </div>
      </div>
      <div className="row button">
        <div className="col-7 button">
          <button type="button" onClick={()=>history.push("/")} className="btn btn-success btn-lg btnOrder">
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