import { MailRounded, Restaurant } from "@material-ui/icons";
import { useEffect, useState } from "react";

const Test22 = () => {
    const [imgList, setImglist] = useState([]);
    const [itemList, setItemList] = useState([]);
    const [item, setItem] = useState({});
    const [idx, setIdx] = useState();
    const [test,setTest] = useState();
    const [refresh, setRefresh] = useState(0);

    const inputChange = (e) => {
        setItem({
            ...item,
            [e.target.name] : e.target.value,
        })
    }
    const addItem = () => {
        setItemList([
            ...itemList,
            {
                ...item,
            }
        ])
    }
    const deleteItem = (idx) => {
        setItemList(
            itemList.filter( (row,rowidx) => rowidx != idx )
        )
    }
    const addItemImg = (file, idx) => {
        
        itemList[idx].img = URL.createObjectURL(file);

        setRefresh(prev => prev+1);
    }

    useEffect( () => {
        console.log(itemList);
    },[refresh])
    
    
    return (
        <div>
            <select>
                <option>1</option>
            </select>
            {JSON.stringify(itemList)}
            <br/><input type="file" name="test" onChange={(e)=>setTest(URL.createObjectURL(e.target.files[0]))}/><br/>
            {test && <img src={test}/>}<br/>
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
                        <td>{row.img && <img src={row.img}/>}</td>
                        <td>
                            <input type="file" name="img" onChange={(e)=>addItemImg(e.target.files[0], idx)}/>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default Test22;