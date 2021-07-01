/*eslint-disable jsx-a11y/anchor-is-valid */

// import { USER_SERVER } from '../../Config';
import React from 'react';
import { Breadcrumbs } from '@material-ui/core';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { FormControl as Form, Button, Input, Checkbox, Typography } from '@material-ui/core';


function UserMenu(props) {
  // const user = useSelector(state => state.user)
  const USER_SERVER = '/api/auth';
  const logoutHandler = () => {
    delete axios.defaults.headers.common['Authorization'];
    // axios.get(`${USER_SERVER}/auth/logout`).then(response => {
    //   if (response.status === 200) {
    //     props.history.push("/login");
    //   } else {
    //     alert('Log Out Failed')
    //   }
    // });
    window.localStorage.setItem('userId', "");
  };
  return !window.localStorage.getItem('userId')  ? (
  //return !window.localStorage.getItem('accessToken')  ? (
    <Breadcrumbs aria-label="breadcrumb" style={{marginRight:'20px'}}>
      <div key="mail">
        <Link to="/login">로그인</Link>
      </div>
      <div key="app" style={{display:'block'}}>
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

