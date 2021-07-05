/*eslint-disable jsx-a11y/anchor-is-valid */

// import { USER_SERVER } from '../../Config';
import React from 'react';
import { Breadcrumbs } from '@material-ui/core';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { FormControl as Form, Button, Input, Checkbox, Typography } from '@material-ui/core';


function UserMenu(props) {
  const user = useSelector(state => state.user)
  console.log("usermenu");
  console.log(user);
  console.log(user.userData);
  const logoutHandler = () => {
    axios.get("https://alconn.co/api/auth/logout").then(response => {
      console.log(response);
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
    delete axios.defaults.headers.common['Authorization'];
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('userId');
    document.cookie = "accessToken = ; expires = Wed; 01 Jan 1970";
    props.history.push('/login');
  };
  return (!window.localStorage.getItem('accessToken')) ? (
    <Breadcrumbs aria-label="breadcrumb" style={{ marginRight: '20px' }}>
      <div key="mail">
        <Link to="/login">로그인</Link>
      </div>
      <div key="app" style={{ display: 'block' }}>
        <Link to="/register">회원가입</Link>
      </div>
    </Breadcrumbs>
  ) : (


    <Breadcrumbs aria-label="breadcrumb">
      <div key="logout">
        <Link onClick={logoutHandler}>로그아웃</Link>
      </div>
    </Breadcrumbs>


  )
}

export default withRouter(UserMenu);

