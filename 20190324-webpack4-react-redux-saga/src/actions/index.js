import {INCREMENT, REDUCE, INCREMENT2} from '_root/const/index'

export const increment = () => {
    return {
        type: INCREMENT,
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
        type: REDUCE,
        payload: {}
    };
};
