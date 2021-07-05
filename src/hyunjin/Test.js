import axios from 'axios';
import React, { useState } from 'react';

const Test = () => {

    const [res, setRes] = useState();
    const [input, setInput] = useState();

    const getProductList = async () => {
        const result = await axios.get("https://alconn.co/api/item/list");
        setRes(result.data.data);
    }
    const getProductId = async () => {
        const result = await axios.get("https://alconn.co/api/item/list/itemid="+input);
        setRes(result.data.data);
    }
    const getProductReview = async () => {
        const result = await axios.get("https://alconn.co/api/review/"+input)
    }
    const getProductCategory = async () => {
        const result = await axios.get("https://alconn.co/api/item/list/categoryid="+input);
        setRes(result.data.data);
    }
    const getUserInfo = async () => {
        const result = await axios.get("https://alconn.co/api/user");
        setRes(result.data.data);
    }
    const getUserOrder = async () => {
        const result = await axios.get("https://alconn.co/api/orders/client");
        setRes(result.data.data);
    }
    const getUserCart = async () => {
        const result = await axios.get("https://alconn.co/api/cart");
        setRes(result.data.data);
    }
    const getUserReview = async () => {
        const result = await axios.get("https://alconn.co/api/review/user");
        setRes(result.data.data);
    }
    const getCategoryMain = async () => {
        const result = await axios.get("https://alconn.co/api/category/main");
        setRes(result.data.data);
    }
    const getCategoryList = async () => {
        const result = await axios.get("https://alconn.co/api/category/list");
        setRes(result.data.data);
    }


    return (
        <div>
            서버 API 응답 테스트<br/>
            input 입력: <input onChange={(e)=>setInput(e.target.value)}/><br/>
            <button onClick={()=>setRes()}>결과창 비우기</button>
            <button onClick={getProductList}>상품목록</button>
            <button onClick={getProductId}>상품byID</button>
            <button onClick={getProductReview}>리뷰by상품ID</button>
            <button onClick={getProductCategory}>상품byCategoryID</button><br/>
            <button onClick={getUserInfo}>유저정보</button>
            <button onClick={getUserOrder}>유저주문</button>
            <button onClick={getUserCart}>유저카트</button>
            <button onClick={getUserReview}>유저리뷰</button><br/>
            <button onClick={getCategoryMain}>카테고리 대소분류</button>
            <button onClick={getCategoryList}>카테고리 목록</button>

            
            <br/>결과값:<br/>
            {res && JSON.stringify(res)}
            
        </div>
    );
};

export default Test;