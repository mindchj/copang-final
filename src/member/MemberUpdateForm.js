import React, { useState, useEffect, useRef } from "react";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import axios from "axios";

const MemberUpdateForm = (props) => {
    let userName = props.location.state.userId.username;
    let description = props.location.state.userId.description;
    let phone = props.location.state.userId.phone;
    let profileImage = props.location.state.userId.profileImage;
    let realName = props.location.state.userId.realName;
    let role = props.location.state.userId.role;
    let signInDate = props.location.state.userId.signInDate;


    const [password, setPassword] = useState();

    const [info, setInfo] = useState({username : userName, password : "", realName : realName,phone : phone, description : description});

    const handleInfoChange = (e) => {
        const { name, value } = e.target;
        setInfo({ ...info, [name]: value });
        // console.log(info);
    };

    const handleSubmit = async () => {
        const putData = await axios.put("https://alconn.co/api/user",info);
        // console.log(info);
    }
    return (
        <div>
            <Typography variant="h2" gutterBottom>
                {userName} 님 정보 수정하기
            </Typography>
            <h4>유저이름</h4>
            <input type="text" name = "realName" value={info.realName} onChange={handleInfoChange}/>

            <h4>전화번호</h4>
            <input type="tel" name = "phone" value={info.phone} onChange={handleInfoChange}/>

            <h4>설명 </h4>
            <input type="text" name = "description" value={info.description} onChange={handleInfoChange}/>

            <h4> 비밀번호 입력 </h4>
            <input type="password" name="password" onChange={handleInfoChange} /> 

            <button onClick={()=>handleSubmit()}> 수정하기 </button>
        </div>
    )
}

export default MemberUpdateForm;