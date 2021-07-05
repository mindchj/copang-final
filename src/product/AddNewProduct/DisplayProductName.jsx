import React from "react";
import ProductAddTest from "./ProductAddTest";

const DisplayProductName = (props) => {
  return (
    <div className="container-fluid">
      <div className="jumbotron">
        <div className="row" style={{ marginBottom: "30px" }}>
          <h2>노출상품명</h2>
        </div>
        <label htmlFor="insertDisplayName" style={{ color: "dodgerblue" }}>
          실제 판매 페이지에 노출되는 상품명입니다
        </label>
        <div className="row">
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              placeholder="노출상품명 입력"
              id="itemName"
              name="itemName"
              required="required"
              value={props.product.itemName}
              onChange={props.handleChange}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayProductName;
