import { RIGHTS_AGREE, RIGHTS_AGREE_FAILURE, RIGHTS_AGREE_SUCCESS, RIGHTS_DISAGREE, RIGHTS_DISAGREE_FAILURE, RIGHTS_DISAGREE_SUCCESS } from '../actions/actionTypes';
const initalState = {
    tableData: [{
        id: 11,
        userName: 'John Brown',
        permissionType: 32,
        applyTime: 'New York No. 1 Lake Park',
    }, {
        id: 12,
        userName: 'Jim Green',
        permissionType: 42,
        applyTime: 'London No. 1 Lake Park',
    }, {
        id: 13,
        userName: 'Joe Black',
        permissionType: 32,
        applyTime: 'Sidney No. 1 Lake Park',
    }]
}
export default (state = initalState, action = {}) => {
    switch (action.type) {
        case RIGHTS_AGREE_SUCCESS:
            return {
                ...state
            }
        case RIGHTS_AGREE_FAILURE:
            return {
                ...state
            }
        default:
            return state;
    }
}