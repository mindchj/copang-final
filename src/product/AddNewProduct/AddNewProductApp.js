import React, { useState } from "react";
import axios from "axios";
import "./Option.css";
// import Option from "./Option";
//import DisplayProductName from "./DisplayProductName";
import CategoryForm from "./CategoryForm";
// import ImgUpload from "./ImgUpload";
// import WriteProductDetail from "./WriteProductDetail";
// import NewProductConfirmButton from "./NewProductConfirmButton";
import AddNewCategoryForm from "./AddNewCategoryForm";

const AddNewProductApp = () => {
  //=============== Image and setImg function ==============//
  const [img, setImg] = useState(null);
  const imageChange = (e) => {
    setImg(e.target.files[0]);
    console.log(e.target.files[0].name);
  };

  //=============== Image URL and set function ==============//
  const [imgUrl, setimgUrl] = useState();
  const imgUpload = async () => {
    const formData = new FormData();
    formData.append("image", img);
    const res = await axios.post("https://alconn.co/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res);
    setimgUrl(res.data.data.publicPath);
  };

  //=============== Changing the product name ==============//
  const [product, setProduct] = useState({
    itemName: "",
    itemComment: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(e.target);
    setProduct({ ...product, [name]: value });
  };

  //=============== Changing product's other properties ==============//
  const [product2, setProduct2] = useState({
    price: 0,
    stockQuantity: 0,
    optionName: "",
    optionValue: "",
  });
  const handleChange2 = (e) => {
    const { name, value } = e.target;
    //console.log(e.target);
    //console.dir(productData);
    setProduct2({ ...product2, [name]: value });
  };

  //=============== THE MAIN DATA TO SEND TO THE SERVER ==============//
  const productData = {
    itemName: product.itemName,
    itemComment: product.itemComment,
    itemDetailFormList: [
      {
        price: product2.price,
        stockQuantity: product2.stockQuantity,
        optionName: product2.optionName,
        optionValue: product2.optionValue,
        mainImg: imgUrl,
      },
    ],
  };
  const addProduct = () => {
    const axiosAddProduct = async () => {
      await axios.post("https://alconn.co/api/item/add", productData);
    };
    axiosAddProduct();
    imgUpload();
    alert("상품이 등록되었습니다.");
  };

  const [optionName, setOptionName] = useState();
  const [optionValue, setOptionValue] = useState();
  const [singleOptionValue, setSingleOptionValue] = useState([]);
  const [optionList, setOptionList] = useState([]);

  const handleChangeName = (e) => {
    setOptionName(e.target.value);
  };

  const handleChangeValue = (e) => {
    setOptionValue(e.target.value);
  };

  const consoleLog = () => {
    console.log(productData);
  };

  const clickAddToList = () => {
    // console.log(`optionName: ${optionName} & optionValue: ${optionValue}`);
    // const valueSplit = product2.optionValue.split(",");
    // setSingleOptionValue(Object.keys(valueSplit).map((key) => valueSplit[key]));
    if (optionList.length === 0) {
    } else if (optionList.length > 0) {
      optionList.push({
        optionName: optionName,
        optionValue: optionValue,
      });
    }

    // console.log(optionList);
  };

  const clickDeleteOption = () => {
    setSingleOptionValue([]);
    setOptionValue("");
    setOptionName("");
  };

  return (
    <div>
      <AddNewCategoryForm />
      {/* ############################### 상품명 입력 부분 ################################ */}
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
                value={product.itemName}
                onChange={handleChange}
              ></input>
            </div>
          </div>
        </div>
      </div>
      {/* ############################### 카테고리 출력 부분 ################################ */}
      <CategoryForm />
      {/* ############################### 옵션 출력 부분 ################################ */}
      <div className="container-fluid">
        <div className="jumbotron">
          <div className="row" style={{ marginBottom: "30px" }}>
            <h2>옵션</h2>
          </div>
          <div className="row">
            <div className="col-2">
              <h5>옵션 입력</h5>
            </div>
            <div className="col-3">
              <h5>옵션명</h5>
            </div>
            <div className="col-3">
              <h5>옵션값</h5>
            </div>
            <div className="col-2">
              <h5>단가(원)</h5>
            </div>
            <div className="col-2">
              <h5>재고수량</h5>
            </div>
          </div>

          <div className="row">
            <div className="col-2"></div>
            <div className="col-3">
              <input
                type="text"
                className="form-control"
                name="optionName"
                id="optionName"
                value={product2.optionName}
                onChange={(e) => {
                  //handleChangeName(e);
                  handleChange2(e);
                }}
              ></input>
            </div>
            <div className="col-3">
              <input
                type="text"
                className="form-control"
                name="optionValue"
                id="optionValue"
                value={product2.optionValue}
                onChange={(e) => {
                  //handleChangeValue(e);
                  handleChange2(e);
                }}
              ></input>
            </div>
            <div className="col-2">
              <input
                type="text"
                className="form-control"
                name="price"
                id="price"
                value={product2.price}
                onChange={(e) => {
                  //handleChangeValue(e);
                  handleChange2(e);
                }}
              ></input>
            </div>
            <div className="col-2">
              <input
                type="text"
                className="form-control"
                name="stockQuantity"
                id="stockQuantity"
                value={product2.stockQuantity}
                onChange={(e) => {
                  //handleChangeValue(e);
                  handleChange2(e);
                }}
              ></input>
            </div>
          </div>

          <div className="row ">
            <div className="col-2"></div>
            <div className="col-4">
              <button
                type="button"
                className="btn btn-primary btn-block"
                id="btnAddToList"
                onClick={clickAddToList}
              >
                ▼ &nbsp; 옵션목록으로 적용
              </button>
            </div>
            <div className="col-5"></div>
          </div>

          <div className="row optionListHeader">
            <div className="col-5">
              <h5>옵션 목록 (총 {singleOptionValue.length} 개)</h5>
              <button
                type="button"
                className="btn btn-secondary"
                id="deleteOption"
                onClick={clickDeleteOption}
              >
                삭제
              </button>
            </div>

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
                  <button
                    type="button"
                    className="btn btn-secondary"
                    id="btnApplyAll"
                  >
                    일괄적용
                  </button>
                </div>

                <div className="col-3 mx-auto">
                  <h5>재고수량</h5>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    id="btnApplyAll"
                  >
                    일괄적용
                  </button>
                </div>
              </div>

              {optionList.map((option) => {
                return (
                  <div className="row optionList">
                    <div className="col-1 align-self-center">
                      <input
                        type="checkbox"
                        className="form-control-lg"
                      ></input>
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
                        value={product2.price}
                        onChange={(e) => handleChange2(e)}
                      ></input>
                    </div>
                    <div className="col-3 align-self-center">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="0"
                        name="stockQuantity"
                        value={product2.stockQuantity}
                        onChange={(e) => handleChange2(e)}
                      ></input>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* ############################### 상품 이미지 업로드 부분 ################################ */}
      <div className="container-fluid">
        <div className="jumbotron">
          <div className="row">
            <h2>이미지 업로드</h2>
          </div>
          <div className="row">
            <div className="col">
              <div style={{ float: "left" }}>대표이미지</div>
              <br />
              <br />
              <div>
                <input
                  style={{ width: "100%", height: "100%" }}
                  type="file"
                  onChange={imageChange}
                />
              </div>
              <br />
              <div
                style={{
                  border: "1px solid black",
                  width: "300px",
                  height: "300px",
                }}
              >
                <img
                  style={{
                    border: "1px solid black",
                    width: "100%",
                    height: "100%",
                  }}
                  alt=""
                  src={imgUrl}
                />
              </div>
              <br />
              {/* <div style={{ float: "left" }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={imgUpload}
              >
                이미지 등록
              </button>
            </div> */}
            </div>
          </div>
        </div>
      </div>
      {/* ############################### 상품 상세 정보 입력 부분 ################################ */}
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
                name="itemComment"
                value={product.itemComment}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      {/* ############################### 상품 최종 등록 하기 버튼 부분 ################################ */}
      <div className="container-fluid">
        <div className="jumbotron">
          <div className="row">
            <div className="col-12">
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={consoleLog}
                style={{ height: "100px", fontSize: "2em" }}
                id="btnConfirm"
              >
                새로운 상품 등록하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewProductApp;
