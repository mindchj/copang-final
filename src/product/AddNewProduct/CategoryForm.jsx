import React, { useState, useEffect } from "react";
import axios from "axios";

const CategoryForm = () => {
  const [parentCategory, setParentCategory] = useState([]);
  const [childCategory, setChildCategory] = useState([]);
  const [refresh, setRefresh] = useState(0);

  /////////////////////////////////////대분류 변수////////////////////////////////////////
  const [largeCategory, setLargeCategory] = useState([]);
  const [selectedLC, setSelectedLC] = useState([]);

  /////////////////////////////////////중분류 변수////////////////////////////////////////
  const [mediumCategory, setMediumCategory] = useState([]);
  const [selectedMC, setSelectedMC] = useState([]);

  /////////////////////////////////////소분류 변수////////////////////////////////////////
  const [smallCategory, setSmallCategory] = useState([]);
  const [selectedSC, setSelectedSC] = useState([]);

  // const testData = {
  //   Clothes: ["shirt", "blouse", "pants"],
  //   Beverage: ["coke", "beer", "water"],
  // };

  // const settingValues = () => {
  //   setParentCategory(Object.keys(testData));
  //   setChildCategory(Object.values(testData));
  // };

  const largeCategorySelect = (e) => {
    setMediumCategory(JSON.parse(e.target.value).cildCategory);
    setRefresh((prev) => prev + 1);
    setSmallCategory("");
  };

  const mediumCategorySelect = (e) => {
    setSmallCategory(JSON.parse(e.target.value).cildCategory);
    setRefresh((prev) => prev + 1);
    console.log(JSON.parse(e.target.value).categoryId);
  };

  const smallCategorySelect = (e) => {
    setRefresh((prev) => prev + 1);
    console.log(JSON.parse(e.target.value).categoryId);
  };

  useEffect(() => {
    const readAllCategory = async () => {
      const result = await axios.get("https://alconn.co/api/category/list");
      console.log(result);

      setLargeCategory(result.data.data.cildCategory);
      // setMediumCategory(result.data.data.cildCategory[0].cildCategory);
      // setSmallCategory(
      //   result.data.data.cildCategory[0].cildCategory[0].cildCategory
      // );
      console.log(largeCategory);
    };

    readAllCategory();
    //settingValues();
  }, []);

  return (
    <div className="container-fluid">
      <div className="jumbotron">
        <div className="row" style={{ marginBottom: "30px" }}>
          <h2>카테고리</h2>
        </div>
        <div className="row">
          <div className="col-2">
            <select
              className="custom-select"
              id="largeCategoryForm"
              name="largeCategory"
              onChange={(e) => largeCategorySelect(e)}
            >
              <option selected>카테고리 선택</option>
              {largeCategory.map((entry, idx) => {
                return (
                  <option
                    key={entry.categoryId}
                    value={JSON.stringify(entry)}
                    name="largeCategory"
                  >
                    {entry.categoryName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-2" id="mediumCategorySection">
            {mediumCategory.length !== 0 ? (
              <select
                className="custom-select"
                id="mediumCategoryForm"
                name="mediumCategory"
                onChange={(e) => mediumCategorySelect(e)}
              >
                <option selected>카테고리 선택</option>
                {mediumCategory.map((entry, idx) => {
                  return (
                    <option
                      key={entry.categoryId}
                      value={JSON.stringify(entry)}
                      name="mediumCategory"
                    >
                      {entry.categoryName}
                    </option>
                  );
                })}
              </select>
            ) : null}
          </div>
          <div className="col-2">
            {smallCategory.length !== 0 ? (
              <select
                className="custom-select"
                id="smallCategoryForm"
                name="smallCategory"
                onChange={(e) => smallCategorySelect(e)}
              >
                <option selected>카테고리 선택</option>
                {smallCategory.map((entry, idx) => {
                  return (
                    <option
                      key={entry.categoryId}
                      value={JSON.stringify(entry)}
                      name="smallCategory"
                    >
                      {entry.categoryName}
                    </option>
                  );
                })}
              </select>
            ) : null}
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
