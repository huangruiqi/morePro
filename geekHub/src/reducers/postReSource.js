import { SOURCE_REPORT_POST } from "../actions/actionTypes";

export default (state = {}, action) => {
    switch (action.type) {
        case SOURCE_REPORT_POST:
            return action.postReSource;
        default: return state;
    }
}