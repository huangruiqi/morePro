import { GET_REPORTCOMMENT_DETAIL } from "../actions/actionTypes";

export default (state = {}, action) => {
    switch (action.type) {
        case GET_REPORTCOMMENT_DETAIL:
            return action.detail;
        default: return state;
    }
}