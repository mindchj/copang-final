import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import { Table } from 'reactstrap';


const Cart = () => {
    const server = "http://192.168.0.13:9001";
    const userSID = 3;
    const [cart, setCart] = useState();
    const [total, setTotal] = useState(0);
    const [refresh, setRefresh] = useState(0);
    const [idx, setIdx] = useState();
    const [allchk, setAllchk] = useState();
    
    //userSID의 카트리스트 받아와서 cart 에 저장
    const axiosCartList = async () => {
        const {data} = await axios.get(server+"/cart/selectuser/"+userSID);
        console.log("cartList 결과:");
        console.log(data);
        setCart(data);
    }

    //refresh 될 때마다 카트리스트 리렌더링
    useEffect( ()=>{
        axiosCartList();
    },[refresh])

    // cart 내역 바뀔때마다 항목 갯수 업데이트
    useEffect( () => {
        cart && setIdx(cart.length);
        getTotal();
    },[cart])

    useEffect( () => {
        console.log("idx변화 캐치");
        getTotal();
    },[idx])

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

    // 체크박스 전체 클릭시 처리
    const onChangeCheckAll = (e) => {
        setAllchk(e.target.checked);
        for(let i=0; i<idx; i++)
        {
            document.getElementById(i).checked = e.target.checked;
        }
        getTotal();
    }

    // 체크박스 1 항목 클릭시 처리
    const onChangeCheckOne = (e) => {
        let check = true;
        // 체크박스중 하나라도 false면 전부 false 처리
        for(let i=0;i<idx;i++)
        {
            if(document.getElementById(i).checked === false)
                check = false;
        }
        setAllchk(check);
        getTotal();
    }

    // 주문 총액 계산하여 출력 업데이트
    const getTotal = () => {
        let total = 0;
        cart && cart.map( (row,idxorder) => {
            const item = document.getElementById(idxorder);
            if(item.checked === true)
                total += row.price*row.entity;
            return null;
        })
        setTotal(total);
    }

    return(
        <div style={{width:'1000px',margin:'0 auto', padding:'20px'}}>
            <h2><b><i class='fas fa-shopping-cart'></i> 장바구니</b></h2><br/>
            <Table  hover>
                <thead>
                    <tr>
                        <td>
                            <div className="form-check">
                                <input onChange={onChangeCheckAll} type="checkbox" className="form-check-input" checked={allchk}/>
                            </div>
                        </td>
                        <td style={{width:'100px'}}><h4><b>사진</b></h4></td>
                        <td style={{width:'300px'}}><h4><b>상품</b></h4></td>
                        <td style={{width:'100px'}}><h4><b>가격</b></h4></td>
                        <td style={{width:'100px'}}><h4><b>수량</b></h4></td>
                        <td style={{width:'100px'}}><h4><b>합계</b></h4></td>
                        <td style={{width:'290px'}}><Button style={{float:'right'}} color="primary" onClick={()=>removeUserCart(cart[0].userSID)}>전체 비우기　<i className='fas fa-trash'/></Button></td>
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
                                    <td>{item.price}</td>
                                    <td>{item.entity}</td>
                                    <td> {item.price*item.entity}</td>
                                    <td>
                                        <Button style={{float:'right'}} color="primary" onClick={()=>removeLineCart(item)}><i className='fas fa-trash-alt'/></Button>&nbsp;&nbsp;&nbsp;
                                        <Button style={{float:'right',marginRight:'30px'}} color="primary" onClick={()=>removeOneCart(item)}><i className='fas fa-minus'/></Button>&nbsp;&nbsp;&nbsp;
                                        <Button style={{float:'right',marginRight:'10px'}} color="primary" onClick={()=>addCart(item)}><i className='fas fa-plus'/></Button>&nbsp;&nbsp;&nbsp;
                                    </td>
                                </tr>
                            )
                        }
                    )
                }
                </tbody>
            </Table>
            <hr/>
            {cart && cart[0] && <Button style={{alignItems:'center',float:'right'}} size="lg" color="primary" onClick={()=>cartToOrder(cart[0].userSID)}>주문하기</Button>}
            <h2 style={{display:'inline',float:'right',marginRight:'30px'}}>
                총 주문액&nbsp;

                {total} 원
            </h2>
            
        </div>
    )
}

export default Cart;