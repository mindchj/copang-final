import React from 'react';
import {Table, Button} from 'reactstrap';

const numberFormat = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const OrderComplete = () => {
    return (
        <div style={{width:'1000px',margin:'0 auto', padding:'20px'}}>
            <h2><b> 결제 완료창</b></h2><br/>
            <table className="table table-bordered" style={{width:'800px', margin:'0 auto'}}>
                <tbody>
                    <tr>
                        <td style={{width:'200px'}}><h4>받는사람</h4></td><td style={{width:'700px'}}>1</td>
                    </tr>
                    <tr>
                        <td><h4>받는 주소</h4></td><td>1</td>
                    </tr>
                    <tr>
                        <td><h4>주문 요청사항</h4></td><td>1</td>
                    </tr>
                </tbody>
            </table>
            <hr/>
            <Button style={{alignItems:'center',float:'right'}} size="lg" color="primary">주문하기</Button>
            <h2 style={{display:'inline',float:'right',marginRight:'30px'}}>
                총 주문액 {0} 원
            </h2>
        </div>
    );
};

export default OrderComplete;