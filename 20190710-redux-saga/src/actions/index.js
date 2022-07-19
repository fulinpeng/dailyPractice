

export const incrementSaga = () => {
    return {
        type: 'INCREMENT1_SAGA',
        payload: {}
    };
};
export const increment2 = () => {
    return {
        type: 'INCREMENT2',
        payload: {}
    };
};

// 这是一个saga的辅助action，用来唤起真正的action的，取名为 INCREMENT_SAGA 更好一些
export const reduceSaga = () => {
    return {
        type: 'INCREMENT_SAGA',
        payload: {}
    };
};
