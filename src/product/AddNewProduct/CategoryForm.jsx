import React, { useState, useEffect } from "react";

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
  };

  useEffect(() => {
    settingValues();
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
            <select className="custom-select" id="parentCategoryForm" value={"default"}>
              <option value="default" disabled>
                Main Category
              </option>
              {parentCategory.map((entry, index) => {
                return (
                  <option key={index} value={entry}>
                    {entry}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-3">
            <label htmlFor="subCategoryForm">중분류</label>
            <select className="custom-select" id="subCategoryForm" value={"default"}>
              <option value="default" disabled>
                Sub-Category
              </option>
              {childCategory.map((entry) => {
                return entry.map((data, idx) => {
                  return <option key={idx} value={data}>{data}</option>;
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

//   const makeSubmenu = (value) => {
//     const categoryId = "";
//     if (value.length === 0) {
//       document.getElementById("categorySelectForm").innerHTML =
//         "<option></option>";
//     } else {
//       let citiesOptions = "";
//       for (categoryId in testData[value]) {
//         citiesOptions += "<option>" + testData[value][categoryId] + "</option>";
//       }
//       document.getElementById("categorySelectForm").innerHTML = citiesOptions;
//     }
//   };

//   const displaySelected = () => {
//     const parentCategory = document.getElementById("parentCategoryForm").value;
//     const childCategory = document.getElementById("categorySelectForm").value;
//     alert(parentCategory + "\n" + childCategory);
//   };

//   const resetSelection = () => {
//     document.getElementById("category").selectedIndex = 0;
//     document.getElementById("categorySelect").selectedIndex = 0;
//   };
