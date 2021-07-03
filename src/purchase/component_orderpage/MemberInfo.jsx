import axios from "axios";
import React, { useEffect, useState } from "react";
import img from "./profile.png";

function MemberInfo(){
    const [member, setMember] = useState();
    const serverURL = "http://192.168.0.13:9001/customer/selectOne/3";

    useEffect(() => {
        const getMemberData = async () => {
            const {data} = await axios.get(serverURL);
            setMember(data);
        }
        //getMemberData();
    })

    return (
        <div className = "row member">
            <div className = "col-2">
                <h3>Customer</h3><br></br>
                <img src = {img} alt = "profile-pic"></img>
            </div>
            <div className = "col memberInfo my-auto">
                <h5>구매자 번호: {member ? member.sid : "없어요"}</h5>
                <h5>구매자 아이디: {member ? member.username : "none"}</h5>
                <h5>구매자 비번: {member ? member.password : "none"}</h5>
            </div>
            
        </div>
    )
}

export default MemberInfo;