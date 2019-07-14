
import  { REDUCE }  from '_root/const/index';
const initialState = {
    number: 100
};

export const reduceReducer = (state = initialState, action) => {
    switch (action.type) {
        case REDUCE: {
            state.number -= 1
            return { ...state }
            break
        };
        default: return state;
    }
};