import axios from "axios";
import { useState } from "react";

const Test22 = () => {

    const [itemId, setItemId] = useState();

    const deleteItem = () => {
        const axiosDelete = async () => {
            const result = await axios.delete("https://alconn.co/api/item/delete/"+itemId);
            console.log(result);
        }
        axiosDelete();
    }

    return (
        <div>
            입력된 itemID : {itemId}<br/>
            <input type="text" onChange={(e)=>setItemId(e.target.value)}/><br/>
            <button onClick={deleteItem}>상품삭제</button>
        </div>
    )
}

export default Test22;