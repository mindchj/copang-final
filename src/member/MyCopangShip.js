
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/MyCopangShip.css'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// const ArriveDate = () => {
//     return (
//         <div className="ship-header"> 
//             <div className="ship-header-date">6/14(월) 도착 완료</div>
//             <div className="ship-header-mention">고객님이 주문하신 상품이 배송완료 되었습니다.</div>
//         </div>
//     )
// }

// const DeliverInfo = () => {
//     return (
//         <div className = "ship-info">
//             <div className="ship-info-number">

//             </div>
//             <div className="receiver-info">

//             </div>
//         </div>
//     )
// }

const MyCopangShip = (props) => {
    let receiver = props.location.state.address.receiverName;
    let preRequest = props.location.state.address.preRequest;
    let Invoice = props.location.state.orderItems[0].trackingNumber;

    const baseuri = 'http://info.sweettracker.co.kr/api/v1/trackingInfo?t_key='+process.env.REACT_APP_API_URL+'&t_code=04&t_invoice=' + Invoice;
    const [deliverData, setDeliverData] = useState();
    const getApi = async () => {
        const data = await axios.get(baseuri);
        setDeliverData(data.data)
        console.log(data.data)
    }
    
    useEffect(() => {
        getApi();
    }, []);

    return (
        <div>
            {/* <button onClick={()=>console.log(props.location.state.orderItems[0].trackingNumber)}>확인하기</button> */}
            {deliverData && deliverData.status === false ? deliverData.msg : <section>

                {deliverData && deliverData.result === "Y" ? <div><h2 style={{ color: 'red' }}>배송완료</h2> <div>송장번호 : {deliverData.invoiceNo}</div>
                    <div>받는 사람 :{receiver}</div>
                    <div>배송요청사항 :{preRequest}</div>
                    <div>받는 물품 : {deliverData.itemName}</div>

                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>시간</TableCell>
                                <TableCell>현재위치</TableCell>
                                <TableCell>배송상태 </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                deliverData.trackingDetails.map(dd => (
                                    <TableRow>
                                        <TableCell>{dd.timeString.substring(0, 16)}</TableCell>
                                        <TableCell>{dd.where}</TableCell>
                                        <TableCell>{dd.kind.substring(0, 4)}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table></div> : "???"
            }
            </section>}


            {/* )} */}
            {/* <h2>배송조회</h2>
            <form action="http://info.sweettracker.co.kr/tracking/5" method="post">
                <div className="form-group">
                    <input type="hidden" className="form-control" id="t_key" name="t_key" placeholder="제공받은 APIKEY" value={t_key} />
                </div>
                <div className="form-group">
                    <label htmlFor="t_code">택배사 코드</label>
                    <input type="text" className="form-control" name="t_code" id="t_code" placeholder="택배사 코드" />
                </div>
                <div className="form-group">
                    <label htmlFor="t_invoice">운송장 번호</label>
                    <input type="text" className="form-control" name="t_invoice" id="t_invoice" placeholder="운송장 번호" />
                </div>
                <div style={{display:'flex' }}>
                    <button type="submit" className="btn btn-default" style={{textAlign:'center'}}>조회하기</button>
                </div>
            </form> */}
            {/* <div className = "tracking-detail-header"> 
                    <div>시간</div>
                    <div>현재위치</div>
                    <div>배송상태</div>
                </div> 
            {
                deliverData.trackingDetails.map(dd => (
                    <div className = "tracking-detail"> 
                        <div> {dd.timeString.substring(0,16)}</div>
                        <div> {dd.where}</div>
                        <div> {dd.kind.substring(0,4)}</div>
                    </div>
                )
                )
            }  */}
        </div>
    )
}

export default MyCopangShip;