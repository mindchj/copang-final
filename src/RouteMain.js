import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import RouteHyunjin from "./hyunjin/RouteHyunjin";
import Cart from "./purchase/Cart";
import Menu from "./Menu";
import Container from './product/AddNewProduct/productRedux';
import ProductListRouteMain from './youngjae/ProductListRouteMain';
import MyCopang from "./member/MyCopang";
import OrderComplete from "./purchase/OrderComplete";

import AddNewProductApp from "./product/AddNewProduct/AddNewProductApp";
import Header from "./header/Header.js";
import TopBar from "./TopBar/TopBar";
import LoginPage from "./TopBar/Component/LoginPage";
import RegisterPage from "./TopBar/Component/RegisterPage";
import Auth from "./TopBar/hoc/auth";
//import SearchBox from "./header/SearchBox/SearchBox";
import axios from 'axios';
import CategoryForm from './header/SearchBox/CategoryForm';
import OrderPageApp from "./purchase/OrderPageApp";
import {autoLoginWithAccessToken, getCookie, auth} from './_actions/user_actions';




// login redux와 product redux 중복 문제 해결할 것..
// 일단 combineReducer로 setter 추가해서 합쳐놓음

const RouteMain = () => {

  return (
    <div>
      {/* 자동로그인 */}
      {autoLoginWithAccessToken()}    
      <Suspense fallback={(<div>Loading...</div>)}>
        <div style={{minWidth:'940px', maxWidth: '1280px', margin: 'auto'}}>
        <TopBar />
        <Header />
        <Switch>
          <Route exact path="/" component={Auth(CategoryForm, null)} />
          <Route path="/member/1" component={Cart} />
          <Route path="/member/2" component={AddNewProductApp} />
          <Route path="/member/3" component={Container}/>
          <Route path="/member/4" component={ProductListRouteMain} />
          <Route path="/member/5" component={MyCopang} />
          <Route path="/member/6" component={RouteHyunjin} />
          <Route path="/member/7" component={RouteHyunjin} />
          <Route path="/login" component={Auth(LoginPage, false)} />
          <Route path="/register" component={Auth(RegisterPage, false)} />
          <Route path="/cart" component={Auth(Cart, true)} />
          <Route path="/mycopang" component={Auth(MyCopang, true)} />
          
          <Route path="/order/complete" component={OrderComplete} />
          <Route path="/order/do" component={OrderPageApp} />
        </Switch>
        <Menu />
        </div>
      </Suspense>

    </div>
  );
};

export default RouteMain;