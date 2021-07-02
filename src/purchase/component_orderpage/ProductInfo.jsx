import React, { useEffect, useState } from "react";
//import axios from "axios";
import TopSection from "./TopSection";
import MemberInfo from "./MemberInfo";
import ProductCategory from "./ProductCategory";
import BottomSection from "./BottomSection";
import Payment from "./Payment";

function ProductInfo({ location }) {
  const [product, setProduct] = useState([]);
  const [totalPrice, setTotalPrice] = useState();

  const reducer = (accumulator, currentValue) => {
    return accumulator + currentValue;
  };

  const numberFormat = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  useEffect(() => {
    //location.state.from 이 "cart" 이면 cart 라는 서버 DB의 장바구니 테이블에서 데이터를 가져온다.
    //곧 해당 주문은 장바구니 페이지에서 주문하기 버튼을 통해 들어온 것
    //arrayOfPrice 는 단순히 단가 * 수량 = 총 단가 를 계산하기 위한 변수다
    if (location.state.from === "cart") {
      console.log("fromCart진입");
      const data = location.state.list;
      setProduct(data);
      const arrayOfPrice = data.map( (entry) => {
        return entry.price * entry.amount;
      });
      setTotalPrice(arrayOfPrice.reduce(reducer, 0));
    }
    //반대로 location.state 값이 "product"면 해당 주문은 상품 상세 페이지에서 바로구매 기능을 통해 들어온것이며
    //location.state의 어디서 읽어와야 할지 추후 수정
    else if(location.state.from === "product") {
      console.log("not fromCart진입");
      const getDataDirect = async () => {
        const anotherData = [location.state];
        console.log(anotherData);
        setProduct(anotherData);

        const arrayOfPrice = anotherData.map((entry) => {
          return entry.price * entry.amount;
        });
        //console.log(arrayOfPrice);
        setTotalPrice(arrayOfPrice.reduce(reducer, 0));
      };
      getDataDirect();
    }
  }, []);

  return (
    <div>
      <TopSection totalPrice={totalPrice} />
      <MemberInfo />
      <ProductCategory />

      {/* 매핑을 사용해서 상품 리스트를 읽어와서 반복출력을 한다 
        물론 바로구매로 들어왔으면 상품 한개만 출력이 된다*/}
      {product.map((entry, idx) => {
        return (
          <div key={idx} className="row product">
            <div className="col-1 productImage">
              <img src={entry.mainImg} alt="product img"></img>
            </div>
            <div className="col-5">
              <h5 className="productName">
                {entry.itemName}
              </h5>
              {/* <h6>Item No: {entry.itemId}</h6>
              <h6>판매자: {"no data"}</h6>
              <h6>Details: {"no data"}</h6> */}
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
      <Payment />
      <BottomSection totalPrice={totalPrice} />
    </div>
  );
}

export default ProductInfo;
