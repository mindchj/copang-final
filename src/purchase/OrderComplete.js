import React from 'react';
import {Table, Button} from 'reactstrap';

const numberFormat = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const OrderComplete = () => {
    return (
        <div style={{width:'1000px',margin:'0 auto', padding:'20px'}}>
            <h2><b> 결제 완료창</b></h2><br/>
            <Table  hover>
                <thead>
                    <tr>
                        <td>
                            td
                        </td>
                        <td style={{width:'100px'}}><h4><b>사진</b></h4></td>
                        <td style={{width:'300px'}}><h4><b>상품</b></h4></td>
                        <td style={{width:'100px'}}><h4><b>가격</b></h4></td>
                        <td style={{width:'100px'}}><h4><b>수량</b></h4></td>
                        <td style={{width:'100px'}}><h4><b>합계</b></h4></td>
                        <td style={{width:'290px'}}><Button style={{float:'right'}} color="primary">전체 비우기　<i className='fas fa-trash'/></Button></td>
                    </tr>
                </thead>
                <tbody>
                    tbody
                </tbody>
            </Table>
            <hr/>
            <Button style={{alignItems:'center',float:'right'}} size="lg" color="primary">주문하기</Button>
            <h2 style={{display:'inline',float:'right',marginRight:'30px'}}>
                총 주문액 {0} 원
            </h2>
        </div>
    );
};

export default OrderComplete;