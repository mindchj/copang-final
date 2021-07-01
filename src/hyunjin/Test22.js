import axios from "axios";

const Test22 = () => {

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

    const addCart = () => {
        const axiosAddCart = async () => {
            const token = localStorage.getItem("accessToken");
            console.log(token);
            const data = {
                "itemId" : 1002,
                "itemDetailId" : 1003,
                "amount" : 2
            }
            const result = await axios.post("https://alconn.co/api/cart/item",data)
            console.log(result);
        }
        axiosAddCart();
    }

     return (
        <div>
            <div class="form-check">
                <input type="checkbox" class="form-check-input" value=""/>Option 1
            </div>
            <button onClick={getCart}>장바구니 조회(로그인후 할 것)</button>
            <button onClick={addCart}>장바구니 추가(1002,1003,3)</button>
            
        </div>
    )
}

export default Test22;