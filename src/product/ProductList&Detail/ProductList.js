import React, { useEffect, useState } from "react";
// import { Route } from 'react-router-dom';

import axios from "axios";
import "./Product.css";
import ProductListRowItem from "./ProductListRowItem";
import { PuffLoader } from 'react-spinners';
// import CategorySidebar from "./CategorySidebar";

const SHABATH = "샤바스";

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

  const [sortOpt, setSortOpt] = useState("인기순");
  const [sortCheck, setSortCheck] = useState(false);
  const [keyword, setKeyword] = useState("");

  const [header, setHeader] = useState();

  const [load2, setLoad2] = useState(false);
  const [load1, setLoad1] = useState(false);

  const clickOptionSearch = () => {
    const data = {
      price,
      priceOpt,
      priceCheck,
      date,
      dateOpt,
      dateCheck,
      sortOpt,
      sortCheck,
      keyword,
    };
    console.log(data);
    props.history.push("/product/search/option", data);
  };

  const enterPress = (e) => {
    if (e.key == "Enter") clickOptionSearch();
  };

  useEffect(() => {
    setProductList([]);
    setLoad1(false);
    const path = props.match.path;
    if(path.indexOf("/product/header") == -1)
    {
      console.log("false!!");
      setHeader("");
    }

    if (props.match.path === "/product") {
      const res = async () => {
        const result = await axios.get("https://alconn.co/api/item/search");
        setProductList(result.data.data.list);
      };
      res();
    } else if (props.match.path === "/product/search/option") {
      const categoryId = localStorage.getItem("categoryId");
      const keyword = localStorage.getItem("keyword");
      const data = props.location.state;

      // 카테고리에서 productlist로 넘어올 땐 localstorage에서 'keyword' remove 할 것
      // 카테고리 search 시에는 keword 제거, keyword search 시에는 카테고리 제거

      // history에서 받아온 data로 string query 추가
      let params = {};
      if (keyword !== null) {
        params.keyword = keyword.replaceAll(" ", "+");
      }
      if (data.priceCheck === true) {
        if (data.priceOpt === "이상") params.priceOver = data.price;
        else params.priceUnder = data.price;
      }
      if (data.dateCheck === true) {
        if (data.dateOpt === "이전") params.endDate = data.date;
        else params.startDate = data.date;
      }
      if (data.sortCheck == true) {
        if (data.sortOpt === "인기순") params.sorted = "ranking";
        else if (data.sortOpt === "별점순") params.sorted = "rating";
        else if (data.sortOpt === "판매순") params.sorted = "sales";
        else if (data.sortOpt === "가격△") params.sorted = "price";
        else if (data.sortOpt === "가격▽") params.sorted = "priceAsc";
        else if (data.sortOpt === "리뷰순") params.sorted = "review";
        else if (data.sortOpt === "등록일△") params.sorted = "date";
        else if (data.sortOpt === "등록일▽") params.sorted = "dateAsc";
      }
      if (categoryId !== null) {
        params.categoryId = categoryId;
      }

      if (data.sortCheck == true) {
        if (data.sortOpt === "인기순") params.sorted = "ranking";
        else if (data.sortOpt === "별점순") params.sorted = "rating";
        else if (data.sortOpt === "판매순") params.sorted = "sales";
        else if (data.sortOpt === "가격△") params.sorted = "price";
        else if (data.sortOpt === "가격▽") params.sorted = "priceAsc";
        else if (data.sortOpt === "리뷰순") params.sorted = "review";
        else if (data.sortOpt === "등록일△") params.sorted = "date";
        else if (data.sortOpt === "등록일▽") params.sorted = "dateAsc";
      }

      if (categoryId !== null) {
        params.categoryId = categoryId;
      }

      const res = async () => {
        const result = await axios.request({
          url: "https://alconn.co/api/item/search",
          method: "get",
          params,
        });
        if(result.data.data.list.length == 0)
        {
          setLoad1(true)
        }
        else
        {
          setProductList(result.data.data.list);
        }
      };
      res();
    } else if (props.match.path === "/product/header/all") {
      const res = async () => {
        const result = await axios.get("https://alconn.co/api/item/search");
        setProductList(result.data.data.list);
      };
      res();
      setHeader("전체 상품목록");
    }
    else if (props.match.path == "/product/header/hot") {
      const res = async () => {
        const result = await axios.request({
          url: "https://alconn.co/api/item/search",
          method: "get",
          params: { sorted: "ranking" },
        });
        setProductList(result.data.data.list);
      };
      res();
      setHeader("HOT! 인기상품");
    } else if (props.match.path == "/product/header/free") {
      const res = async () => {
        const result = await axios.request({
          url: "https://alconn.co/api/item/search",
          method: "get",
          params: { shippingChargeType: "FREE" },
        });
        setProductList(result.data.data.list);
      };
      res();
      setHeader("무료 배송 상품");
    } else if (props.match.path == "/product/header/review") {
      const res = async () => {
        const result = await axios.request({
          url: "https://alconn.co/api/item/search",
          method: "get",
          params: { sorted: "review" },
        });
        setProductList(result.data.data.list);
      };
      res();
      setHeader("리뷰 많은 상품");
    } else if (props.match.path == "/product/header/new") {
      const res = async () => {
        const result = await axios.request({
          url: "https://alconn.co/api/item/search",
          method: "get",
          params: { sorted: "date" },
        });
        setProductList(result.data.data.list);
      };
      res();
      setHeader("최신 등록 상품");
    } else if(props.match.path == "/product/keyword/:brand")
    {
      const res = async () => {
        console.log(props.match.params);
        const result = await axios.request({
          url: "https://alconn.co/api/item/search",
          method: "get",
          params: { keyword : props.match.params.brand },
        });
        setProductList(result.data.data.list);
      };
      res();
    } else {
      const res = async () => {
        const result = await axios.get(
          "https://alconn.co/api/item/list/categoryid=" +
            props.match.params.categoryId
        );
        localStorage.setItem("categoryId", props.match.params.categoryId);
        localStorage.removeItem("keyword");
        setProductList(result.data.data);
      };
      res();
    }
  }, [props.location.state]);

  return (
    <div style={{ display: "flex" }}>
      <div className="1234">{header}</div>
      {/* <div style={{ float: "left", width: "300px", height: "100px" }}> */}
      {/* <div style={{ marginTop: "10px" }}> */}
      <div style={{ width: "15%" }}>
        <div>
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
            // style={{ width: "100px", float: "left" }}
          />
          <select
            value={priceOpt}
            onChange={(e) => setPriceOpt(e.target.value)}
            className="form-control"
            id="price-option"
            style={{
              // width: "80px",
              // display: "inline-block",
              // marginLeft: "10px",
              marginTop: "18px",
            }}
          >
            <option>이상</option>
            <option>이하</option>
          </select>
          <br />
          <br />
          <input
            checked={dateCheck}
            onChange={(e) => setDateCheck(e.target.checked)}
            type="checkbox"
          />{" "}
          등록일
          <br />
          <input
            type="date"
            value={convertDate()}
            className="form-control"
            // style={{ width: "170px", float: "left" }}
          />
          <select
            value={dateOpt}
            onChange={(e) => setDateOpt(e.target.value)}
            className="form-control"
            id="date-option"
            style={{
              // width: "80px",
              // display: "inline-block",
              // marginLeft: "10px",
              marginTop: "18px",
            }}
          >
            <option>이전</option>
            <option>이후</option>
          </select>
          <br />
          <br />
          <input
            checked={sortCheck}
            onChange={(e) => setSortCheck(e.target.checked)}
            type="checkbox"
          />{" "}
          정렬 기준
          <br />
          <select
            onChange={(e) => setSortOpt(e.target.value)}
            className="form-control"
            id="sort-option"
            // style={{ width: "150px" }}
            // style={{ marginTop: "18px" }}
          >
            <option selected>인기순</option>
            <option>별점순</option>
            <option>판매순</option>
            <option>리뷰순</option>
            <option>가격△</option>
            <option>가격▽</option>
            <option>등록일△</option>
            <option>등록일▽</option>
          </select>
          <br />
          <button
            onClick={clickOptionSearch}
            // style={{ marginTop: "24px" }}
            className="btn btn-primary"
            id="btn-option"
          >
            조건 검색
          </button>
        </div>
      </div>
      <div
        // style={{ display: "inline-block", width: "980px" }}
        style={{ width: "85%", paddingLeft: "3%" }}
        // className="productlist"
      >
        {/* <ul className="searchproduct"> */}
        <div
          className="searchproduct"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {ProductList && ProductList.length == 0 && !load1 &&
            <PuffLoader /> 
          }
          {
            load1 ? <h2 style={{marginTop:'100px',marginLeft:'100px'}}>상품목록이 존재하지 않습니다</h2> : ""
          }
          {ProductList &&
            ProductList.map((row, idx) => (
              <ProductListRowItem
                row={row}
                key={idx}
                no={idx + 1}
                history={props.history}
              />
            ))}
          
          {/* style={{ display: "flex" }} */}
        </div>
        {/* </ul> */}
      </div>
    </div>
  );
};

export default ProductList;
