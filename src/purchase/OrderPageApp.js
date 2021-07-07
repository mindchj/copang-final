import React from "react";
import ProductInfo from "../purchase/component_orderpage/ProductInfo";
import "./Orderpage.css";

function OrderPageApp({ location, history }) {
  return (
    <div className="container">
      <div className="jumbotron">
        <ProductInfo location={location} history={history}/>
      </div>
    </div>
  );
}

export default OrderPageApp;
