import { useState } from "react";

const Test22 = () => {
    const [imgList, setImglist] = useState([]);
    const [itemList, setItemList] = useState([]);
    const [item, setItem] = useState({});
    const [idx, setIdx] = useState();

    const inputChange = (e) => {
        setItem({
            ...item,
            [e.target.name] : e.target.value,
        })
    }
    const addItem = () => {
        setItemList([
            ...itemList,
            item,
        ])
    }
    const deleteItem = (idx) => {
        setItemList(
            itemList.filter( (row,rowidx) => rowidx != idx )
        )
    }
    const addItemImg = (e, idx) => {
        const newList = itemList;
        newList[idx].img = e.target.files[0];
        setItemList(newList);
    }
    
    
    return (
        <div>
            idx : <input name="idx" onChange={(e)=>setIdx(e.target.value)}/><br/>
            name : <input name="name" onChange={inputChange}/><br/>
            desc : <input name="desc" onChange={inputChange}/><br/>
            <button onClick={addItem}>옵션 추가</button>
            <button onClick={()=>deleteItem(idx)}>옵션 제거</button>
            <br/>
            <table className="table table-bordered">
                <tbody>
                    <tr><td>idx</td><td>name</td><td>desc</td><td>img</td><td>imgInput</td></tr>
                { itemList && itemList.map( (row,idx) => 
                    <tr>
                        <td>{idx}</td>
                        <td>{row.name}</td>
                        <td>{row.desc}</td>
                        <td><img src={URL.createObjectURL(row.img)}/></td>
                        <td>
                            <input type="file" name="img" onChange={(e)=>addItemImg(e, idx)}/>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default Test22;