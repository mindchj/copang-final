import React, { useState } from "react";
import "./CategorySidebar.css";

const CategorySidebar = () => {
  // const dropdown = document.getElementsByClassName("dropdown-btn");

  // for (var i = 0; i < dropdown.length; i++) {
  //   dropdown[i].addEventListener("click", function () {
  //     this.classList.toggle("active");
  //     var dropdownContent = this.nextElementSibling;
  //     if (dropdownContent.style.display === "block") {
  //       dropdownContent.style.display = "none";
  //     } else {
  //       dropdownContent.style.display = "block";
  //     }
  //   });
  // }

  const [isActive, setIsActive] = useState(false);

  const toggleClass = (e) => {
    // setIsActive(!isActive);
    //console.log(e.target);
    const item = document.getElementById("div1");
    // if (item.style.display === "none") {
    //   item.style.display == "block";
    // } else if (item.style.display === "block") {
    //   item.style.display == "none";
    // }
  };

  return (
    <div>
      <div className="sidenav">
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#clients">Clients</a>
        <a href="#contact">Contact</a>
        <button onClick={toggleClass} className="dropdown-btn">
          Dropdown
          <i className="fa fa-caret-down"></i>
        </button>
        <div id="div1" className="dropdown-container">
          <button className="dropdown-btn">
            Dropdown
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-container">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
          <button className="dropdown-btn">
            Dropdown
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-container">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
          <button className="dropdown-btn">
            Dropdown
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-container">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        </div>
        <a href="#contact">Search</a>
      </div>
    </div>
  );
};

export default CategorySidebar;
