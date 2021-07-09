import React,{useEffect, useState} from 'react';
// import { Route } from 'react-router-dom';
import axios from 'axios';
import './Product.css';
import ProductListRowItem from './ProductListRowItem';


const ProductList = (props,{history}) =>{
    const [ProductList, setProductList] = useState([]);
    console.log(props.match.params.categoryId)
    let categoryId=props.match.params.categoryId;

    useEffect(() => {
        if(props.match.params===null){
            const res = async() =>{
                const result= await axios.get("https://alconn.co/api/item/list/0");
                setProductList(result.data.data)
            }
            res();
        }else{
            const res = async () => {
                const result = await axios.get("https://alconn.co/api/item/list/categoryid=" + categoryId);
                setProductList(result.data.data)
                console.log(result.data)
            }
            res();
        }    
    }, [])
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