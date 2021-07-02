import React from "react";
import Option from "./Option";
import DisplayProductName from "./DisplayProductName";
import CategoryForm from "./CategoryForm";
import ImgUpload from "./ImgUpload";

const AddNewProductApp = () => {
  return (
    <div>
      <DisplayProductName />
      <CategoryForm />
      <Option />
      <ImgUpload />
    </div>
  );
};

export default AddNewProductApp;
