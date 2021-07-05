import axios from "axios";
import React, { useState } from "react";

const AddNewCategoryForm = () => {
  const [category, setCategory] = useState({
    categoryName: "",
    parentId: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const printLog = () => {
    console.log(category);
  };

  const addNewCategory = () => {
    const axiosAddCategory = async () => {
      await axios.post("https://alconn.co/api/category/add", category);
    };
    axiosAddCategory();
    alert("카테고리 등록 완료!!!");
  };

  return (
    <div className="container-fluid">
      <div className="jumbotron">
        <input
          type="text"
          className="form-control"
          name="categoryName"
          placeholder="카테고리 이름입력"
          value={category.categoryName}
          onChange={handleChange}
        ></input>
        <input
          type="text"
          className="form-control"
          name="parentId"
          placeholder="부모 카테고리 아이디(숫자) 입력"
          value={category.parentId}
          onChange={handleChange}
        ></input>
        <button
          type="button"
          className="btn btn-primary"
          onClick={addNewCategory}
        >
          카테고리 등록
        </button>
      </div>
    </div>
  );
};

export default AddNewCategoryForm;
