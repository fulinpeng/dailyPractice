import {INCREMENT, SUBDUCTION, INCREMENT2} from '_root/const/index'

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

export const  subduction = () => {
    return {
        type: SUBDUCTION,
        payload: {}
    };
};
