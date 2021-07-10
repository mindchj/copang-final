import React, { useEffect, useState } from "react";
// import { Route } from 'react-router-dom';

import axios from "axios";
import "./Product.css";
import ProductListRowItem from "./ProductListRowItem";

const ProductList = (props) => {

  const convertDate = () => {
    const dt = new Date();
    let year = dt.getFullYear() + "-";
    let month = dt.getMonth() + 1 + "-";
    if (dt.getMonth() + 1 < 10) month = "0" + month;
    let date = dt.getDate() + "";
    if (dt.getDate() < 10) date = "0" + date;

    return year + month + date;
  };
  const [ProductList, setProductList] = useState([]);
  const [price, setPrice] = useState(0);
  const [priceOpt, setPriceOpt] = useState("이상");
  const [priceCheck, setPriceCheck] = useState(false);
  const [date, setDate] = useState(convertDate());
  const [dateOpt, setDateOpt] = useState("이전");
  const [dateCheck, setDateCheck] = useState(false);
  const [keyword, setKeyword] = useState("");

  const clickOptionSearch = () => {
    const data = {
      price, priceOpt, priceCheck,
      date, dateOpt, dateCheck,
      keyword,
    };
    props.history.push("/product/search/option", data);
  };

  const enterPress = (e) => {
    if(e.key == 'Enter')
      clickOptionSearch();
  }

  useEffect(() => {
    if (props.match.path === "/product") {
      const res = async () => {
        const result = await axios.get("https://alconn.co/api/item/search");
        setProductList(result.data.data.list);
      };
      res();
    } else if (props.match.path === "/product/search/option") {
      const data = props.location.state;

      // history에서 받아온 data로 string query 추가
      let params = {};
      if(data.keyword !=="")
        params.keyword = data.keyword.replaceAll(" ","+");
      if(data.priceCheck === true)
      {
        if(data.priceOpt === "이상")
          params.priceOver = data.price;
        else
          params.priceUnder = data.price;
      }
      if(data.dateCheck === true)
      {
        if(data.dateOpt === "이전")
          params.endDate = data.date;
        else
          params.startDate = data.date;
      }

      const res = async () => {
        const result = await axios
        .request({
          url:"https://alconn.co/api/item/search",
          method:"get",
          params,
        })
        setProductList(result.data.data.list);
      };
      res();
    } else {
      const res = async () => {
        const result = await axios.get(
          "https://alconn.co/api/item/list/categoryid=" +
            props.match.params.categoryId
        );
        setProductList(result.data.data);
      };
      res();
    }
  }, [props.location.state]);

  return (
    <div className="productlist">
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="collapse"
        data-target="#search-collapse"
      >
        조건 검색
      </button>
      <div id="search-collapse" className="collapse" style={{ marginTop: "10px" }}>
        <div className="row col-10">
          <div className="col-3">
            <input
              value={priceCheck}
              onChange={(e) => setPriceCheck(e.target.checked)}
              type="checkbox"
            />{" "}
            가격
            <br />
            <input
              onKeyPress={enterPress}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="text"
              className="form-control"
              id="price-input"
            />
          </div>
          <div className="col-2">
            <br />
            <select
              value={priceOpt}
              onChange={(e) => setPriceOpt(e.target.value)}
              className="form-control"
              id="price-option"
            >
              <option>이상</option>
              <option>이하</option>
            </select>
          </div>
          <br />
          <div className="col-3">
            <input
              checked={dateCheck}
              onChange={(e) => setDateCheck(e.target.checked)}
              type="checkbox"
            />{" "}
            등록일
            <br />
            <br />

            <select
              value={dateOpt}
              onChange={(e) => setDateOpt(e.target.value)}
              className="form-control"
              id="date-option"
            >
              <option>이전</option>
              <option>이후</option>
            </select>
          </div>
          
        </div>
        <br/>
        <div className="row col-10">
          <div className="col-3">
            검색할 상품명
            <input onKeyPress={enterPress} value={keyword} onChange={(e)=>setKeyword(e.target.value)} type="text" className="form-control"/>
          </div>
          <div className="col-2">
            <button
              onClick={clickOptionSearch}
              style={{ marginTop: "24px" }}
              className="btn btn-primary"
              id="btn-option"
            >
              적용
            </button>
          </div>
        </div>

      </div>
      <br />
      <br />
      <ul className="searchproduct">
        {ProductList &&
          ProductList.map((row, idx) => (
            <ProductListRowItem
              row={row}
              key={idx}
              no={idx + 1}
              history={props.history}
            />
          ))}
      </ul>
    </div>
  );
};

export default ProductList;
