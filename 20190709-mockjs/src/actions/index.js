import {INCREMENT, INCREMENT_ASYNC, INCREMENT2} from '_root/const/index'

export const increment = () => {
    return {
        type: 'INCREMENT1_ASYNC',
        payload: {}
    };
};
export const increment2 = () => {
    return {
        type: INCREMENT2,
        payload: {}
    };
};

export const reduce = () => {
    return {
        type: INCREMENT_ASYNC,
        payload: {}
    };
};
