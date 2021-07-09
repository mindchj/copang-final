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

  useEffect(() => {
    console.log("변화체크");
    console.log(price + "_" + priceOpt + "_" + priceCheck + "_" + date + "_" + dateOpt + "_" + dateCheck);
  }, [price, priceOpt, date, dateOpt]);

  const clickOptionSearch = () => {
    const data = {
      price,
      priceOpt,
      priceCheck,
      date,
      dateOpt,
      dateCheck,
    };
    console.log("data출력");
    console.log(data);
    props.history.push("/product/search/option", data);
  };

  useEffect(() => {
    console.log("ProductList 실행");
    if (props.match.path === "/product") {
      const res = async () => {
        const result = await axios.get("https://alconn.co/api/item/search");
        setProductList(result.data.data.list);
      };
      res();
    } else if (props.match.path == "/product/search/option") {
      console.log("data 출력");
      console.log(props.location.state);
      const data = props.location.state;
      let query = "?";
      if(data.priceCheck == false && data.dateCheck == false)
        return; 
      if (data.priceCheck == true) {
        if (data.priceOpt == "이상") 
            query += "priceOver=";
        else // "이하"
            query += "priceUnder=";
        query += data.price;
      }

      if(data.dateCheck == true) {
        query += "&";
        if(data.dateOpt == "이전")
            query += "endDate=";
        else //이후
            query += "startDate=";
        query += data.date;
      }
      console.log("쿼리 출력");
      console.log(query);

      const res = async () => {
        const result = await axios.get("https://alconn.co/api/item/search"+query);
        console.log(result);
      };
      res();
    } else {
      const res = async () => {
        const result = await axios.get(
          "https://alconn.co/api/item/list/categoryid=" +
            props.match.params.categoryId
        );
        setProductList(result.data.data);
        console.log(result.data);
      };
      res();
    }
  }, []);

const test = () => {
    alert("hi");
}

  return (
    <div className="productlist">
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="collapse"
        data-target="#search-collapse"
      >
        조건 검색
      </button>
      <div id="search-collapse" class="collapse" style={{ marginTop: "10px" }}>
        <div className="row col-10">
          <div className="col-3">
            <input
              value={priceCheck}
              onChange={(e)=>setPriceCheck(e.target.checked)}
              type="checkbox"
            />{" "}
            가격
            <br />
            <input
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
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              className="form-control"
              id="date-input"
            />
          </div>
          <div className="col-2">
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
