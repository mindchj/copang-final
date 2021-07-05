import { connect } from "react-redux";
import { createStore } from "redux";
import { createAction, handleActions } from "redux-actions";
import Example from './Example';

// 1. 액션타입 정의
const SET_ITEM_NAME = "setItemName";
const SET_ITEM_COMMENT = "setItemComment";
const ADD_FORM_LIST = "addFormList";
const DEL_FORM_LIST = "delFormList";
const MOD_FORM_LIST = "modFormList";
const MOD_FORM_ONE = "modFormOne";

// 2. 액션타입 생성 (redux-actions의 createAction 함수 사용)
const setItemName = createAction(SET_ITEM_NAME, itemName => itemName);
const setItemComment = createAction(SET_ITEM_COMMENT, itemComment => itemComment);
const addFormList = createAction(ADD_FORM_LIST, form => form);
const delFormList = createAction(DEL_FORM_LIST, idx => idx);
const modFormList = createAction( MOD_FORM_LIST, (idx, form) => ({ form: form, idx: idx }) );
const modFormOne = createAction( MOD_FORM_ONE, (idx, key, value) => ({ idx: idx, key: key, value: value }) )

// 3. store state 초기값
const init = {
    itemName : "",
    itemComment : "",
    itemDetailFormList : [],
}

// 4. 액션처리 리듀서 - 받아온 액션타입에 맞게 store state를 변경
export const setter = handleActions(
    {
        [SET_ITEM_NAME] : (state, action) => (
            {
                ...state,
                itemName : action.payload,
            }
        ),
        [SET_ITEM_COMMENT] : (state, action) => (
            {
                ...state,
                itemComment : action.payload,
            }
        ),
        [ADD_FORM_LIST] : (state, action) => (
            {
                ...state,
                itemDetailFormList : state.itemDetailFormList.concat(action.payload),
            }
        ),
        [DEL_FORM_LIST] : (state, action) => (
            {
                ...state,
                itemDetailFormList : state.itemDetailFormList.filter( (row,idx) => idx != action.payload ),
            }
        ),
        [MOD_FORM_LIST] : (state, action) => {
            let newState = state;
            newState.itemDetailFormList[action.payload.idx] = action.payload.form;
            return newState;
        },
        [MOD_FORM_ONE] : (state, action) => {
            console.log("MOD_FORM_ONE 진입");
            let newState = state;
            console.log(action);
            newState.itemDetailFormList[action.payload.idx] = {
                ...newState.itemDetailFormList[action.payload.idx],
                [action.payload.key] : action.payload.value,
            };
            console.log(newState);
            return newState;
        },
    },
    init,
)

// 5. store 생성후 액션처리 리듀서와 연결 -> <Provider store={store}> 형식으로 import
export const store = createStore(setter);

// 6. Provider 내부에서 store와 통신할 Container 컴포넌트 정의
const Container = ({product, setItemName, setItemComment, addFormList, delFormList, modFormList, modFormOne}) => {

    return (
        <div>
            <Example product={product} setItemName={setItemName} setItemComment={setItemComment}
                     addFormList={addFormList} delFormList={delFormList} modFormList={modFormList} modFormOne={modFormOne}/>
        </div>
    )

}

// 7. Container 컴포넌트에 store state 와 액션처리 리듀서 매핑
export default connect(
    state => ({
        product : state.setter,
    }),
    {
        setItemName,
        setItemComment,
        addFormList,
        delFormList,
        modFormList,
        modFormOne,
    }
)(Container);


// 정리
// 연결관계 : Provider는 store state & 액션처리 리듀서와 연결되어 있음
// 연결관계2 : Container는 store state & 액션타입 생성함수와 연결되어 있음
// 리덕스 흐름설명 예시)

// Container에서 setItemName("abc") 액션타입 생성함수를 실행하면, 
// Provideer의 액션처리 리듀서의 [SET_ITEM_NAME] 필드로 이동하여 "abc"값을 넘겨줌
// 액션처리 리듀서는 store state의 itemName 필드값을 "abc"로 변경
// Container는 store state의 변경된 값을 props로 받아서 리렌더링

// 즉 Container 액션생성 -> Provider 액션처리 -> Container 리렌더링 순서
// 따라서 Container는 store state와 액션생성함수를 매핑시켜야 하고,
// Provider는 store state와 액션처리 함수를 매핑시켜야 한다.

