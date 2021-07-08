import React from 'react';
import {Route} from 'react-router-dom';
import ProductList from '../product/ProductList&Detail/ProductList';
import ProductDetail from '../product/ProductList&Detail/ProductDetail';
// import ProductAddTest from './ProductAddTest';
import ProductDescBottom from '../product/ProductList&Detail/ProductDescBottom';
import ProductReviewBottom from '../product/ProductList&Detail/ProductReviewBottom';
import ProductQuestionBottom from '../product/ProductList&Detail/ProductQuestionBottom';
import OrderPageApp from "../purchase/OrderPageApp";
import ProductReviewWriteForm from '../product/ProductList&Detail/ProductReviewWriteForm';
import order from '../member/MyCopang'

const ProductListRouteMain = () =>{
    return (
        <div>
            <Route exact path="/product" component={ProductList}/>
            <Route path="/product/category/:categoryId" component={ProductList}/>
            <Route path="/product/selectOne/:itemId" component={ProductDetail}/>
            <Route path="/product/selectOne/:itemId/ProductDescBottom" component={ProductDescBottom}/>
            <Route path="/product/selectOne/:itemId/ProductReviewBottom" component={ProductReviewBottom}/>
            <Route path="/product/selectOne/:itemId/ProductQuestionBottom" component={ProductQuestionBottom}/>
            <Route path="/product/orderpage" component={OrderPageApp} />
            <Route path="/productReviewBottom/review/write/:itemId" component={ProductReviewWriteForm}/>
            <Route path="/mycopang" component={order}/>
            
        </div>
    )
}

export default ProductListRouteMain;
