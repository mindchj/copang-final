import { useState } from "react";
import axios from "axios";
import "./Test22.css";

const Test22 = () => {

    const tempRes = {
        "message" : "카테고리상품리스트",
        "data" : [ {
          "itemId" : 6,
          "itemName" : "반팔티",
          "itemDetailId" : 7,
          "categoryId" : 3,
          "price" : 2000,
          "mainImg" : "메인사진",
          "sellerId" : null,
          "shipmentInfoForm" : {
            "id" : 5,
            "shippingPlace" : null,
            "logisticCompany" : "CJGLS",
            "shippingChargeType" : "FREE",
            "freeShipOverPrice" : 2600,
            "releaseDate" : 351,
            "shippingPrice" : 10000
          }
        }, {
          "itemId" : 9,
          "itemName" : "반팔티",
          "itemDetailId" : 10,
          "categoryId" : 2,
          "price" : 300000,
          "mainImg" : "메인사진",
          "sellerId" : null,
          "shipmentInfoForm" : {
            "id" : 8,
            "shippingPlace" : null,
            "logisticCompany" : "CJGLS",
            "shippingChargeType" : "FREE",
            "freeShipOverPrice" : 2600,
            "releaseDate" : 351,
            "shippingPrice" : 10000
          }
        }, {
          "itemId" : 12,
          "itemName" : "검은티",
          "itemDetailId" : 13,
          "categoryId" : 4,
          "price" : 10000,
          "mainImg" : "메인사진",
          "sellerId" : null,
          "shipmentInfoForm" : {
            "id" : 11,
            "shippingPlace" : null,
            "logisticCompany" : "CJGLS",
            "shippingChargeType" : "FREE",
            "freeShipOverPrice" : 2600,
            "releaseDate" : 351,
            "shippingPrice" : 10000
          }
        } ],
        "code" : 200
      }
    const [res, setRes] = useState();
    const getProductCategory = async (categoryId) => {
        //const result = await axios.get("https://alconn.co/api/item/list/categoryid="+categoryId);
        setRes(tempRes.data);
    }

    const test = (e) => {
      console.log(e.target);
      const item = document.getElementById("test22");
      item.style.display = "block";
    }

    return (
        <div>
            <div onClick={(e)=>test(e)} class="sidenav">
              <a href="#about">About</a>
              <a href="#services">Services</a>
              <a href="#clients">Clients</a>
              <a href="#contact">Contact</a>
              <button class="dropdown-btn">Dropdown 
                <i class="fa fa-caret-down"></i>
              </button>
              <div id="test22" class="dropdown-container">
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
              </div>
              <a href="#contact">Search</a>
            </div>
        </div>
    )
}

export default Test22;