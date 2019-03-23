import { ARTICAL_STOP_POST } from "../actions/actionTypes";

export default (state = {}, action) => {
    switch (action.type) {
        case ARTICAL_STOP_POST:
            return action.postStopArtical;
        default: return state;
    }
}