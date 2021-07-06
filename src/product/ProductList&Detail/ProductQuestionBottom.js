import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductQuestionModal from './ProductQuestionModal';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const ProductQuestionBottom=(props)=>{
    
    const [refresh,setRefresh]=useState(0)

    const onClickReply=(idx,row)=>{
        Question[idx].check=!Question[idx].check
        setRefresh(prev => prev+1)
        console.log(row.inquiryId)
    }

    useEffect(()=>{},[refresh])
    
    const [replyContent, setReplyContent]=useState({
        replyContent:""
    })

    const handleChange3 =(e)=>{
        const {name,value}=e.target;
        console.log(e.target);
        setReplyContent({replyContent,[name]:value})
    }

    const [optionValue, setOptionValue] = useState({
        optionValue:""
    })

    const handleChange2 = (e) =>{
        const {name,value}=e.target;
        console.log(e.target);
        setOptionValue({optionValue,[name]:value});
    }
    const [content, setContent] = useState({
        content:""
    })
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(e.target);
        setContent({ content, [name]: value });
    };


    let itemId=props.match.params.itemId;
    const [Question, setQuestion] = useState([]);
    useEffect(() => {
        const res = async () => {

            const result = await axios.get("https://alconn.co/api/inquiry/client");
            for(let i=0; i<result.data.data.length; i++){
                result.data.data[i].check = false;
            }
            setQuestion(result.data.data)
        }
        res();
    }, [])
    const [ProductOne, setProductOne] = useState([]);
    useEffect(() => {
        const res = async () => {
            const result = await axios.get("https://alconn.co/api/item/list/itemid=" + itemId);
            setProductOne(result.data.data)
        }
        res();
    }, [itemId])
    

    const [modalOpen, setModelOpen] = useState(false);

    const openModal = () => {
        setModelOpen(true);
    }

    const closeModal = () => {
        setModelOpen(false);
    }

    const addQuestion = (Question) => {
        const axiosAddQuestion = async () =>{
            const questionData = {
                "clientId":localStorage.getItem("userId"),
                "clienetName":Question.clientName,
                "itemId":itemId,
                "content":content.content,
                "itemDetailId":ProductOne.itemDetailFormList&&ProductOne.itemDetailFormList[0].itemDetailId,
                "optionValue":optionValue.optionValue,
                "optionName":ProductOne.itemDetailFormList&&ProductOne.itemDetailFormList[0].optionName,
                "itemName":ProductOne.itemName
            }
            await axios.post("https://alconn.co/api/inquiry",questionData);
        }
        axiosAddQuestion();
    }
    console.log(Question)
    const addReply =(idx)=>{
        const axiosAddReply = async () =>{
            const replyData ={
                "inquiry": Question[idx].inquiryId,
                "content": replyContent.replyContent
            }
            await axios.post("https://alconn.co/api/inquiry/"+Question[idx].inquiryId+"/reply",replyData)
        }
        axiosAddReply();
        console.log(Question[idx].inquiryId)
    }
    return(
            <div className="product-question-desc">
                <div >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div className="product-question-desc-header">
                        <div style={{fontWeight:'bold', fontSize:'1.5em', marginTop:'3%'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        상품문의<span className="product-question-span"><button type="button" className="product-question-button" onClick={openModal}>문의하기</button></span></div>
                        <ProductQuestionModal open={modalOpen} close={closeModal} header="상품 문의">
                            <table className="table table-bordered" style={{width:'500px', height:'600px'}}>
                                <tbody>
                                    <tr style={{height:'50px'}}>
                                        <th>상품정보</th>
                                        <td>
                                            <div>
                                                <div role="button" title="신발사이즈(mm)을(를) 선택하세요.">
                                                {ProductOne.itemDetailFormList&&ProductOne.itemDetailFormList[0].optionName} : <select name="optionValue" onChange={handleChange2}>
                                                    <option value={optionValue.optionValue} >
                                                        {ProductOne.itemDetailFormList&&ProductOne.itemDetailFormList[0].optionValue}
                                                    </option>                  
                                                </select>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>판매자</th>
                                        <td>
                                            
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>문의내용</th>
                                        <td> 
                                            <textarea cols="100" name="content" value={content.content} onChange={handleChange}></textarea>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div style={{textAlign:'center'}}>
                                <button type="submit" className="question-submit-btn" onClick={addQuestion}><span>확인</span></button>
                                <button type="button" className="question-cancel-btn" onClick={closeModal}><span>취소</span></button>
                            </div>
                        </ProductQuestionModal>
                        <br/><br/>
                        <ul className="product-question-desc">
                            <li>
                            구매한 상품의 취소/반품은 마이쿠팡 구매내역에서 신청 가능합니다.
                            </li>
                            <li>
                            상품문의 및 후기게시판을 통해 취소나 환불, 반품 등은 처리되지 않습니다.
                            </li>
                            <li>
                            가격, 판매자, 교환/환불 및 배송 등 해당 상품 자체와 관련 없는 문의는 고객센터 내 1:1 문의하기를 이용해주세요.
                            </li>
                            <li>
                            "해당 상품 자체"와 관계없는 글, 양도, 광고성, 욕설, 비방, 도배 등의 글은 예고 없이 이동, 노출제한, 삭제 등의 조치가 취해질 수 있습니다.
                            </li>
                            <li>
                            공개 게시판이므로 전화번호, 메일 주소 등 고객님의 소중한 개인정보는 절대 남기지 말아주세요.
                            </li>
                        </ul>
                        <div className="product-question-body-wrap">
                            <div className="product-question-body">
                                {
                                    Question&&Question.map((row,idx) => {                                
                                        return(
                                            <div className="product-question-body2" row={row} key={idx}>
                                                <strong><span style={{backgroundColor:'#777777',color:'white'}}>질문</span>&nbsp;<AccountCircleIcon></AccountCircleIcon>&nbsp;{row.clientName}</strong><span className="product-question-writeday">{row.registerDate}</span><br/>
                                                <div style={{fontSize:'10pt',color:'#777'}}>{row.itemName}{row.optionName},{row.optionValue}</div>
                                                <div>{row.content}</div>
                                                <div><button onClick={()=>onClickReply(idx,row)} style={{border:'none', backgroundColor:'white',color:'#346AFF'}} >답글달기</button></div>                                                
                                                {
                                                    row.check?<div><textarea name="replyContent" onChange={handleChange3} value={replyContent.replyContent}></textarea><button onClick={()=>addReply(idx)} style={{border:'none', backgroundColor:'white',color:'#346AFF'}}>답글완료</button></div>:null
                                                }
                                                {
                                                    row.replyID && <div className="question-reply-wrap"><br></br><strong><span style={{backgroundColor:'#346AFF',color:'white'}}>답글</span>&nbsp;<span className="glyphicon glyphicon-eject"></span>&nbsp;{row.reply.sellerName}</strong><span className="product-question-writeday">{row.reply.registerDate}</span><br/><br/>
                                                    <div>{row.reply.Content}</div><br/>
                                                    </div>
                                                }
                                            </div>      
                                        );
                                    })
                                }
                            </div>    
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default ProductQuestionBottom;