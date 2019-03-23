import { CHANGE_REPORTARTICAL_DATA, DELETE_REPORTARTICAL_DATA } from "../actions/actionTypes";

//删除数据行
const deleteKey = (state, key) => {
    const newState = JSON.parse(JSON.stringify(state));
    if (key == newState.length) {
        newState.pop();
        return newState;
    }else{
        newState.forEach((data, i, dataAll) => {
            if (i + 1 >= key && i + 1 < dataAll.length) {
                newState[i] = newState[i + 1];
            } else if (i + 1 == dataAll.length) {
                newState.pop();
            }
        });
    }
    return newState;
}

export default (state = [], action) => {
    switch (action.type) {
        case CHANGE_REPORTARTICAL_DATA:
            return action.objectArray;
        case DELETE_REPORTARTICAL_DATA:
            return deleteKey(state, action.key);
        default: return state;
    }
}