import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import styled from 'styled-components';


const MyCopangAddress = ({ history, match, location }, props) => {
    const [addrList, setAddrList] = useState([]);
    // 주소 목록 읽어오기 
    const addrListUrl = 'https://alconn.co/api/address';
    const getAddrList = async () => {
        const { data : {
            data
        }} = await axios.get(addrListUrl);
        setAddrList(data);
        // console.log(data);
    }
    useEffect(() => {
        getAddrList()
    }, []);
    //
    const MyCopangAddrBoxItem = styled.div`
        border: 3px solid gray;
        margin-bottom : 1px;
    `;
    const onDelete = (addressId) => {
        console.log(addressId);
        const deleteUri = 'https://alconn.co/api/address/'+addressId;
        const deleteAddrList = async () => {
            await axios.delete(deleteUri)
        }
        deleteAddrList()
        .then( () =>  getAddrList() );
        
    }

    return (
        <div className="MyCopangAddr-box">
            
            {addrList.map(item => (
                <MyCopangAddrBoxItem key={item.addressId}>
                    <div className="MyCopangAddr-title">{item.receiverName}</div>
                    <div className="MyCopangAddr-defaultAddr">{item.priority ==='PRIMARY' ? "기본배송지" : ""}</div>
                    <div className="MyCopangAddr-addr">{item.address}</div>
                    <div className="MyCopangAddr-detail">{item.detail}</div>
                    <div className="MyCopangAddr-phone">{item.receiverPhone}</div>
                    <div className="MyCopangAddr-preRequest">{item.preRequest}</div>
                    <Button onClick={()=>onDelete(item.addressId)}>삭제</Button>
                    <Button onClick={()=> history.push({pathname:"/address-update-page", state : {addrValues:item}})}>수정</Button>
                </MyCopangAddrBoxItem>
            ))
            }
            <div className="MyCopangAddr-add-wrap" style={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" color="primary" onClick={() => history.push('/address-add-page')}>
                    추가하기
                </Button>
            </div>
        </div>
    )
}

export default MyCopangAddress;