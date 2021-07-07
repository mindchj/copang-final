import React from "react";

const OptionList = (props) => {
  return (
    <div className="container-fluid">
      <div className="row optionListCategory">
        <div className="col-1 align-self-center">
          <input type="checkbox" className="form-control-lg"></input>
        </div>
        <div className="col-2 my-auto mx-auto">
          {/* <div className="row d-flex justify-content-center"> */}
          <h5>옵션명</h5>
          {/* </div> */}
          {/* <div className="row d-flex justify-content-center">
            <h5 style={{ color: "dodgerblue" }}>{props.optionName}</h5>
          </div> */}
        </div>
        <div className="col-2 my-auto mx-auto">
          <h5>옵션값</h5>
        </div>
        <div className="col-3 mx-auto">
          <h5>단가(원)</h5>
          <button type="button" className="btn btn-secondary" id="btnApplyAll">
            일괄적용
          </button>
        </div>

        <div className="col-3 mx-auto">
          <h5>재고수량</h5>
          <button type="button" className="btn btn-secondary" id="btnApplyAll">
            일괄적용
          </button>
        </div>
      </div>

      {props.singleOptionValue.map((option, idx) => {
        return (
          <div key={idx} className="row optionList">
            <div className="col-1 align-self-center">
              <input type="checkbox" className="form-control-lg"></input>
            </div>
            <div
              className="col-3"
              style={{ textAlign: "center", lineHeight: "50px" }}
            >
              {option.optionName}
            </div>
            <div
              className="col-3"
              style={{ textAlign: "center", lineHeight: "50px" }}
            >
              {option.optionValue}
            </div>
            <div className="col-3 align-self-center">
              <input
                type="text"
                className="form-control"
                name="price"
                placeholder="0"
                value={props.price}
                onChange={(e) => props.handleChange2(e)}
              ></input>
            </div>
            <div className="col-3 align-self-center">
              <input
                type="text"
                className="form-control"
                placeholder="0"
                name="stockQuantity"
                value={props.stockQuantity}
                onChange={(e) => props.handleChange2(e)}
              ></input>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OptionList;
