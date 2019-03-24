
import  { INCREMENT }  from '_root/const/index';
const initialState = {
    number: 0
};

export const incrementReducer = (state = initialState, action) => {
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@', state);
    switch (action.type) {
        case INCREMENT: {
            state.number += 1
            return { ...state }
            break
        };
        default: return state;
    }
};