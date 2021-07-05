import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART_USER,
    GET_CART_ITEMS_USER,
    REMOVE_CART_ITEM_USER,
    ON_SUCCESS_BUY_USER
} from './types';
import { USER_SERVER } from '../TopBar/Config.js';
export function getCookie(cookieName) {
    cookieName = cookieName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cookieName);
    var cValue = '';
    if (start !== -1) {
        start += cookieName.length;
        var end = cookieData.indexOf(';', start);
        if (end === -1) end = cookieData.length;
        cValue = cookieData.substring(start, end);
    }
    return unescape(cValue);
}

export function autoLoginWithAccessToken() {
    if(getCookie("accessToken")!==""){
        axios.defaults.headers.common['Authorization'] = `Bearer ${getCookie("accessToken")}`;
        const res = axios.get('https://alconn.co/api/user')
            .then(response => response.data);
        ;
    }
}
export function registerUser(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/auth/signup`, dataToSubmit)
        .then(response => response.data);

    return {
        type: REGISTER_USER,
        payload: request
    }
}
export function registerSeller(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/auth/signup/seller`, dataToSubmit)
        .then(response => response.data);

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/auth/login`, dataToSubmit)
        .then(response => {
            return response.data;
        });

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth() {
    //axios.defaults.header의 accesstoken값으로 사용자 인증
    const request = axios.get(`${USER_SERVER}/user`)
        .then(response => response.data)
        .catch(err =>{
            
            return ({
                type: AUTH_USER,
                message: err.response.data.message
            });
        });

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser() {
    const request = axios.get(`${USER_SERVER}/auth/logout`)
        .then(response => response.data);
    
    return {
        type: LOGOUT_USER,
        payload: request
    }
}


export function addToCart(_id) {
    const request = axios.get(`${USER_SERVER}/addToCart?productId=${_id}`)
        .then(response => response.data);

    return {
        type: ADD_TO_CART_USER,
        payload: request
    }
}



export function getCartItems(cartItems, userCart) {
    const request = axios.get(`/api/product/products_by_id?id=${cartItems}&type=array`)
        .then(response => {

            userCart.forEach(cartItem => {
                response.data.forEach((productDetail, i) => {
                    if (cartItem.id === productDetail._id) {
                        response.data[i].quantity = cartItem.quantity;
                    }
                })
            })

            return response.data;
        });

    return {
        type: GET_CART_ITEMS_USER,
        payload: request
    }
}


export function removeCartItem(id) {
    const request = axios.get(`/api/user/removeFromCart?_id=${id}`)
        .then(response => {

            response.data.cart.forEach(item => {
                response.data.cartDetail.forEach((k, i) => {
                    if (item.id === k._id) {
                        response.data.cartDetail[i].quantity = item.quantity
                    }
                })
            })
            return response.data;
        });

    return {
        type: REMOVE_CART_ITEM_USER,
        payload: request
    }
}


export function onSuccessBuy(data) {

    const request = axios.post(`${USER_SERVER}/successBuy`, data)
        .then(response => response.data);

    return {
        type: ON_SUCCESS_BUY_USER,
        payload: request
    }
}





