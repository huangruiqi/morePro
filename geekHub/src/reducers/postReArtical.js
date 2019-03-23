import { ARTICAL_REPORT_POST } from "../actions/actionTypes";

export default (state = {}, action) => {
    switch (action.type) {
        case ARTICAL_REPORT_POST:
            return action.postReArtical;
        default: return state;
    }
}