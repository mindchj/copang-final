import React, { useState, useEffect, useRef } from 'react';
import './css/MyCopangPay.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const CopayAdmin = () => {

    return (
        <div className="copay-admin-wrap">
            <div className="copay-wrap-first">
                <div className="copay-log">COUPAY</div>
                <div className="copay-money">20,000 원</div>
                <div className="copay-btn-wrap">
                    <button className="account-btn btn"> 계좌 연결 </button>
                    <button className="account-btn btn"> 잔액 한도 상향 </button>
                </div>
            </div>
            <div className="copay-wrap-second">
                <div style={{ marginRight: "1%" }}><button className="charging-btn btn">충전하기</button></div>
                <div style={{ marginRight: "1%" }}><button className="charging-btn btn">인출하기</button></div>
            </div>
        </div>
    )
}

export const MyCopangPay = () => {
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('body');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const descriptionElementRef = useRef(null);
    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <div>
            <div className="copay-title-wrap">
                <div><h1>결제수단, 쿠페이 관리</h1></div>
                <div className="copay-history">
                    <button className="copay-history-btn btn" onClick={handleClickOpen()}>쿠페이 사용내역</button>
                </div>
            </div>
            <div className="copay-admin">
                <CopayAdmin />
            </div>
            <div className="copay-benefit">
                <div className="copay-item">
                    <div style={{fontSize:"1.25em"}}>쿠페이 적립혜택</div>
                    <div></div>
                </div>
                <div className="copay-item">
                    <div style={{fontSize:"1.25em"}}>적립 예정</div>
                    <div>
                        <span>0</span>
                        <span>원</span>
                    </div>
                </div>
                <div className="copay-item">
                    <div style={{fontSize:"1.25em"}}> 지금 까지 받은 총 혜택</div>
                    <div>
                        <span>0</span>
                        <span>원</span>
                    </div>
                </div>
            </div>
            <div className="copay-summary">
                <div className="copay-summary-carbank cs-item">
                    결제 수단 관리 
                </div>
                <div className="copay-summary-money cs-item">
                    현금 영수증 설정 
                </div>
                <div className="copay-summary-pass cs-item">
                    비밀번호 변경
                </div>
            </div>

            {/*  */}
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">사용내역
                </DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <h3>사용내역이 없습니다.</h3>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}