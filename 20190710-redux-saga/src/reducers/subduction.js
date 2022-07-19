

const initialState = {
    number: 100
};

export const subduction = (state = initialState, action) => {
    switch (action.type) {
        case 'SUBDUCTION': {
            state.number -= 1
            return { ...state }
            break
        };
        default: return state;
    }
};

