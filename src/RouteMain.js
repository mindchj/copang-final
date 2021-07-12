import {autoLoginWithAccessToken, getCookie, auth} from './_actions/user_actions';
import React, {lazy, Suspense } from 'react';
import TopBar from "./TopBar/TopBar";
import Header from "./header/Header.js";
import { Switch, Route } from "react-router-dom";
import Auth from "./TopBar/hoc/auth";
import CategoryForm from './header/SearchBox/CategoryForm';

import Cart from "./purchase/Cart";
import AddNewProductApp from "./product/AddNewProduct/AddNewProductApp";
import ProductListRouteMain from './product/ProductList&Detail/ProductListRouteMain';
import MyCopang from "./member/MyCopang";
import LoginPage from "./TopBar/Component/LoginPage";
import RegisterPage from "./TopBar/Component/RegisterPage";
import RegisterSellerPage from "./Seller/Component/RegisterSellerPage";
import OrderComplete from "./purchase/OrderComplete";
import OrderPageApp from "./purchase/OrderPageApp";

import Menu from "./Menu";

import AddForm from "./youngjae/ProductAddTest";
import Test22 from "./hyunjin/Test22";
import Test from "./hyunjin/Test";
import MainPage from './product/ProductList&Detail/MainPage';

//import SearchBox from "./header/SearchBox/SearchBox";

const RouteMain = () => {

  return (
    <div>
      {/* 자동로그인 */}
      { autoLoginWithAccessToken()}
      {/* <Suspense fallback={(<div>Loading...</div>)}> */}
        <div style={{minWidth:'940px', maxWidth: '1280px', margin: 'auto'}}>
          <TopBar />
          <Header />
          <Menu />
          <Switch>
            <Route exact path="/" component={Auth(CategoryForm, null)} />
            <Route path="/member/1" component={Cart} />
            <Route path="/member/2" component={AddNewProductApp} />
            <Route path="/member/3" component={MainPage}/>
            <Route path="/member/5" component={MyCopang} />
            <Route path="/member/6" component={AddForm} />
            <Route path="/member/7" component={Test22} />
            <Route path="/member/8" component={Test} />

            <Route path="/login" component={Auth(LoginPage, false)} />
            <Route path="/register" component={Auth(RegisterPage, false)} />
            <Route path="/sellerRegister" component={Auth(RegisterSellerPage, false)} />
            <Route path="/product" component={ProductListRouteMain} />
            <Route path="/cart" component={Auth(Cart, true)} />
            <Route path="/mycopang" component={Auth(MyCopang, true)} />
            <Route path="/order/complete" component={Auth(OrderComplete)} />
            <Route path="/order/do" component={Auth(OrderPageApp)} />
          </Switch>
        </div>
      {/* </Suspense> */}

    </div>
  );
};

export default RouteMain;