import axios from "axios";
import { useState } from "react";

const Test22 = () => {

    const [imgname, setImgname] = useState();

    const getCart = () => {
        const axiosGetCart = async () => {
            const token = localStorage.getItem("accessToken");
            console.log(token);
            const data = {
                headers: {
                    Authorization: `Bearer ${token}`
                  }
            }
            const result = await axios.get("https://alconn.co/api/cart",data);
            console.log("reslut:");
            console.log(result);
        }
        axiosGetCart();
    }

    const axiosTest = () => {
        axios.defaults.baseURL = "http://localhost:9001/cart/selectall";
        axios.defaults.headers.common['Authorization'] = 'bearer aaaa';

        const getCart = async () => {
            const result = await axios.get();
            console.log(result);
        }
        getCart();
    }

    const onchangeInput = (e) => {
        setImgname(e.target.files[0].name);
    }

    const printProduct = () => {
        console.log(Product.filename);
    }

    const Product = {
        "filename" : imgname,
    }

     return (
        <div>
            <div class="form-check">
                <input type="checkbox" class="form-check-input" value=""/>Option 1
            </div>
            <button onClick={getCart}>카트토큰 예제</button>
            <button onClick={axiosTest}>axios default 테스트</button>
            <input onChange={onchangeInput} type="file"/>
            <button onClick={printProduct}>Product 출력</button>
            
        </div>
    )
}

export default Test22;