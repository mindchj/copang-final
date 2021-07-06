import axios from "axios";
import React, { useEffect, useState } from "react";
import img from "./profile.png";

function MemberInfo(){

    return (
        <div className = "row member">
            <div className = "col-2">
                <h3>Customer</h3><br></br>
                <img src = {img} alt = "profile-pic"></img>
            </div>
            <div className = "col memberInfo my-auto">
                <h5>구매자 번호: </h5>
                <h5>구매자 아이디: </h5>
                <h5>구매자 비번: </h5>
            </div>
        </div>
    )
}

export default MemberInfo;