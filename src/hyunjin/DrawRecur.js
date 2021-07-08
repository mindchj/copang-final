
import React, { useEffect } from 'react';

const DrawRecur = ({cild}) => {
    useEffect( () => {
        console.log("useEffect 실행");
        console.log(cild);
    },[])
    return (
        <div>aaa{cild.categoryName}bbb
            {cild[0] && cild.map( (row,idx) =>
                // <DrawRecur cild={row}/>
                <div>hi~</div>
            )}
            {cild.length==0 && <div>this is final</div>}
        </div>
    );
};

export default DrawRecur;