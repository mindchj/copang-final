import React, { useState, useEffect } from "react";

const MainTodayDiscovery = (props) => {
  let DRESS_CATEGORY_ID = 15;
  let COSMETICS_CATEGORY_ID = 60;
  let WATCH_CATEGORY_ID = 4069;
  let MILK_CATEGORY_ID = 1054;
  let SHOES_CATEGORY_ID = 2025;
  let JEWELRY_CATEGORY_ID = 0;
  let COOKWARE_CATEGORY_ID = 1060;

  return (
    <React.Fragment>
      <strong style={{ fontSize: "20pt" }}>오늘의 발견</strong>&nbsp;&nbsp;
      <span style={{ fontSize: "15pt", color: "#777" }}>
        {" "}
        | COPANG이 엄선한 가장 HOT한 상품!
      </span>
      <br />
      <br />
      <ul className="MainImage" style={{ float: "left" }}>
        <li className="todayFind"
          onClick={() => {
            props.history.push("/product/category/" + SHOES_CATEGORY_ID);
          }}
          style={{ width: "25%" }}
        >
          <img
            style={{ width: "100%", height: "508px" }}
            alt=""
            src="https://static.alconn.co/image/984ade40-745d-4138-9997-c7fda3493f2e"
          />
        </li>
        <li className="todayFind"
          onClick={() => {
            props.history.push("/product/category/" + DRESS_CATEGORY_ID);
          }}
          style={{ width: "52%" }}
        >
          <img
            style={{ width: "100%", height: "250px" }}
            alt=""
            src="https://static.alconn.co/image/00130026-b9fe-45a9-a5eb-732f016c246d"
          />
        </li>
        <li className="todayFind"
          onClick={() => {
            props.history.push("/product/category/" + COSMETICS_CATEGORY_ID);
          }}
          style={{ width: "20%" }}
        >
          <img
            style={{ width: "100%", height: "250px" }}
            alt=""
            src="https://static.alconn.co/image/b43e2172-05d0-4bfe-a38c-6360325973de"
          />
        </li>
        <li className="todayFind"
          onClick={() => {
            props.history.push("/product/category/" + WATCH_CATEGORY_ID);
          }}
          style={{ width: "23%" }}
        >
          <img
            style={{ width: "100%", height: "250px" }}
            alt=""
            src="https://static.alconn.co/image/03ae243d-dff0-43c7-8f98-b2489e7c6a40"
          />
        </li>
        <li className="todayFind"
          onClick={() => {
            props.history.push("/product/category/" + JEWELRY_CATEGORY_ID);
          }}
          style={{ width: "49%" }}
        >
          <img
            style={{ width: "100%", height: "250px" }}
            alt=""
            src="https://static.alconn.co/image/d40b17f5-8dd5-4b56-b3f4-842f31338492"
          />
        </li>
        <li className="todayFind"
          onClick={() => {
            props.history.push("/product/category/" + COOKWARE_CATEGORY_ID);
          }}
          style={{ width: "49%" }}
        >
          <img
            style={{ width: "100%", height: "500px" }}
            alt=""
            src="https://static.alconn.co/image/9c90e1a7-2197-4e85-b98c-f690dec8f6a4"
          />
        </li>
        <li className="todayFind"
          onClick={() => {
            props.history.push("/product/category/" + MILK_CATEGORY_ID);
          }}
          style={{ width: "49%" }}
        >
          <img
            style={{ width: "100%", height: "500px" }}
            alt=""
            src="https://static.alconn.co/image/d24bcb83-01fc-445a-8139-4a0159b9ad6d"
          />
        </li>
      </ul>
    </React.Fragment>
  );
};

export default MainTodayDiscovery;
