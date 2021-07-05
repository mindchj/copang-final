

import React, { useEffect, useState } from 'react';

const Example = ({product, setItemName, setItemComment, addFormList, delFormList, modFormList, modFormOne}) => {

    const [refresh, setRefresh] = useState(0);
    const [iName, setIName] = useState("");
    const [iComment, setIComment] = useState("");
    const [idx, setIdx] = useState(0);
    const [key, setKey] = useState("");
    const [value, setValue] = useState("");
    const [form, setForm] = useState(
        {
            price : 0,
            stockQuantity : 0,
            optionName : "",
            optionValue : "",
            mainImg : "",
            subImg : "",
        }
    )

    const onChangeIName = (e) => {
        setIName(e.target.value);
    }

    const onChangeIComment = (e) => {
        setIComment(e.target.value);
    }

    const onChange = (e) => {
        setForm(form => ({
            ...form,
            [e.target.name] : e.target.value,
        }));
    }

    const addFunc = () => {
        addFormList(form);
    }

    const delFunc = () => {
        delFormList(idx);
    }

    const modFunc = () =>{
        modFormList(idx, form);
        setRefresh(prev => prev+1);
    }

    const modOneFunc = () => {
        modFormOne(idx, key, value);
        setRefresh(prev => prev+1);
    }

    useEffect( () => {
        console.log("store state : ");
        console.log(product);
    },[product])


    return (
        <div>
            itemName : <input onChange={onChangeIName} value={iName}/>
            <button onClick={ () => setItemName(iName)}>itemName 입력</button><br/>

            itemComment : <input onChange={onChangeIComment} value={iComment}/>
            <button onClick={ () => setItemComment(iComment)}>itemComment 입력</button><br/>

            price________ : <input name="price" onChange={onChange} value={form.price}/>
            stockQuantity : <input name="stockQuantity" onChange={onChange} value={form.stockQuantity}/>
            optionName : <input name="optionName" onChange={onChange} value={form.optionName}/><br/>
            optionValue : <input name="optionValue" onChange={onChange} value={form.optionValue}/>
            mainImg______ : <input name="mainImg" onChange={onChange} value={form.mainImg}/>
            subImg_____ : <input name="subImg" onChange={onChange} value={form.subImg}/><br/>

            작업할 idx : <input name="idx" onChange={(e)=>setIdx(e.target.value)} value={idx}/><br/>
            수정할 key : <input name="key" onChange={(e)=>setKey(e.target.value)} value={key}/><br/>
            수정할 value : <input name="value" onChange={(e)=>setValue(e.target.value)} value={value}/><br/>

            <button onClick={ modOneFunc }>key, value 수정</button><br/>

            <button onClick={ addFunc }>formList 추가</button><br/>

            <button onClick={ delFunc }>formList {idx} 삭제</button><br/>

            <button onClick={ modFunc }>formList {idx} 수정</button><br/>

            <hr/>
            <table className="table table-bordered" style={{width:'1000px',tableLayout:'fixed'}}>
                <thead>
                    <tr>
                        <th colSpan="7">
                            itemName : {product && product.itemName}<br/>
                            itemComment : {product && product.itemComment}
                        </th>
                    </tr>
                    <tr>
                        <th>idx</th>
                        <th>price</th>
                        <th>stockQuantity</th>
                        <th>optionName</th>
                        <th>optionValue</th>
                        <th>mainImg</th>
                        <th>subImg</th>
                    </tr>
                </thead>
                <tbody>
                    {product && product.itemDetailFormList.map( (row,idx) => 
                        <tr key={idx}>
                            <td>{idx}</td>
                            <td>{row.price}</td>
                            <td>{row.stockQuantity}</td>
                            <td>{row.optionName}</td>
                            <td>{row.optionValue}</td>
                            <td>{row.mainImg}</td>
                            <td>{row.subImg}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Example;