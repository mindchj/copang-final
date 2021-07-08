import React from 'react';
import {Route} from 'react-router-dom';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
// import ProductAddTest from './ProductAddTest';
import ProductDescBottom from './ProductDescBottom';
import ProductReviewBottom from './ProductReviewBottom';
import ProductQuestionBottom from './ProductQuestionBottom';
import OrderPageApp from "../../purchase/OrderPageApp";
import ProductReviewWriteForm from './ProductReviewWriteForm';
import order from '../../member/MyCopang'

const ProductListRouteMain = () =>{
    return (
        <div>
            <Route exact path="/product" component={ProductList}/>
            <Route path="/product/category/:categoryId" component={ProductList}/>
            <Route path="/product/selectOne/:itemId" component={ProductDetail}/>
            <Route path="/product/selectOne/:itemId/ProductDescBottom" component={ProductDescBottom}/>
            <Route path="/product/selectOne/:itemId/ProductReviewBottom" component={ProductReviewBottom}/>
            <Route path="/product/selectOne/:itemId/ProductQuestionBottom" component={ProductQuestionBottom}/>
            <Route path="/order/do" component={OrderPageApp} />
            <Route path="/productReviewBottom/review/write/:itemId" component={ProductReviewWriteForm}/>
            <Route path="/mycopang" component={order}/>
            
        </div>
    )
}

export default ProductListRouteMain;
