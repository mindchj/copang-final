import React from "react";

const NewProductConfirmButton = () => {
  return (
    <div className="container-fluid">
      <div className="jumbotron">
        <div className="row">
          <div className="col-12">
            <button
              type="button"
              className="btn btn-primary btn-block"
              style={{ height: "100px", fontSize: "2em" }}
              id="btnConfirm"
            >
              새로운 상품 등록하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProductConfirmButton;
