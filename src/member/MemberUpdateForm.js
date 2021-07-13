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

  const [info, setInfo] = useState({
    username: userName,
    password: "",
    realName: realName,
    phone: phone,
    description: description,
  });

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
    // console.log(info);
  };

  const handleSubmit = async () => {
    const putData = await axios
      .put("https://alconn.co/api/user", info)
      .then(() => props.history.push({ pathname: "/mycopang/userinfo" }));
  };
  return (
    <div>
      <h2 style={{ textAlign: "center", paddingTop: "5%" }}>
        {userName} 님 정보 수정하기
      </h2>
      <div
        style={{
          paddingLeft: "30%",
          paddingRight: "30%",
        }}
      >
        <h5 style={{ paddingTop: "7%" }}>유저이름</h5>

        <TextField
          required
          type="tel"
          name="realName"
          value={info.realName}
          fullWidth
          onChange={handleInfoChange}
        />

        <h5 style={{ paddingTop: "7%" }}>전화번호</h5>
        <TextField
          required
          type="tel"
          name="phone"
          value={info.phone}
          fullWidth
          onChange={handleInfoChange}
        />
        <h5 style={{ paddingTop: "7%" }}>설명 </h5>

        <TextField
          required
          type="text"
          name="description"
          fullWidth
          onChange={handleInfoChange}
        />

        <h5 style={{ paddingTop: "7%" }}> 비밀번호 입력 </h5>
        <TextField
          required
          name="password"
          type="password"
          fullWidth
          onChange={handleInfoChange}
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleSubmit()}
          style={{ marginTop: "7%" }}
        >
          수정하기
        </Button>
      </div>
    </div>
  );
};

export default MemberUpdateForm;
