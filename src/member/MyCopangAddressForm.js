import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button
} from "@material-ui/core";
import axios from 'axios';

export default function MyCopangAddressForm({ history }) {
  let xs = 10;
  const [addrValues, setAddrValues] = useState({ address: "", detail: "", receiverName: "", receiverPhone: "", preRequest: "" });
  // const [defaultAddr, setDeefaultAddr] = useState({ defaultAddress: "" })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddrValues({ ...addrValues, [name]: value });
  }
  const SubmitAddr = () => {
    const uri = 'https://alconn.co/api/address';
    const postAddr = async () => {
      await axios.post(uri, addrValues).then(history.push("/mycopang/my-addr"));
    }
    postAddr()
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
        <Grid item xs={xs}>
          <TextField
            required
            id="address"
            name="address"
            value={addrValues.address}
            label="배송 주소를 입력해주세요"
            fullWidth
            autoComplete="shipping address-line"
            onChange={handleChange}
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
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
