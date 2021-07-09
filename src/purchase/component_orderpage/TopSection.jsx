import React from "react";
//import axios from "axios";
//import {totalPrice} from "./ProductInfo";

const numberFormat = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function TopSection(props){

    //const server = "http://192.168.0.13:9001/";


    return (
        <div className = "row top align-items-center">
            <div className = "col-6" >
                <h1><b>주문 확인</b></h1>
            </div>
            {/* <div className = "col ">
                <h4>Total Price : {props.totalPrice && numberFormat(props.totalPrice)}원 </h4>
            </div>
            <div className = "col">
                <button type = "button" 
                    className = "btn btn-primary btn-lg btnOrder">
                    Place Order</button>
            </div> */}
        </div>
    )
}

export default TopSection;