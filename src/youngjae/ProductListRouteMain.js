import React from 'react';
import {Route} from 'react-router-dom';
import ProductList from '../product/ProductList&Detail/ProductList';
import ProductDetail from '../product/ProductList&Detail/ProductDetail';
import ProductAddTest from './ProductAddTest';
import ProductDescBottom from '../product/ProductList&Detail/ProductDescBottom';
import ProductReviewBottom from '../product/ProductList&Detail/ProductReviewBottom';
import ProductQuestionBottom from '../product/ProductList&Detail/ProductQuestionBottom';
import OrderPageApp from "../purchase/OrderPageApp";

const ProductListRouteMain = () =>{
    return (
        <div>
            <Route exact path="/member/4" component={ProductList}/>
            <Route path="/member/4/product/selectOne/:itemId" component={ProductDetail}/>
            <Route path="/member/4/product/selectOne/:itemId/ProductDescBottom" component={ProductDescBottom}/>
            <Route path="/member/4/product/selectOne/:itemId/ProductReviewBottom" component={ProductReviewBottom}/>
            <Route path="/member/4/product/selectOne/:itemId/ProductQuestionBottom" component={ProductQuestionBottom}/>
            <Route path="/member/4/ProductAddTest" component={ProductAddTest}/>
            <Route path="/member/4/orderpage" component={OrderPageApp} />
        </div>
    )
}

export default ProductListRouteMain;
