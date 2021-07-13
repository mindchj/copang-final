import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";

const MainBanner = (props) => {
  const SHABATH="shabath"
  return (
    <div id="demo" className="carousel slide" data-ride="carousel">
      <ul className="carousel-indicators">
        <li data-target="#demo" data-slide-to="0" className="active"></li>
        <li data-target="#demo" data-slide-to="1"></li>
        <li data-target="#demo" data-slide-to="2"></li>
      </ul>

      <div
        className="carousel-inner"
        // style={{ width: "1280px", height: "500px" }}
      >
        <div
          className="carousel-item active"
          style={{
            width: "100%",
            height: "100%",
            // marginLeft: "10%",
            // marginTop: "5%",
            // borderRadius: "5%",
            backgroundColor: "#ff494e",
          }}
        >
          <img onClick={()=>props.history.push("/product/category/"+1037)}
            className="layout"
            style={{ width: "100%", height: "100%", cursor:'pointer'}}
            src="https://static.alconn.co/image/aecd5871-3153-464e-847e-49ca115c2d48"
            alt="Los Angeles"
          />
        </div>
        <div
          className="carousel-item"
          style={{
            width: "100%",
            height: "100%",
            // marginLeft: "10%",
            // marginTop: "5%",
            backgroundColor: "#c4c3bf",
          }}
        >
          <img onClick={()=>props.history.push("/product/keyword/"+SHABATH)}
            className="layout"
            style={{ width: "100%", height: "100%", cursor:'pointer'}}
            src="https://static.alconn.co/image/21bd376f-1f84-4585-a46c-40aa219989cd"
            alt="Chicago"
          />
        </div>
        <div
          className="carousel-item"
          style={{
            width: "100%",
            height: "100%",
            // marginLeft: "10%",
            // marginTop: "5%",
            backgroundColor: "#e6e1db",
          }}
        >
          <img  onClick={()=>props.history.push("/product/selectOne/"+7002)}
            className="layout"
            style={{ width: "100%", height: "100%",cursor:'pointer' }}
            src="https://static.alconn.co/image/80126ed2-d110-40cb-994a-ed74c21b5675"
            alt="New York"
          />
        </div>
      </div>

      <a className="carousel-control-prev" href="#demo" data-slide="prev">
        <span className="carousel-control-prev-icon"></span>
      </a>
      <a className="carousel-control-next" href="#demo" data-slide="next">
        <span className="carousel-control-next-icon"></span>
      </a>
    </div>
  );
};

export default withRouter(MainBanner);
