import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductQuestionModal from './ProductQuestionModal';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BusinessIcon from '@material-ui/icons/Business';


const ProductQuestionBottom = (props) => {

    const [refresh, setRefresh] = useState(0)

    // const onClickReply = (idx, row) => {
    //     Question[idx].check = !Question[idx].check
    //     setRefresh(prev => prev + 1)
    // }

    // const onClickFixQuestion = (idx, row) => {
    //     Question[idx].check = !Question[idx].check
    //     setRefresh(prev => prev + 1)
    // }


    useEffect(() => { }, [refresh])

    const [questionFix, setQuestionFix] = useState({
        questionFix: ""
    })

    const handleChange4 = (e) => {
        const { name, value } = e.target;
        console.log(e.target);
        setQuestionFix({ fixQuestion, [name]: value })
    }

    const [replyContent, setReplyContent] = useState({
        replyContent: ""
    })

    const handleChange3 = (e) => {
        const { name, value } = e.target;
        console.log(e.target);
        setReplyContent({ replyContent, [name]: value })
    }

    const [optionValue, setOptionValue] = useState("")

    const handleChange2 = (e) => {
        setOptionValue(ProductOne.itemDetailFormList[e.target.selectedIndex].optionValue);
        console.log(optionValue)
    }

    const [content, setContent] = useState({
        content: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(e.target);
        setContent({ content, [name]: value });
    };


    let itemId = props.match.params.itemId;
    const [Question, setQuestion] = useState([]);

        const Questionres = async () => {
            const result = await axios.get("https://alconn.co/api/inquiry/" + itemId + "/item");
            for (let i = 0; i < result.data.data.length; i++) {
                result.data.data[i].check = false;
            }
            setQuestion(result.data.data)
        }
        Questionres();

    const [ProductOne, setProductOne] = useState([]);
    useEffect(() => {
        const ProductOneres = async () => {
            const result = await axios.get("https://alconn.co/api/item/list/itemid=" + itemId);
            setProductOne(result.data.data)
        }
        ProductOneres();
    }, [itemId])


    const [modalOpen, setModelOpen] = useState(false);

    const openModal = () => {
        setModelOpen(true);
    }

    const closeModal = () => {
        setModelOpen(false);
    }

    const addQuestion = (Question) => {
        const axiosAddQuestion = async () => {
            const questionData = {
                "clientId": localStorage.getItem("userId"),
                "clienetName": Question.clientName,
                "itemId": itemId,
                "content": content.content,
                "itemDetailId": ProductOne.itemDetailFormList && ProductOne.itemDetailFormList[0].itemDetailId,
                "optionValue": optionValue,
                "optionName": ProductOne.itemDetailFormList && ProductOne.itemDetailFormList[0].optionName,
                "itemName": ProductOne.itemName,
                "sellerName": ProductOne.itemDetailFormList && ProductOne.itemDetailFormList[0].sellerName
            }
            await axios.post("https://alconn.co/api/inquiry", questionData);
            console.log(questionData);
        }
        axiosAddQuestion().then(()=>Questionres());
        alert("문의등록이 되었습니다.")
        setModelOpen(false);
        
    }
    //답변등록 API
    // const addReply = (idx) => {
    //     const axiosAddReply = async () => {
    //         const replyData = {
    //             "inquiry": Question[idx].inquiryId,
    //             "content": replyContent.replyContent,
    //         }
    //         await axios.post("https://alconn.co/api/inquiry/" + Question[idx].inquiryId + "/reply", replyData);
    //         const result = await axios.get("https://alconn.co/api/inquiry/" + itemId + "/item");
    //         setQuestion(result.data.data);
    //         setRefresh(prev => prev + 1)
    //     }
    //     axiosAddReply();

    //     alert("답변등록이 되었습니다.");

    // }

    const fixQuestion = (idx) => {
        const axiosfixQuestion = async () => {
            const fixQuestionData = {
                "content": questionFix
            }
            await axios.put("https://alconn.co//api/inquiry/" + Question[idx].inquiryId, fixQuestionData);
        }
        axiosfixQuestion();
        alert("문의내용이 수정되었습니다.")
    }
    return (
        <div className="product-question-desc">
            <div >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="product-question-desc-header">
                    <div style={{ fontWeight: 'bold', fontSize: '1.5em', marginTop: '3%' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        상품문의<span className="product-question-span"><button type="button" className="product-question-button" onClick={openModal}>문의하기</button></span></div>
                    <ProductQuestionModal open={modalOpen} close={closeModal} header="상품 문의">
                        <table style={{ width: '100%', height: '90%', border:'1px solid #777777',textAlign:'center'}}>
                            <tbody className="question-tbody">
                                <tr style={{ border:'1px solid #777777'}}>
                                    <th style={{width:'10%',  border:'1px solid #777777'}}>상품정보</th>
                                    <td style={{ border:'1px solid #777777'}}>
                                        <div style={{textAlign:'left'}}>
                                            <div>
                                                {ProductOne.itemDetailFormList && ProductOne.itemDetailFormList[0].optionName} :
                                                <select onChange={(e)=>handleChange2(e)}>
                                                    {
                                                        ProductOne.itemDetailFormList && ProductOne.itemDetailFormList.map((row, idx) => {
                                                            return (
                                                                <option name="optionValue" key={idx} row={row} value={row.optionValue}>
                                                                    {row.optionValue}
                                                                </option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ border:'1px solid #777777'}}>
                                    <th style={{ border:'1px solid #777777'}}>판매자</th>
                                    <td style={{textAlign:'left'}}>
                                        <div>{ProductOne.itemDetailFormList && ProductOne.itemDetailFormList[0].sellerName}</div>
                                    </td>
                                </tr>
                                <tr style={{ border:'1px solid #777777'}}>
                                    <th style={{ border:'1px solid #777777'}}>문의내용</th>
                                    <td>
                                        <input type="text" row="2" style={{ width:'100%',height:'100%'}} name="content" value={content.content} onChange={handleChange}></input>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div style={{ textAlign: 'center',marginTop:'30px' }}>
                            <button type="submit" className="question-submit-btn" onClick={addQuestion}><span>확인</span></button>
                            <button type="button" className="question-cancel-btn" onClick={closeModal}><span>취소</span></button>
                        </div>
                    </ProductQuestionModal>
                    <br /><br />
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
                                Question.length !== 0 ?
                                    Question && Question.map((row, idx) => {
                                        
                                        return (
                                            <div>
                                                <div className="product-question-body2" row={row} key={idx}>
                                                    <strong><span style={{ backgroundColor: '#777777', color: 'white' }}>질문</span>&nbsp;<AccountCircleIcon></AccountCircleIcon>&nbsp;{row.clientName}</strong><span className="product-question-writeday">{row.registerDate}</span><br />
                                                    <div style={{ fontSize: '10pt', color: '#777' }}>{row.itemName},{row.optionName},{row.optionValue}</div><button onClick={()=>console.log(row)}>console</button><br/>
                                                    <div style={{height:'40px'}}>{row.content}</div>
                                                    {/* <div><button onClick={() => onClickReply(idx, row)} style={{ border: 'none', backgroundColor: 'white', color: '#346AFF' }} >답글달기</button>&nbsp;&nbsp;<button onClick={() => onClickFixQuestion(idx, row)} style={{ border: 'none', backgroundColor: 'white', color: 'green' }}>수정</button></div> */}
                                                    {/* {
                                                        row.check ? <div><textarea name="replyContent" onChange={handleChange3} value={replyContent.replyContent}></textarea><button onClick={() => addReply(idx)} style={{ border: 'none', backgroundColor: 'white', color: '#346AFF' }}>답글등록</button></div> : null
                                                    }
                                                    {
                                                        row.check ? <div><textarea name="questionFix" value={questionFix.questionFix} placeholder={row.content} onChange={handleChange4}></textarea><button onClick={() => fixQuestion(idx)} style={{ border: 'none', backgroundColor: 'white', color: 'green' }}>수정완료</button></div> : null */}
                                                    {/* } */}
                                                    {
                                                        row.reply && <div className="question-reply-wrap"><br></br><strong><span style={{ backgroundColor: '#346AFF', color: 'white' }}>답글</span>&nbsp;<BusinessIcon></BusinessIcon>&nbsp;{row.reply.sellerName}</strong><span className="product-question-writeday">{row.reply.registerDate}</span><br /><br />
                                                            <div>{row.reply.content}</div><br />
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        );
                                    }) : <div style={{ fontSize: '30pt', width: '100%', textAlign: 'center', borderBottom: '2px solid #555555', height: '300px', lineHeight: '300px' }}>문의사항이 없습니다.</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductQuestionBottom;