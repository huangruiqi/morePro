import { COMMENT_REPORT_POST } from "../actions/actionTypes";

export default (state = {}, action) => {
    switch (action.type) {
        case COMMENT_REPORT_POST:
            return action.postReComment;
        default: return state;
    }
}