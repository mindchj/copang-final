import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "reactstrap";
import "./Cart.css";
import productRedux from "../product/AddNewProduct/productRedux";

const Cart = (props) => {
  const [cart, setCart] = useState();
  const [total, setTotal] = useState(0);
  const [refresh, setRefresh] = useState(0);
  const [idx, setIdx] = useState();
  const [allchk, setAllchk] = useState();
  const [clientId, setClientId] = useState();
  const [cartId, setCartId] = useState();

  const a = {
    a: "a",
    b: "b",
  };

  //user의 카트리스트 받아와서 cart 에 저장
  const axiosCartList = async () => {
    const { data } = await axios.get("https://alconn.co/api/cart");
    console.log("cartList 결과:");
    console.log(data);
    setCart(data.data.cartItems);
    setClientId(data.data.clientId);
    setCartId(data.data.cartId);
  };

  //refresh 될 때마다 카트리스트 리렌더링
  useEffect(() => {
    axiosCartList();
  }, [refresh]);

  // cart 내역 바뀔때마다 항목 갯수 업데이트
  useEffect(() => {
    cart && setIdx(cart.length);
    getTotal();
  }, [cart]);

  useEffect(() => {
    getTotal();
  }, [idx]);

  //카트 항목 1개 증가
  const addCart = (item) => {
    const axiosAddCart = async () => {
      const data = {
        itemId: item.itemId,
        itemDetailId: item.itemDetailId,
        amount: item.amount + 1,
      };
      const result = await axios.post(
        "https://alconn.co/api/cart/item/amount",
        data
      );
      console.log("addCart 결과:");
      console.log(result);
      setRefresh((prev) => prev + 1);
    };
    axiosAddCart();
  };
  //카트 항목 1개 감소
  const removeOneCart = (item) => {
    const axiosRemoveOneCart = async () => {
      const data = {
        itemId: item.itemId,
        itemDetailId: item.itemDetailId,
        amount: item.amount - 1,
      };
      const result = await axios.post(
        "https://alconn.co/api/cart/item/amount",
        data
      );
      console.log("removeOneCart 결과:");
      console.log(result);
      setRefresh((prev) => prev + 1);
    };
    axiosRemoveOneCart();
  };
  //카트 라인 제거
  const removeLineCart = (item) => {
    const axiosRemoveLineCart = async () => {
      const result = await axios.delete(
        "https://alconn.co/api/cart/item/" + item.itemDetailId
      );
      console.log("removeLineCart 결과:");
      console.log(result);
      setRefresh((prev) => prev + 1);
    };
    axiosRemoveLineCart();
  };
  //카트 전부 비우기
  const removeUserCart = () => {
    const axiosRemoveUserCart = async () => {
      const result = await axios.delete("https://alconn.co/api/cart");
      console.log("removeUserCart 결과:");
      console.log(result);
      setRefresh((prev) => prev + 1);
    };
    axiosRemoveUserCart();
  };
  //카트 담긴 내역을 주문서로 이동
  const cartToOrder = () => {
    if (total === 0) alert("주문할 항목을 선택해 주세요");
    else {
      const cartOrder = cart;
      for (let i = idx - 1; i >= 0; i--) {
        const cartIdx = document.getElementById(i);
        if (cartIdx.checked === false) {
          cartOrder.splice(i, 1);
        }
      }
      const cartData = {
        from: "cart",
        clientId: clientId,
        cartId: cartId,
        list: cartOrder,
      };
      console.log(cartData);
      props.history.push("/order/do", cartData);
    }
    //여기서 구매창으로 페이지 이동시킴. 밑의 axios는 원래 구매창에서 실행할 함수
    //여기서 history.push(url)로 구매창 이동시키면 알아서 토큰으로 장바구니 로드해오기
    //구매창 작업자에게, 구매 완료후 장바구니 비워줄 것 요청
  };

  // 체크박스 전체 클릭시 처리
  const onChangeCheckAll = (e) => {
    setAllchk(e.target.checked);
    for (let i = 0; i < idx; i++) {
      document.getElementById(i).checked = e.target.checked;
    }
    getTotal();
  };

  // 체크박스 1 항목 클릭시 처리
  const onChangeCheckOne = (e) => {
    let check = true;
    // 체크박스중 하나라도 false면 전부 false 처리
    for (let i = 0; i < idx; i++) {
      if (document.getElementById(i).checked === false) check = false;
    }
    setAllchk(check);
    getTotal();
  };

  // 주문 총액 계산하여 출력 업데이트
  const getTotal = () => {
    let total = 0;
    cart &&
      cart.map((row, idxorder) => {
        const item = document.getElementById(idxorder);
        if (item.checked === true) total += row.price * row.amount;
        return null;
      });
    setTotal(total);
  };

  const numberFormat = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    // <div style={{ width: "1000px", margin: "0 auto", padding: "20px" }}>
    <div className="layout">
      <h2>
        <b>
          <i className="fas fa-shopping-cart"></i> 장바구니
        </b>
      </h2>
      <br />
      <Table hover>
        <thead>
          <tr>
            <td>
              <div className="form-check">
                <input
                  onChange={onChangeCheckAll}
                  type="checkbox"
                  className="form-check-input"
                  checked={allchk}
                />
              </div>
            </td>
            <td style={{ width: "100px" }}>
              <h4>
                <b>사진</b>
              </h4>
            </td>
            <td style={{ width: "300px" }}>
              <h4>
                <b>상품</b>
              </h4>
            </td>
            <td style={{ width: "100px" }}>
              <h4>
                <b>가격</b>
              </h4>
            </td>
            <td style={{ width: "100px" }}>
              <h4>
                <b>수량</b>
              </h4>
            </td>
            <td style={{ width: "100px" }}>
              <h4>
                <b>합계</b>
              </h4>
            </td>
            <td style={{ width: "290px" }}>
              <Button
                style={{ float: "right" }}
                color="primary"
                onClick={() => removeUserCart(cart[0].userSID)}
              >
                전체 비우기　
                <i className="fas fa-trash" />
              </Button>
            </td>
          </tr>
        </thead>
        <tbody>
          {cart &&
            cart.map((item, idx) => {
              return (
                <tr key={idx} className="body-td">
                  <td>
                    <div className="form-check">
                      <input
                        id={idx}
                        onChange={onChangeCheckOne}
                        type="checkbox"
                        className="form-check-input"
                        value=""
                      />
                    </div>
                  </td>
                  <td>
                    <img
                      alt="사진x"
                      style={{ width: "100px", height: "100px" }}
                      src={item.mainImg}
                    />
                  </td>
                  <td>{item.itemName}</td>
                  <td>{numberFormat(item.price)}</td>
                  <td>{item.amount}</td>
                  <td> {numberFormat(item.price * item.amount)}</td>
                  <td>
                    <Button
                      style={{ float: "right" }}
                      color="primary"
                      onClick={() => removeLineCart(item)}
                    >
                      <i className="fas fa-trash-alt" />
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button
                      style={{ float: "right", marginRight: "30px" }}
                      color="primary"
                      onClick={() => removeOneCart(item)}
                    >
                      <i className="fas fa-minus" />
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button
                      style={{ float: "right", marginRight: "10px" }}
                      color="primary"
                      onClick={() => addCart(item)}
                    >
                      <i className="fas fa-plus" />
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <hr />
      {cart && cart[0] && (
        <Button
          style={{ alignItems: "center", float: "right" }}
          size="lg"
          color="primary"
          onClick={cartToOrder}
        >
          주문하기
        </Button>
      )}
      <h2 style={{ display: "inline", float: "right", marginRight: "30px" }}>
        총 주문액 {numberFormat(total)} 원
      </h2>
    </div>
  );
};

export default Cart;
