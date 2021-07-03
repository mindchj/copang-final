import { connect } from "formik";
import { createAction, handleActions } from "redux-actions";

const SET_ITEM_NAME = "setItemName";
const SET_ITEM_CONTENT = "setItemContent";
const ADD_FORM_LIST = "addFormList";
const DEL_FORM_LIST = "delFormList";
const MOD_FORM_LIST = "modFormList";

const setItemName = createAction(SET_ITEM_NAME, itemName => itemName);
const setItemContent = createAction(SET_ITEM_CONTENT, itemContent => itemContent);
const addFormList = createAction(ADD_FORM_LIST, form => form);
const delFormList = createAction(DEL_FORM_LIST, idx => idx);
const modFormList = createAction(MOD_FORM_LIST, (form, idx) => ({ form: form, idx: idx }));

const init = {
    itemName : "",
    itemComment : "",
    itemDetailFormList : [],
}

export const setter = handleActions(
    {
        [SET_ITEM_NAME] : (state, action) => (
            {
                ...state,
                itemName : action.payload,
            }
        ),
        [SET_ITEM_CONTENT] : (state, action) => (
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
        }
    },
    init,
)

const Container = ({product, setItemName, setItemContent, addFormList, delFormList, modFormList}) => {

    return (
        <div>
            <Example/>
        </div>
    )

}

export default connect(
    state => ({
        product : state,
    }),
    {
        setItemName,
        setItemContent,
        addFormList,
        delFormList,
        modFormList,
    }
)(Container);