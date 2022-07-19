

const initialState = {
    number: 100
};

export const reduce = (state = initialState, action) => {
    switch (action.type) {
        case 'REDUCE': {
            state.number -= 1
            return { ...state }
            break
        };
        default: return state;
    }
};