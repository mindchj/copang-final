import React, { useEffect, useState } from "react";
import axios from "axios";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import StarIcon from "@material-ui/icons/Star";
import ProductDescBottom from "../ProductList&Detail/ProductDescBottom";
import ProductReviewBottom from "../ProductList&Detail/ProductReviewBottom";
import ProductQuestionBottom from "../ProductList&Detail/ProductQuestionBottom";
const numberFormat = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ProductDetail = ({ match, history }) => {
  //history로 보낸 itemId를 match.params로 받음
  let itemId = match.params.itemId;
  //개별상품의 정보를 itemId로 받아 ProductOne에 저장
  const [ProductOne, setProductOne] = useState([]);
  useEffect(() => {
    const res = async () => {
      const result = await axios.get(
        "https://alconn.co/api/item/list/itemid=" + itemId
      );
      setProductOne(result.data.data);
    };
    res();
  }, [itemId]);

  const [ProductList, setProductList] = useState([]);

  useEffect(() => {
    const res = async () => {
      const result = await axios.get(
        "https://alconn.co/api/item/list/categoryid=" + 1080
      );
      setProductList(result.data.data);
    };
    res();
  }, []);
  const [otherRecommandProduct, setOtherRecommandProduct] = useState([]);

  useEffect(() => {
    const res = async () => {
      const result = await axios.get(
        "https://alconn.co/api/item/list/categoryid=" + 4069
      );
      setOtherRecommandProduct(result.data.data);
    };
    res();
  }, []);

  const [su, setSu] = useState(1);
  const upSu = () => {
    setSu(su + 1);
  };
  const downSu = () => {
    if (su > 1) {
      setSu(su - 1);
    }
  };

  const [optIdx, setOptIdx] = useState(0);
  const onChangeOptIdx = (e) => {
    setOptIdx(e.target.selectedIndex);
  };
  return (
    <div className="total-wrap">
      <div className="totaldesc" style={{ marginTop: "50px" }}>
        <div className="header">
          <div
            className="dsecImage"
            style={{ width: "410px", height: "410px" }}
          >
            <img
              className="productImage"
              alt={ProductOne.mainImg}
              src={
                ProductOne.itemDetailFormList &&
                ProductOne.itemDetailFormList[0].mainImg
              }
            />
          </div>
          <div className="productdesc">
            <div
              className="productName"
              style={{ width: "479px", borderBottom: "1px sloid gray" }}
            >
              <h2>{ProductOne.itemName}</h2>
              {ProductOne.description}
            </div>
            <div className="productStar">
              {Math.round(ProductOne.averageRating) === 1 ? (
                <div>
                  <StarIcon className="smstar"></StarIcon>
                  <StarIcon className="emptyStar" />
                  <StarIcon className="emptyStar" />
                  <StarIcon className="emptyStar" />
                  <StarIcon className="emptyStar" />
                </div>
              ) : Math.round(ProductOne.averageRating) === 2 ? (
                <div>
                  <StarIcon className="smstar"></StarIcon>
                  <StarIcon className="smstar"></StarIcon>
                  <StarIcon className="emptyStar" />
                  <StarIcon className="emptyStar" />
                  <StarIcon className="emptyStar" />
                </div>
              ) : Math.round(ProductOne.averageRating) === 3 ? (
                <div>
                  <StarIcon className="smstar"></StarIcon>
                  <StarIcon className="smstar"></StarIcon>
                  <StarIcon className="smstar"></StarIcon>
                  <StarIcon className="emptyStar" />
                  <StarIcon className="emptyStar" />
                </div>
              ) : Math.round(ProductOne.averageRating) === 4 ? (
                <div>
                  <StarIcon className="smstar"></StarIcon>
                  <StarIcon className="smstar"></StarIcon>
                  <StarIcon className="smstar"></StarIcon>
                  <StarIcon className="smstar"></StarIcon>
                  <StarIcon className="emptyStar" />
                </div>
              ) : Math.round(ProductOne.averageRating) === 5 ? (
                <div>
                  <StarIcon className="smstar"></StarIcon>
                  <StarIcon className="smstar"></StarIcon>
                  <StarIcon className="smstar"></StarIcon>
                  <StarIcon className="smstar"></StarIcon>
                  <StarIcon className="smstar"></StarIcon>
                </div>
              ) : (
                <div></div>
              )}
              {ProductOne.countReviews}
            </div>
            <div className="productPrice">
              <div style={{ marginTop: "10px" }}>
                <strong style={{ fontSize: "16pt", color: "#AE0000" }}>
                  {ProductOne.itemDetailFormList &&
                    numberFormat(ProductOne.itemDetailFormList[0].price)}
                </strong>
                원
              </div>
            </div>
            <div className="productSizeColor">
              <div className="productSize">
                {ProductOne.itemDetailFormList &&
                  ProductOne.itemDetailFormList[optIdx].optionName}{" "}
                : &nbsp;
                <select onChange={(e) => onChangeOptIdx(e)}>
                  {ProductOne.itemDetailFormList &&
                    ProductOne.itemDetailFormList.map((row, idx) => {
                      return (
                        <option row={row} key={idx}>
                          {ProductOne.itemDetailFormList[idx].optionValue}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div>
                잔고수량 :{" "}
                {ProductOne.itemDetailFormList &&
                  ProductOne.itemDetailFormList[optIdx].stockQuantity}
              </div>
            </div>
            <div className="productSeller">
              <div className="seller">
                판매자 :{" "}
                {ProductOne.itemDetailFormList &&
                ProductOne.itemDetailFormList.sellerName == null
                  ? "COPANG"
                  : ProductOne.itemDetailFormList &&
                    ProductOne.itemDetailFormList.sellerName}
              </div>
              <div className="deliver">
                택배사 :{" "}
                {ProductOne.shipmentInfoForm &&
                ProductOne.shipmentInfoForm.logisticCompany == null
                  ? "HANJIN"
                  : ProductOne.shipmentInfoForm &&
                    ProductOne.shipmentInfoForm.logisticCompany}
              </div>
            </div>
            <div className="cartPerchase" style={{ width: "500px" }}>
              <div className="prod-buy-quantity" style={{ float: "left" }}>
                <div className="prod-quantity__form">
                  <input
                    type="text"
                    value={su}
                    className="prod-quantity__input"
                    maxLength="6"
                    autoComplete="off"
                    readOnly
                    style={{ float: "left" }}
                  />
                  <div
                    style={{
                      display: "TableCell",
                      verticalAlign: "top",
                      float: "left",
                      height: "40px",
                      width: "20px",
                    }}
                  >
                    <div
                      style={{
                        float: "left",
                        width: "20px",
                        height: "20px",
                        borderBottom: "1px solid #ccc",
                      }}
                    >
                      <button
                        className="prod-quantity__plus"
                        type="button"
                        onClick={upSu}
                      >
                        <ExpandLessIcon
                          style={{ maxWidth: "20px" }}
                        ></ExpandLessIcon>
                      </button>
                    </div>
                    <div style={{ width: "20px", height: "20px" }}>
                      <button
                        className="prod-quantity__minus"
                        type="button"
                        onClick={downSu}
                      >
                        <ExpandMoreIcon
                          style={{ maxWidth: "20px" }}
                        ></ExpandMoreIcon>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="cart"
                onClick={() => {
                  const sendData = {
                    itemDetailId:
                      ProductOne.itemDetailFormList[optIdx].itemDetailId,
                    itemId,
                    amount: su,
                  };
                  const axiosAddOneCart = async () => {
                    const token = localStorage.getItem("accessToken");
                    await axios.post(
                      "https://alconn.co/api/cart/item",
                      sendData,
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    );
                  };
                  axiosAddOneCart();
                  alert("장바구니에 담겼습니다.");
                }}
              >
                장바구니 담기
              </button>
              <button
                className="perchase"
                onClick={() => {
                  const data = {
                    itemName: ProductOne.itemName,
                    price:
                      ProductOne.itemDetailFormList &&
                      ProductOne.itemDetailFormList[optIdx].price,
                    amount: su,
                    mainImg:
                      ProductOne.itemDetailFormList &&
                      ProductOne.itemDetailFormList[optIdx].mainImg,
                    itemNo: itemId,
                    optionValue:
                      ProductOne.itemDetailFormList &&
                      ProductOne.itemDetailFormList[optIdx].optionValue,
                    optionName:
                      ProductOne.itemDetailFormList &&
                      ProductOne.itemDetailFormList[optIdx].optionName,
                    itemDetailId:
                      ProductOne.itemDetailFormList &&
                      ProductOne.itemDetailFormList[optIdx].itemDetailId,
                    from: "product",
                  };
                  history.push("/order/do", data);
                }}
              >
                바로구매
              </button>
            </div>
          </div>
        </div>
        <div className="otherProduct">
          <h2 style={{ marginTop: "20px" }}>이 상품은 어떠신가요?</h2>
          <ul className="otherProduct-ul">
            {ProductList &&
              ProductList.map((row, idx) => {
                if (idx >= 10) return;
                else
                  return (
                    <li
                      className="DescBodyProduct1"
                      row={row}
                      key={idx}
                      onClick={() => {
                        history.push("/product/selectOne/" + row.itemId);
                      }}
                    >
                      <dl>
                        <dt>
                          <img
                            alt={row.mainImg}
                            src={row.mainImg}
                            style={{ width: "230px", height: "230px" }}
                          />
                        </dt>
                        <dd className="desc">
                          <div>
                            <div className="namedesc">
                              <div className="name">{row.itemName}</div>
                            </div>
                            <div className="price-area">
                              <em className="sale">
                                <strong className="price-value">
                                  {numberFormat(row.price)}
                                </strong>
                                원
                              </em>
                            </div>
                          </div>
                        </dd>
                      </dl>
                    </li>
                  );
              })}
          </ul>
        </div>
        <div className="otherProduct">
          <h2 style={{ marginTop: "20px" }}>이달의 HOT한 상품</h2>
          <ul className="otherProduct-ul">
            {otherRecommandProduct &&
              otherRecommandProduct.map((row, idx) => {
                if (idx >= 5) return;
                else
                  return (
                    <li
                      className="DescBodyProduct1"
                      row={row}
                      key={idx}
                      onClick={() => {
                        history.push("/product/selectOne/" + row.itemId);
                      }}
                    >
                      <dl>
                        <dt>
                          <img
                            alt={row.mainImg}
                            src={row.mainImg}
                            style={{ width: "230px", height: "230px" }}
                          />
                        </dt>
                        <dd className="desc">
                          <div>
                            <div className="namedesc">
                              <div className="name">{row.itemName}</div>
                            </div>
                            <div className="price-area">
                              <em className="sale">
                                <strong className="price-value">
                                  {numberFormat(row.price)}
                                </strong>
                                원
                              </em>
                            </div>
                          </div>
                        </dd>
                      </dl>
                    </li>
                  );
              })}
          </ul>
        </div>
        <div className="productMenuBar" style={{ position: "sticky" }}>
          <div>
            <ul className="productMenuBarUl">
              <li className="ProductDescBottom">상품상세</li>
              <li className="ProductReviewBottom">상품리뷰</li>
              <li className="ProductQuestionBottom">상품문의</li>
            </ul>
            <div className="111">
              <ProductDescBottom itemId={itemId} />
            </div>
            <div className="222">
              <ProductReviewBottom itemId={itemId} history={history} />
            </div>
            <div className="333">
              <ProductQuestionBottom itemId={itemId} />
            </div>
          </div>
          {/* <ul className="productMenuBarUl">
            <li
              className="ProductDescBottom"
              onClick={() => {
                history.push("/product/selectOne/" + itemId);
              }}
            >
              상품상세
            </li>
            <li
              className="ProductReviewBottom"
              onClick={() => {
                history.push("/product/selectOne/" + itemId);
              }}
            >
              상품리뷰
            </li>
            <li
              className="ProductQuestionBottom"
              onClick={() => {
                history.push("/product/selectOne/" + itemId);
              }}
            >
              상품문의
            </li>
          </ul> */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
