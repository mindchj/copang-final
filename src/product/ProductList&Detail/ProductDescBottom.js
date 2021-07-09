import axios from "axios";
import { useEffect, useState } from "react";

const ProductDescBottom=(props)=>{

    let itemId = props.match.params.itemId;
    const [ProductOne, setProductOne] = useState();
    useEffect(() => {
        const res = async () => {
            const result = await axios.get("https://alconn.co/api/item/list/itemid=" + itemId);
            setProductOne(result.data.data)
        }
        res();
    }, [itemId])
    // console.log(ProductOne.itemComment);//ProductOne.itemComment - 이미지로 해야함(src에 등록)

    return(
            <div className="product-detail-desc">
                <div><img alt="itemComment" src={ProductOne && ProductOne.itemComment}/></div>
                {/* <div><img alt="사진1" src="/상품상세1.PNG"/></div> 
                <div><img alt="사진2" src="/상품상세2.PNG"/></div> */}
            </div>
    )
}

export default ProductDescBottom;