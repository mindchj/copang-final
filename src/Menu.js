import { Link } from "react-router-dom";

const Menu = () => {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/member/1">장바구니</Link>
                </li>
                <li>
                    <Link to="/member/2">판매자 상품등록</Link>
                </li>
                <li>
                    <Link to="/member/3">(Test)리덕스 Example</Link>
                </li>
                <li>
                    <Link to="/member/4">상품 리스트</Link>
                </li>
                <li>
                    <Link to="/member/5">마이 페이지</Link>
                </li>
                <li>
                    <Link to="/member/6">(Test)상품 추가폼</Link>
                </li>
                <li>
                    <Link to="/member/7">(Test)임시 코드 테스트</Link>
                </li>
                <li>
                    <Link to="/member/8">(Test)서버 API 테스트</Link>
                </li>
            </ul>
            <hr/>
        </div>
    )
}

export default Menu;