import { BrowserRouter, Route, Switch } from "react-router-dom";
import Menu from "./Menu";


import Cart from "./purchase/Cart";
import AddNewProductApp from "./product/AddNewProduct/AddNewProductApp";
import OrderPageApp from "./purchase/OrderPageApp";
import ProductListRouteMain from './youngjae/ProductListRouteMain';
import MyCopang from "./member/MyCopang";
import RouteHyunjin from "./hyunjin/RouteHyunjin";

import TopBar from "./TopBar/TopBar";
import LoginPage from "./TopBar/Component/LoginPage";
import RegisterPage from "./TopBar/Component/RegisterPage";

const RouteMain = () => {
  return (
    <div>
      <BrowserRouter>
        <TopBar />
        <Menu />
        <Route path="/member/1" component={Cart} />
        <Route path="/member/2" component={AddNewProductApp} />
        <Route path="/member/3" component={OrderPageApp}/>
        <Route path="/member/4" component={ProductListRouteMain} />
        <Route path="/member/5" component={MyCopang} />
        <Route path="/member/6" component={RouteHyunjin} />
        <Route path="/member/7" component={RouteHyunjin} />
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default RouteMain;