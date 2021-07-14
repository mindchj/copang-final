import React, { useEffect, useState } from "react";
//import axios from "axios";
import TopSection from "./TopSection";
import ProductCategory from "./ProductCategory";
import BottomSection from "./BottomSection";
import img from "./profile.png";
import axios from "axios";

function ProductInfo({ location, history}) {
  const [product, setProduct] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [addr, setAddr] = useState("");
  const [idx, setIdx] = useState();
  const [payment, setPayment] = useState();

  const reducer = (accumulator, currentValue) => {
    return accumulator + currentValue;
  };

  const numberFormat = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const convert = () => {
      let orderData = [];
      for(let i=0; i<product.length; i++)
      {
        orderData.push(
          {
            itemName : product[i].itemName,
            itemDetailId : product[i].itemDetailId,
            optionName : product[i].optionName,
            optionValue : product[i].optionValue,
            itemId : product[i].itemId,
            price : product[i].price,
            amount : product[i].amount,
            unitTotal : product[i].unitTotal,
          }
        )
      }
      return orderData;
  }

  useEffect(() => {
    //location.state.from 이 "cart" 이면 cart 라는 서버 DB의 장바구니 테이블에서 데이터를 가져온다.
    //곧 해당 주문은 장바구니 페이지에서 주문하기 버튼을 통해 들어온 것
    //arrayOfPrice 는 단순히 단가 * 수량 = 총 단가 를 계산하기 위한 변수다
    if (location.state.from === "cart") {
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
      const getDataDirect = async () => {
        const anotherData = [location.state];
        setProduct(anotherData);

        const arrayOfPrice = anotherData.map((entry) => {
          return entry.price * entry.amount;
        });
        setTotalPrice(arrayOfPrice.reduce(reducer, 0));
      };
      getDataDirect();
    }
    getAddr();
  }, []);

  const getAddr = async () => {
    const result = await axios.get("https://alconn.co/api/address");
    const address = result.data.data;
    if(address.length==0)
    {
      alert("기본 배송지를 등록해 주세요");
      history.goBack();
    }
    let idx;
    for(let i=0; i<address.length;i++)
    {
      if(address[i].priority==="PRIMARY")
        idx = i;
    }
    setIdx(idx);
    setAddr(address);
  }

  const getPayment = (e) => {
    setPayment(e.target.value);
  }

  return (
    <div>
      <TopSection totalPrice={totalPrice} />
      <div className = "row member">
            <div className = "col-3">
                <h3>주문자 정보</h3><br></br>
                <img src = {img} alt = "profile-pic"></img>
            </div>
            { addr &&
              <div className = "col-7 memberInfo my-auto">
                  <h5>배송지 선택</h5>
                  <select className="form-control" onChange={(e)=>setIdx(e.target.selectedIndex)}>
                    {addr && addr.map( (row,idx) => 
                      <option key={idx}>{row.address} {row.detail}</option>
                    )}
                  </select><br/>
                  <h5>요청 사항</h5>
                  {addr && addr.length>0 && <input value={addr[idx].preRequest} type="textarea" className="form-control" style={{width:'520px',height:'100px',textAlign:'start'}}/>}
              </div>
            } 
        </div>
      <ProductCategory />

      {/* 매핑을 사용해서 상품 리스트를 읽어와서 반복출력을 한다 
        물론 바로구매로 들어왔으면 상품 한개만 출력이 된다*/}
      {product && product.length>0 && product.map((entry, idx) => {
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
              {entry && entry.price && <h6 className="text-right">{numberFormat(entry.price)}원</h6>}
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
      {/* <div className = "row payment align-items-center">
            <div className = "col">
                <h5>Payment Option</h5>
                <div className="form-check-inline">
                    <label className="form-check-label">페이코</label>
                        <input type="radio" className="form-check-input" name="payment" value="payco" onChange={getPayment}/>
                </div>
                <div className="form-check-inline">
                    <label className="form-check-label">다날</label>
                        <input type="radio" className="form-check-input" name="payment" value="danal" onChange={getPayment}/>
                </div>
                <div className="form-check-inline">
                    <label className="form-check-label">카카오페이</label>
                        <input type="radio" className="form-check-input" name="payment" value="kakaopay" checked onChange={getPayment}/>
                </div>
            </div>
        </div> */}
      {totalPrice && <BottomSection totalPrice={totalPrice} convert={convert} clientId={location.state.clientId} history={history}
                      cartId={location.state.cartId} from={location.state.from} addr={addr[idx]} payment={payment}/>}
    </div>
  );
}

export default ProductInfo;
