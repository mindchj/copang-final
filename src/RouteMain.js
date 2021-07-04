import { BrowserRouter, Route, Switch } from "react-router-dom";
import Menu from "./Menu";


import Cart from "./purchase/Cart";
import AddNewProductApp from "./product/AddNewProduct/AddNewProductApp";
import {Provider} from 'react-redux';
import Container, {store} from './product/AddNewProduct/productRedux';
import ProductListRouteMain from './youngjae/ProductListRouteMain';
import MyCopang from "./member/MyCopang";
import RouteHyunjin from "./hyunjin/RouteHyunjin";
import OrderComplete from "./purchase/OrderComplete";

import TopBar from "./TopBar/TopBar";
import LoginPage from "./TopBar/Component/LoginPage";
import RegisterPage from "./TopBar/Component/RegisterPage";
import OrderPageApp from "./purchase/OrderPageApp";

// login redux와 product redux 중복 문제 해결할 것..

const RouteMain = () => {

  return (
    <div>
      <BrowserRouter>
        <TopBar />
        <Menu />
        <Route path="/member/1" component={Cart} />
        <Route path="/member/2" component={AddNewProductApp} />
        <Route path="/member/3">
          <Provider store={store}>
            <Container/>
          </Provider>
        </Route>
        <Route path="/member/4" component={ProductListRouteMain} />
        <Route path="/member/5" component={MyCopang} />
        <Route path="/member/6" component={RouteHyunjin} />
        <Route path="/member/7" component={RouteHyunjin} />
        <Route path="/order/complete" component={OrderComplete} />
        <Route path="/order/do" component={OrderPageApp} />
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default RouteMain;