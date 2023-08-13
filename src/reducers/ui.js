import { fromJS } from "immutable";
import { SET_LOADING } from "../actions/types";

const initialState = fromJS({
     loading: false
});

export const uiReducer = (state = initialState, action) => {
console.log("%c 🌞: uiReducer -> state ", "font-size:16px;background-color:#7c7ff0;color:white;", state)
    
    switch(action.type) {
        case SET_LOADING:
            return state.setIn(['loading'], fromJS(action.payload));
    default:
        return state;
    }
};
