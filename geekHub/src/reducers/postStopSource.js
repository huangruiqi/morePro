import { SOURCE_STOP_POST } from "../actions/actionTypes";

export default (state = {}, action) => {
    switch (action.type) {
        case SOURCE_STOP_POST:
            return action.postStopSource;
        default: return state;
    }
}