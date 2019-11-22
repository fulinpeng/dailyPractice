
const initialState = {
    data: null,
};

export const testApisTest2 = (state = initialState, action) => {
    switch (action.type) {
        case 'TESTAPISTEST2': {
            state.data = action.response;
            return { ...state }
            break
        };
        default: return state;
    }
};

