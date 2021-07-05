import React from "react";

const WriteProductDetail = () => {
  return (
    <div className="container-fluid">
      <div className="jumbotron">
        <div className="row" style={{ marginBottom: "30px" }}>
          <h2>상품 상세 정보</h2>
        </div>
        <div className="row">
          <div className="col-8">
            <textarea
              className="form-control"
              style={{ height: "500px" }}
              placeholder="상품 상세 정보를 입력해주세요"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteProductDetail;
