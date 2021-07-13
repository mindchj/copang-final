import React from "react";
import { Route } from "react-router-dom";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
// import ProductAddTest from './ProductAddTest';
import OrderPageApp from "../../purchase/OrderPageApp";
import ProductReviewWriteForm from "./ProductReviewWriteForm";
import order from "../../member/MyCopang";

const ProductListRouteMain = () => {
  return (
    <div className="layout">
      <Route exact path="/product" component={ProductList} />
      
      <Route path="/product/header/hot" component={ProductList} />
      <Route path="/product/header/free" component={ProductList} />
      <Route path="/product/header/display" component={ProductList} />
      <Route path="/product/header/review" component={ProductList} />
      <Route path="/product/header/new" component={ProductList} />
      <Route path="/product/keyword/:brand" component={ProductList}/>

      <Route path="/product/category/:categoryId" component={ProductList} />
      <Route path="/product/search/option" component={ProductList} />
      <Route path="/product/selectOne/:itemId" component={ProductDetail}/>
      <Route path="/productReviewBottom/review/write/:itemId" component={ProductReviewWriteForm}/>
      <Route path="/mycopang" component={order} />
    </div>
  );
};

export default ProductListRouteMain;
