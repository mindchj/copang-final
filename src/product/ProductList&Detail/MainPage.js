import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Product.css';

const MainPage = ({history}) => {

    // const [CategoryProductList, setCategoryProductList] = useState([]);
    // useEffect(() => {
    //     const res = async () => {
    //         const result = await axios.get("https://alconn.co/api/category/list");
    //         setCategoryProductList(result.data.data)
    //         console.log(result.data)
    //     }
    //     res();
    // }, [])
    // console.log(CategoryProductList)

    let DRESS_CATEGORY_ID=15

    // const [CategoryProduct, setCategoryProduct] = useState([]);
    // useEffect(() => {
    //     const res = async () => {
    //         const result = await axios.get("https://alconn.co/api/item/list/categoryid=" +15);
    //         setCategoryProduct(result.data.data)
    //         console.log(result.data)
    //     }
    //     res();
    // }, [])
    // console.log(CategoryProduct)

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <div id="demo" className="carousel slide" data-ride="carousel">


                <ul className="carousel-indicators">
                    <li data-target="#demo" data-slide-to="0" className="active"></li>
                    <li data-target="#demo" data-slide-to="1"></li>
                    <li data-target="#demo" data-slide-to="2"></li>
                </ul>

                <div className="carousel-inner" style={{width:'1280px',height:'500px'}}>
                    <div className="carousel-item active" style={{width:'80%',height:'80%', marginLeft:'10%',marginTop:'5%',borderRadius:'5%'}}>
                        <img style={{width:'100%',height:'100%'}} src="https://static.alconn.co/image/aecd5871-3153-464e-847e-49ca115c2d48" alt="Los Angeles" />
                    </div>
                    <div className="carousel-item" style={{width:'80%',height:'80%', marginLeft:'10%',marginTop:'5%'}}>
                        <img style={{width:'100%',height:'100%'}} src="https://static.alconn.co/image/8caf3d44-3e1d-4271-8a80-fc5424b25791" alt="Chicago" />
                    </div>
                    <div className="carousel-item" style={{width:'80%',height:'80%', marginLeft:'10%',marginTop:'5%'}}>
                        <img style={{width:'100%',height:'100%'}} src="https://static.alconn.co/image/80126ed2-d110-40cb-994a-ed74c21b5675" alt="New York" />
                    </div>
                </div>


                <a className="carousel-control-prev" href="#demo" data-slide="prev">
                    <span className="carousel-control-prev-icon"></span>
                </a>
                <a className="carousel-control-next" href="#demo" data-slide="next">
                    <span className="carousel-control-next-icon"></span>
                </a>

            </div><br/><br/><br/>
            <strong style={{ fontSize: '20pt' }}>오늘의 발견</strong>&nbsp;&nbsp;<span style={{ fontSize: '15pt', color: '#777' }}> | COPANG이 엄선한 가장 HOT한 상품!</span><br/><br/>
            <ul className="MainImage" style={{ float: 'left' }}>
                <li><img style={{ width: '400px', height: '508px' }} alt="" src="https://static.alconn.co/image/984ade40-745d-4138-9997-c7fda3493f2e" /></li>
                <li onClick={()=>{history.push("/product/category/"+DRESS_CATEGORY_ID)}}><img style={{ width: '600px', height: '250px' }} alt="" src="https://static.alconn.co/image/00130026-b9fe-45a9-a5eb-732f016c246d" /></li>
                <li><img style={{ width: '250px', height: '250px' }} alt="" src="https://static.alconn.co/image/b43e2172-05d0-4bfe-a38c-6360325973de" /></li>
                <li><img style={{ width: '250px', height: '250px' }} alt="" src="https://static.alconn.co/image/03ae243d-dff0-43c7-8f98-b2489e7c6a40" /></li>
                <li><img style={{ width: '600px', height: '250px' }} alt="" src="https://static.alconn.co/image/d40b17f5-8dd5-4b56-b3f4-842f31338492" /></li>
                <li><img style={{ width: '628px', height: '500px' }} alt="" src="https://static.alconn.co/image/26d8e6ef-fc45-41f8-9a81-4e3365604a97" /></li>
                <li><img style={{ width: '628px', height: '500px' }} alt="" src="https://static.alconn.co/image/d24bcb83-01fc-445a-8139-4a0159b9ad6d" /></li>
            </ul>
        </div>
    )
}

export default MainPage;