import { ARTICAL_REPORT_DELETE } from "../actions/actionTypes";

export default (state = {}, action) => {
    switch (action.type) {
        case ARTICAL_REPORT_DELETE:
            return action.dataId;
        default: return state;
    }
}