import { useState } from "react";

const Test22 = () => {
    const [img, setImg] = useState();
    const [obj, setObj] = useState({
        aa:"aa",
        bb:"bb",
    })

    const changeImg = (e) => {
        setImg(URL.createObjectURL(e.target.files[0]));
        setObj({...obj, img});
    }
    return(
        <div>
            각종 코드 테스트
            <br/>
            이미지첨부<input onChange={changeImg} type="file"/><br/>
            {img && <img src={img}/>}<br/>
            이미지2<br/>
            <img src={obj.img}/>
            
        </div>
    )
}

export default Test22;