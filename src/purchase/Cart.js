import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import {Table} from 'reactstrap';


const Cart = () => {
    const server = "http://192.168.0.13:9001";
    const userSID = 5;
    const [cart, setCart] = useState();
    const [total, setTotal] = useState();
    const [refresh, setRefresh] = useState(0);
    const [idx, setIdx] = useState();
    const [allchk, setAllchk] = useState();
    
    //userSID의 카트리스트 받아와서 cart 에 저장
    const axiosCartList = async () => {
        const {data} = await axios.get(server+"/cart/selectuser/"+userSID);
        console.log("cartList 결과:");
        console.log(data);
        let total = 0;
        data.map( (item) => {
            total += item.entity*item.price;
            return null;
        })
        setTotal(total);
        setCart(data);
    }

    //refresh 될 때마다 카트리스트 리렌더링
    useEffect( ()=>{
        axiosCartList();
    },[refresh])

    useEffect( () => {
        cart && setIdx(cart.length);
    },[cart])

    //카트 항목 1개 증가
    const addCart = (item) => {
        const axiosAddCart = async () => {
            const cartData = {
                userSID : item.userSID,
                productSID : item.productSID,
                entity : item.entity,
            }
            const result = await axios.post(server+"/cart/add",cartData);
            console.log("addCart 결과:");
            console.log(result);
            setRefresh(prev => prev+1);  
        }
        axiosAddCart();
    }
    //카트 항목 1개 감소
    const removeOneCart = (item) => {
        const axiosRemoveOneCart = async () => {
            const cartData = {
                userSID : item.userSID,
                productSID : item.productSID,
            }
            const result = await axios.post(server+"/cart/removeone",cartData);
            console.log("removeOneCart 결과:");
            console.log(result);
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
            const result = await axios.post(server+"/cart/removeline",cartData);
            console.log("removeLineCart 결과:");
            console.log(result);
            setRefresh(prev => prev+1);
        }
        axiosRemoveLineCart();
    }
    //카트 전부 비우기
    const removeUserCart = (userSID) => {
        const axiosRemoveUserCart = async () => {
            const result = await axios.delete(server+"/cart/removeuser/"+userSID);
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
            const result = await axios.get(server+"/order/insertcart/"+userSID);
            console.log("cartToOrder 결과:");
            console.log(result);
            //구매창으로 이동 후 결제 되었다 가정, 장바구니 비우고 주문서 추가
            setRefresh(prev => prev+1);
        }
        axiosCartToOrder();
    }

    const onChangeCheckAll = (e) => {
        setAllchk(e.target.checked);
        for(let i=0; i<idx; i++)
        {
            document.getElementById(i).checked = e.target.checked;
        }
    }

    const onChangeCheckOne = (e) => {
        let check = true;
        // 체크박스중 하나라도 false면 전부 false 처리
        for(let i=0;i<idx;i++)
        {
            if(document.getElementById(i).checked === false)
                check = false;
        }
        setAllchk(check);
    }

    const btnStyle = {
        float : 'left',
    }

    return(
        <div style={{width:'900px',margin:'0 auto', padding:'20px', border:'2px solid gray'}}>
            <h2><b>장바구니</b></h2><br/>
            <Table  hover>
                <thead>
                    <tr>
                        <td>
                            <div className="form-check">
                                <input onChange={onChangeCheckAll} type="checkbox" className="form-check-input" checked={allchk}/>
                            </div>
                        </td>
                        <td>사진</td>
                        <td style={{width:'300px'}}>상품</td>
                        <td>가격</td>
                        <td style={{width:'80px'}}>수량</td>
                        <td><Button style={{float:'right'}} startIcon={<DeleteOutlineIcon/>} onClick={()=>removeUserCart(cart[0].userSID)} variant="outlined">전부 비우기</Button></td>
                    </tr>
                </thead>
                <tbody>
                {
                    cart && cart.map( (item, idx)=>
                        {
                            return(
                                <tr key={idx}>
                                    <td>
                                        <div className="form-check">
                                            <input id={idx} onChange={onChangeCheckOne} type="checkbox" className="form-check-input" value=""/>
                                        </div>
                                    </td>
                                    <td>{item.image}</td>
                                    <td>{item.productName}</td>
                                    <td>{item.price*item.entity}</td>
                                    <td>{item.entity}</td>
                                    <td>
                                    <Button style={btnStyle} startIcon={<AddIcon/>} onClick={()=>addCart(item)} variant="outlined"></Button>&nbsp;&nbsp;&nbsp;
                                    <Button style={btnStyle} startIcon={<RemoveIcon/>} onClick={()=>removeOneCart(item)} variant="outlined"></Button>&nbsp;&nbsp;&nbsp;
                                    <Button style={btnStyle} startIcon={<DeleteIcon/>} onClick={()=>removeLineCart(item)} variant="outlined"></Button>&nbsp;&nbsp;&nbsp;
                                        
                                    </td>
                                </tr>
                            )
                        }
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