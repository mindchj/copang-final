import { Link } from "react-router-dom";

const Menu = () =>{
    return (
        <div>
            <ul>
                <li>
                    <Link to="/test">장바구니 테스트</Link>
                </li>
                <li>
                    <Link to="/cart2">장바구니2</Link>
                </li>
                <li>
                    <Link to="/test22/13">Test22 페이지</Link>
                </li>
            </ul>
            <hr/>
        </div>
    )
}

export default Menu;