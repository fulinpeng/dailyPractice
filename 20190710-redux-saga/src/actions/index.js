

export const increment = () => {
    return {
        type: 'INCREMENT1_ASYNC',
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
export const reduce = () => {
    return {
        type: 'INCREMENT_ASYNC',
        payload: {}
    };
};
