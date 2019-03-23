import { FETCH_REPORTCOMMENT_DETAIL } from "../actions/actionTypes";

export default (state = 0, action) => {
    switch (action.type) {
        case FETCH_REPORTCOMMENT_DETAIL:
            return action.id;
        default: return state;
    }
}