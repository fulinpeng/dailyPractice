
const initialState = {
    data: null,
};

export const testApisTest1 = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case 'TESTAPISTEST1': {
            state.data = action.response;
            return { ...state }
            break
        };
        default: return state;
    }
};

export const REQUEST_FAILED = (state = {error: null}, action) => {
    switch (action.type) {
        case 'REQUEST_FAILED': {
            state.data = action.error;
            return { ...state }
            break
        };
        default: return state;
    }
};

