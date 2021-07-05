import { useState } from "react";

const Test22 = () => {

    const [p1, setP1] = useState({});
    const [p2, setP2] = useState([]);

    const onChangep1 = (e) => {
        const state = {
            [e.target.name] : e.target.value,
        }
        setP1(state);
    }

    const onClickp2 = () => {
        setP2([
            ...p2,
            p1,
        ])
    }

    return(
        <div>
            옵션명 : <input name="name" onChange={onChangep1} value={p1.name}/>  옵션값 : <input name="value" onChange={onChangep1} value={p1.value}/>
            <br/>
            <br/>
            <button onClick={onClickp2}>목록에 추가</button>
            <br/>
            목록 : {JSON.stringify(p2)}
        </div>
    )
}

export default Test22;