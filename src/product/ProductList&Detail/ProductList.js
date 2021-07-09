import React,{useEffect, useState} from 'react';
// import { Route } from 'react-router-dom';
import axios from 'axios';
import './Product.css';
import ProductListRowItem from './ProductListRowItem';


const ProductList = (history) =>{
    const [ProductList, setProductList] = useState([]);

    useEffect( ()=>{
        const res = async() =>{
            const result= await axios.get("https://alconn.co/api/item/list/0");
            setProductList(result.data.data)
        }
        res();
    },[])
    console.log(ProductList)
    return (
        <div className="productlist">
            <ul className="searchproduct">
                {   
                    ProductList.list&&ProductList.list.map((row,idx)=>
                    <ProductListRowItem row={row} key={idx} no={idx+1}
                        history={history} />
                )}
            </ul>
        </div> 
        )
}


export default ProductList;