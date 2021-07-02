import React, { useState, useEffect } from "react";
import {
    Grid,
    Typography,
    TextField,
    FormControlLabel,
    Checkbox,
    Button
} from "@material-ui/core";
import axios from 'axios';

const AddressUpdateForm = ({ location,history }) => {
    let xs = 10;
    const [addrValues, setAddrValues] = useState({
        address: location.state.addrValues.address,
        detail: location.state.addrValues.detail,
        receiverName: location.state.addrValues.receiverName,
        receiverPhone: location.state.addrValues.receiverPhone,
        preRequest: location.state.addrValues.preRequest
    }
    );
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddrValues({ ...addrValues, [name]: value });
    }

    const updateAddr = (addressId) => {

        // console.log(addressId);
        const uri = 'https://alconn.co/api/address/'+addressId;
        const putAddr =  async () => {
            await axios.put(uri, addrValues)
            history.push("/my-addr")
        }
        putAddr()

    }
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                배송지 주소 수정
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
                <Grid item xs={xs}>
                    <FormControlLabel
                        control={
                            <Checkbox color="primary" name="saveAddress" value={addrValues.saveAddress}
                                // onChange={handleChange}
                            // onClick={onClickChange}
                            />
                        }
                        label="기본 배송지로 선택"
                    />
                </Grid>
                <Grid container item xs={xs} justify="center" >
                    <Button variant="contained" color="primary" onClick={() => updateAddr(location.state.addrValues.addressId)}>수정하기</Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default AddressUpdateForm;