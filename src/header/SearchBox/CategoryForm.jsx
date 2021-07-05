import React, { useState, useEffect } from "react";

const ChildCategory = (ParentCategory) => {
  
  
  return  
}
const CategoryForm = () => {
  const [parentCategory, setParentCategory] = useState([]);
  const [childCategory, setChildCategory] = useState([]);
  const testData = {
    Clothes: ["shirt", "blouse", "pants"],
    Beverage: ["coke", "beer", "water"],
  };
  const settingValues = () => {
    setParentCategory(Object.keys(testData));
    setChildCategory(Object.values(testData));
    // console.log(parentCategory);
    // console.log(childCategory);
  };
  const splitData = () => {};
  useEffect(() => {
    settingValues();
    //splitData();
  }, []);
  return (
    <div className="container-fluid">
      <div className="jumbotron">
        <div className="row">
          <h2>카테고리</h2>
        </div>
        <div className="row">
          <div className="col-3">
            <label htmlFor="parentCategoryForm">대분류</label>
            <select className="custom-select" id="parentCategoryForm">
              <option value="" disabled selected>
                Main Category
              </option>
              {parentCategory.map((entry) => {
                return <option value={entry}>{entry}</option>;
              })}
            </select>
          </div>
          <div className="col-3">
            <label htmlFor="subCategoryForm">중분류</label>
            <select className="custom-select" id="subCategoryForm">
              <option value="" disabled selected>
                Sub-Category
              </option>
              {childCategory.map((entry) => {
                return entry.forEach((element) => {
                  // console.log(element);
                  return <option value={element}>{element}</option>;
                });
              })}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoryForm;