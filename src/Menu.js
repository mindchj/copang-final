import { Link } from "react-router-dom";

const Menu = () => {
    return (
        <div>
            <Link to="/member/1">장바구니</Link>&nbsp;&nbsp;
            <Link to="/member/2">판매자 상품등록</Link>&nbsp;&nbsp;
            <Link to="/member/3">MainPage(작업중)</Link>&nbsp;&nbsp;
            <Link to="/product">상품 리스트</Link>&nbsp;&nbsp;
            <Link to="/member/5">마이 페이지</Link><br/>
            <Link to="/member/6">(Test)상품 추가폼</Link>&nbsp;&nbsp;
            <Link to="/member/7">(Test)임시 코드 테스트</Link>&nbsp;&nbsp;
            <Link to="/member/8">(Test)서버 API 테스트</Link>&nbsp;&nbsp;
            <Link to="/member/9">(Test)카테고리 Drawer</Link>
            <hr/>
        </div>
    )
}
export default Menu;