import { COMMENT_STOP_POST } from "../actions/actionTypes";

export default (state = {}, action) => {
    switch (action.type) {
        case COMMENT_STOP_POST:
            return action.postStopComment;
        default: return state;
    }
}