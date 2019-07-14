
import  { INCREMENT, INCREMENT2 }  from '_root/const/index';
const initialState = {
    number: 0
};

export const increment = (state = initialState, action) => {
    console.log('@@@@@@@@@@@reduceReducer', state);
    switch (action.type) {
        case INCREMENT: {
            state.number += 1
            return { ...state }
            break
        };
        case INCREMENT2: {
            state.number += 2
            return { ...state }
            break
        };
        default: return state;
    }
};