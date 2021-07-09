import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button
} from "@material-ui/core";
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DaumPostcode from "react-daum-postcode";

export default function MyCopangAddressForm({ history }) {
  let xs = 10;
  const [daumAddress, setDaumAddress] = useState("")
  const [addrValues, setAddrValues] = useState({ address: "", detail: "", receiverName: "", receiverPhone: "", preRequest: "" });
  
  useEffect( () => {
    // console.log(daumAddress)
    setAddrValues({...addrValues, address : daumAddress});
  },[daumAddress])

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target)
    const data = { ...addrValues, [name]: value };
    setAddrValues(data);
  }

  //주소 저장하기
  const SubmitAddr = () => {
    const uri = 'https://alconn.co/api/address';
    const postAddr = async () => {
      await axios.post(uri, addrValues).then(()=>history.push("/mycopang/my-addr"));
    }
    postAddr()
  }

  // dialogue 코드 
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('body');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleSelectClose = () => {
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
  
  //daumpostcode
  //우편번호 선택시 fullAddress 찍힘
  const handleComplete = (data) => {
    const data2 = {...data};
    console.log(data)
    let fullAddress = data2.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }
    console.log(fullAddress);  // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    setDaumAddress(fullAddress)
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        배송지 주소 추가
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={xs} sm={4}>
          <TextField
            required
            id="receiverName"
            name="receiverName"
            value={addrValues.receiverName}
            label="받는 사람"
            fullWidth
            autoComplete="given-name"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={xs} sm={6}>
          <TextField
            required
            id="receiverPhone"
            name="receiverPhone"
            value={addrValues.receiverPhone}
            label="전화번호"
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={xs} sm={6}>
          <button onClick={handleClickOpen("paper")}>주소지 추가히기</button>
        </Grid>
        <Grid item xs={xs}>
          <TextField
            required
            id="address"
            name="address"
            value={daumAddress}
            label="배송 주소를 입력해주세요"
            fullWidth
            autoComplete="shipping address-line"
            onChange={handleChange}
            onClick={handleClickOpen("paper")}
          />
        </Grid>
        <Grid item xs={xs}>
          <TextField
            required
            id="detail"
            name="detail"
            value={addrValues.detail}
            label="상세 주소 입력해주세요"
            fullWidth
            autoComplete="shipping address-line"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={xs}>
          <TextField
            id="preRequest"
            name="preRequest"
            value={addrValues.preRequest}
            label="요청 사항을 말씀해주세요"
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid container item xs={xs} justify="center" >
          <Button variant="contained" color="primary" onClick={SubmitAddr}>저장하기</Button>
          <Button onClick={() => console.log(addrValues)}>제발</Button>
        </Grid>
      </Grid>

      {/* 모달 띄우기 */}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">우편번호 검색</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <DaumPostcode onComplete={handleComplete} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSelectClose} color="primary">
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>


  );
}
