
const initialState = {
    number: 100
};

export const subductionReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SUBDUCTION': {
            state.number -= 1
            return { ...state }
            break
        };
        default: return state;
    }
};

