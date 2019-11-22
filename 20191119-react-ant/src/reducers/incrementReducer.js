

const initialState = {
    number: 0
};

export const increment = (state = initialState, action) => {
    console.log('@@@@@@@@@@@increment', state);
    switch (action.type) {
        case 'INCREMENT': {
            state.number += 1
            return { ...state }
            break
        };
        case 'INCREMENT2': {
            state.number += 2
            return { ...state }
            break
        };
        default: return state;
    }
};