import React, { useState, useCallback } from "react";
import {
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from "@material-ui/core";
import axios from "axios";

const AddressUpdateForm = ({ location, history }) => {
  let xs = 10;
  const [addrValues, setAddrValues] = useState({
    address: location.state.addrValues.address,
    detail: location.state.addrValues.detail,
    receiverName: location.state.addrValues.receiverName,
    receiverPhone: location.state.addrValues.receiverPhone,
    preRequest: location.state.addrValues.preRequest,
    priority: location.state.addrValues.priority,
  });
  // const [defaultAddr, setDeefaultAddr] = useState ({
  //     defaultAddress : location.state.defaultAddr.defaultAddress
  // })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddrValues({ ...addrValues, [name]: value });
  };

  const useToggle = (
    initalState = addrValues.priority === "PRIMARY" ? true : false
  ) => {
    const [state, setState] = useState(initalState);
    const toggle = useCallback(() => setState((state) => !state), []);
    return [state, toggle];
  };

  const [isChecked, setIsChecked] = useToggle();

  const updateAddr = (addressId) => {
    // console.log(addressId);
    const uri = "https://alconn.co/api/address/" + addressId;
    if (isChecked === false) {
      const putAddr = async () => {
        await axios.put(uri, addrValues);
        history.push("/mycopang/my-addr");
      };
      putAddr();
    }
    const uriDefault = "https://alconn.co/api/address/" + addressId;
    if (isChecked === true) {
      const putDefaultAddr = async () => {
        await axios.put(uri, addrValues);
        await axios.patch(uriDefault, addrValues);
        history.push("/mycopang/my-addr");
      };
      putDefaultAddr();
    }
  };

  // const updateDefaultAddr = () => {
  //     const defaultAddrUri = 'https://alconn.co/api/address/default';
  //     const postDefaultAddr = async () => {
  //         await axios.post(defaultAddrUri,defaultAddr).then(res => console.log(res))
  //     }
  //     postDefaultAddr()
  // }

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
              <Checkbox
                color="primary"
                name="defaultAddress"
                checked={isChecked ? true : false}
                // onChange={handleDefaultAddrChange}
                // onClick={updateDefaultAddr}
                onClick={() => setIsChecked()}
              />
            }
            label="기본 배송지로 선택"
          />
        </Grid>
        <Grid container item xs={xs} justify="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => updateAddr(location.state.addrValues.addressId)}
          >
            수정하기
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default AddressUpdateForm;
