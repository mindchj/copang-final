import React from "react";

const OptionList = (props) => {
  return (
    <div className="container-fluid">
      <div className="row optionListCategory">
        <div className="col-1 align-self-center">
          <input type="checkbox" className="form-control-lg"></input>
        </div>
        <div className="col-3">
          <div className="row d-flex justify-content-center">
            <h5>옵션명</h5>
          </div>
          <div className="row d-flex justify-content-center">
            <h5 style={{ color: "dodgerblue" }}>{props.optionName}</h5>
          </div>
        </div>
        <div className="col-2 align-self-center">
          <h5>정상가(원)</h5>
          <button type="button" className="btn btn-secondary" id="btnApplyAll">
            일괄적용
          </button>
        </div>
        <div className="col-2 align-self-center">
          <h5>판매가(원)</h5>
          <button type="button" className="btn btn-secondary" id="btnApplyAll">
            일괄적용
          </button>
        </div>
        <div className="col-2 align-self-center">
          <h5>재고수량</h5>
          <button type="button" className="btn btn-secondary" id="btnApplyAll">
            일괄적용
          </button>
        </div>
        <div className="col-2 align-self-center">
          <h5>모델 번호</h5>
          <button type="button" className="btn btn-secondary" id="btnApplyAll">
            일괄적용
          </button>
        </div>
      </div>

      {props.singleOptionValue.map((option) => {
        return (
          <div className="row optionList">
            <div className="col-1 align-self-center">
              <input type="checkbox" className="form-control-lg"></input>
            </div>
            <div
              className="col-3"
              style={{ textAlign: "center", lineHeight: "50px" }}
            >
              {option}
            </div>
            <div className="col-2 align-self-center">
              <input
                type="text"
                className="form-control"
                placeholder="0"
              ></input>
            </div>
            <div className="col-2 align-self-center">
              <input
                type="text"
                className="form-control"
                placeholder="0"
              ></input>
            </div>
            <div className="col-2 align-self-center">
              <input
                type="text"
                className="form-control"
                placeholder="0"
              ></input>
            </div>
            <div className="col-2 align-self-center">
              <input
                type="text"
                className="form-control"
                placeholder="0"
              ></input>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OptionList;
