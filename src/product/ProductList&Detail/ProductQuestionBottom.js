import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductQuestionModal from './ProductQuestionModal';
// import { TableCell,TableRow } from '@material-ui/core';

const ProductQuestionBottom=()=>{
    
    const [Question, setQuestion] = useState([]);
    useEffect(() => {
        const res = async () => {
            const result = await axios.get("");
            setQuestion(result.data)
        }
        res();
    }, [])

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
                writeID : Question.writeID,
                writeContent : Question.writeContent,
                writeDate : Question.writeDate
            }
            await axios.post("severAPI",questionData);
        }
        axiosAddQuestion();
    }
    return(
            <div className="product-question-desc">
                <div >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div className="product-question-desc-header">
                        <div style={{fontWeight:'bold', fontSize:'1.5em', marginTop:'3%'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        상품문의<span className="product-question-span"><button type="button" className="product-question-button" onClick={openModal}>문의하기</button></span></div>
                        <ProductQuestionModal open={modalOpen} close={closeModal} header="상품 문의">
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <th>상품정보</th>
                                        <td>
                                            <div>
                                                <div role="button" title="신발사이즈(mm)을(를) 선택하세요.">
                                                <select name="option" placeholder="신발사이즈(mm)을(를) 선택하세요.">
                                                    <option value="1">123456789</option>  
                                                    <option value="2">2</option>    
                                                    <option value="3">3</option>    
                                                    <option value="4">4</option>    
                                                </select>
                                                </div>
                                                <div role="button" title="신발사이즈(mm)을(를) 선택하세요.">
                                                <select name="option" placeholder="신발사이즈(mm)을(를) 선택하세요.">
                                                    <option value="1">987654321</option>  
                                                    <option value="2">2</option>    
                                                    <option value="3">3</option>    
                                                    <option value="4">4</option>    
                                                </select>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>판매자</th>
                                        <td>
                                            판매자
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>문의내용</th>
                                        <td>
                                            <textarea cols="100" rows="10"></textarea>
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
                                                <strong><span style={{backgroundColor:'#777777',color:'white'}}>질문</span>&nbsp;<span className="glyphicon glyphicon-user"></span>&nbsp;{row.writeID}</strong><span className="product-question-writeday">{row.writeDate}</span><br/><br/>
                                                <div>{row.writeContent}</div><br/>
                                                {
                                                    row.replyID && <div className="question-reply-wrap"><br></br><strong><span style={{backgroundColor:'#346AFF',color:'white'}}>답글</span>&nbsp;<span className="glyphicon glyphicon-eject"></span>&nbsp;{row.replyID}</strong><span className="product-question-writeday">{row.replyDate}</span><br/><br/>
                                                    <div>{row.replyContent}</div><br/>
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