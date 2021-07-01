import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import {Table} from 'reactstrap';

const cartData1 = {
    "cartId" : 542,
    "clientId" : 4,
    "totalAmount" : 9,
    "totalPrice" : 165940,
    "cartItems" : [ {
      "itemDetailId" : 1,
      "itemId" : 5,
      "itemName" : "망고",
      "price" : 4500,
      "amount" : 2,
      "optionName" : "중량",
      "optionValue" : "1KG",
      "unitTotal" : 9000
    }, {
      "itemDetailId" : 3,
      "itemId" : 23,
      "itemName" : "키위",
      "price" : 56000,
      "amount" : 2,
      "optionName" : "중량",
      "optionValue" : "99KG",
      "unitTotal" : 112000
    }, {
      "itemDetailId" : 2,
      "itemId" : 32,
      "itemName" : "바나나",
      "price" : 8988,
      "amount" : 5,
      "optionName" : "중량",
      "optionValue" : "6KG",
      "unitTotal" : 44940
    } ]
  }

const Cart = () => {
    const server = "https://alconn.co";
    const [total, setTotal] = useState();
    const [refresh, setRefresh] = useState(0);
    const [cart, setCart] = useState(
        [ {
            "itemDetailId" : 1,
            "itemId" : 5,
            "itemName" : "망고",
            "price" : 4500,
            "amount" : 2,
            "optionName" : "중량",
            "optionValue" : "1KG",
            "unitTotal" : 9000
          }, {
            "itemDetailId" : 3,
            "itemId" : 23,
            "itemName" : "키위",
            "price" : 56000,
            "amount" : 2,
            "optionName" : "중량",
            "optionValue" : "99KG",
            "unitTotal" : 112000
          }, {
            "itemDetailId" : 2,
            "itemId" : 32,
            "itemName" : "바나나",
            "price" : 8988,
            "amount" : 5,
            "optionName" : "중량",
            "optionValue" : "6KG",
            "unitTotal" : 44940
          } ]
    );

    //카트 항목 1개 증가
    const addCart = (item) => {
        const axiosAddCart = async () => {
            const token = localStorage.getItem("accessToken");
            const cartData = {
                itemId : item.itemId,
                itemDetailId : item.itemDetailId,
                amount : item.amount,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const result = await axios.post(server+"/api/cart/item",cartData);
            setRefresh(prev => prev+1);  
        }
        axiosAddCart();
    }
    //카트 항목 1개 감소
    const removeOneCart = (item) => {
        const axiosRemoveOneCart = async () => {
            //const result = await axios.post("/cart/removeone",cartData);
            setRefresh(prev => prev+1);
        }
        axiosRemoveOneCart();
    }
    //카트 라인 제거
    const removeLineCart = (item) => {
        const axiosRemoveLineCart = async () => {
            const cartData = {
                userSID : item.userSID,
                productSID : item.productSID,
            }
            const result = await axios.post("/cart/removeline",cartData);
            console.log("removeLineCart 결과:");
            console.log(result);
            setRefresh(prev => prev+1);
        }
        axiosRemoveLineCart();
    }
    //카트 전부 비우기
    const removeUserCart = (userSID) => {
        const axiosRemoveUserCart = async () => {
            const result = await axios.delete("/cart/removeuser/"+userSID);
            console.log("removeUserCart 결과:");
            console.log(result);
            setRefresh(prev => prev+1);
        }
        axiosRemoveUserCart();
    }
    //카트 담긴 내역을 주문서로 이동
    const cartToOrder = (userSID) => {
        //여기서 구매창으로 페이지 이동시킴. 밑의 axios는 원래 구매창에서 실행할 함수
        const axiosCartToOrder = async () => {
            const result = await axios.get("/order/insertcart/"+userSID);
            console.log("cartToOrder 결과:");
            console.log(result);
            //구매창으로 이동 후 결제 되었다 가정, 장바구니 비우고 주문서 추가
            setRefresh(prev => prev+1);
        }
        axiosCartToOrder();
    }

    const btnStyle = {
        float : 'right',
    }

    return(
        <div style={{width:'800px',margin:'0 auto', padding:'20px', border:'2px solid gray'}}>
            <h2><b>장바구니</b></h2><br/>
            <Table  hover>
                <thead>
                    <tr>
                        <td>사진</td>
                        <td>상품</td>
                        <td>수량</td>
                        <td>가격</td>
                        <td><Button style={btnStyle} startIcon={<DeleteOutlineIcon/>} onClick={()=>removeUserCart(cart[0].userSID)} variant="outlined">전부 비우기</Button></td>
                    </tr>
                </thead>
                <tbody>
                {
                    cart && cart.map( (item, idx)=>
                        <tr key={idx}>
                            <td>{item.image}</td>
                            <td>{item.productName}</td>
                            <td>{item.entity}</td>
                            <td>{item.price*item.entity}</td>
                            <td>
                                <Button style={btnStyle} startIcon={<DeleteIcon/>} onClick={()=>removeLineCart(item)} variant="outlined"></Button>&nbsp;&nbsp;&nbsp;
                                <Button style={btnStyle} startIcon={<RemoveIcon/>} onClick={()=>removeOneCart(item)} variant="outlined"></Button>&nbsp;&nbsp;&nbsp;
                                <Button style={btnStyle} startIcon={<AddIcon/>} onClick={()=>addCart(item)} variant="outlined"></Button>&nbsp;&nbsp;&nbsp;
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </Table>
            <hr/>
            <h2 style={{display:'inline'}}>총 주문액 : {total}</h2>
            {cart && cart[0] && <Button style={{alignItems:'center',float:'right'}} onClick={()=>cartToOrder(cart[0].userSID)} variant="outlined">주문하기!</Button>}
            
        </div>
    )
}

export default Cart;