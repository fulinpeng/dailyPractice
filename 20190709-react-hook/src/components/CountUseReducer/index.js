import React, { useState, useReducer } from 'react';

// const initialState = { count: 0 };

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        default:
            throw new Error();
    }
}

export default function CountUseReducer({ initialState }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    // const [state, dispatch] = useReducer(
    //     reducer,
    //     { count: initialState.count } // 需要在上面申请
    // );
    return (
        <>
            CountUseReducer: {state.count}
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
        </>
    );
}