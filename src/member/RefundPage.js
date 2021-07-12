import axios from "axios";
import { useEffect, useState } from "react";

const RefundPage = (props) => {

    const [addressId, setAddressId] = useState(props.location.state.addr.addressId);
    const [reason, setReason] = useState("");

    useEffect( () => {
        console.log(props)
        console.log(reason)

    },[reason])

    const doRefund = () => {
        const axiosRefund = async () => {
            const data = {
                returnReason : reason,
                addressId : addressId,
                amount : props.location.state.amount,
            }
            const result = await axios.post("https://alconn.co/api/orders/return/"+props.location.state.orderItemId, data);
            console.log(result);
        }
        axiosRefund();
    }

    return (
        <div>
            <div className = "row">
            <div className = "col-4">
                <h3>주문 취소/환불</h3><br></br>
            </div>
            <div className = "col-5 memberInfo my-auto">
                <h5>주문번호</h5>
                <input type="text" className="form-control" value={props.location.state.orderItemId}/>

                <h5>상품명</h5>
                <input type="text" className="form-control" value={props.location.state.itemName}/>

                <h5>주문수량</h5>
                <input type="text" className="form-control" value={props.location.state.amount}/>

                <h5>배송지</h5>
                <input type="text" className="form-control" value={props.location.state.addr.address+" "+props.location.state.addr.detail}/>

                <h5>환불 사유</h5>
                <input onChange={(e)=>setReason(e.target.value)} type="textarea" className="form-control" style={{width:'520px',height:'100px',textAlign:'start'}}/>
                <br/>
                <button onClick={doRefund} className="btn btn-success">환불</button>&nbsp;
                <button className="btn btn-primary">취소</button>
            </div>
            
        </div>
        </div>
    )
}

export default RefundPage;