'use strict';

// Action Type Definitions
export interface IIncrementCounterAction {
    type: 'INCREMENT_COUNTER';
    amount: number;
}

export interface IResetCounterAction {
    type: 'RESET_COUNTER';
}

export type Action = IIncrementCounterAction | IResetCounterAction;

// Action Creator Functions
export function incrementCounter(amount: number): Action {
    return {
        type: 'INCREMENT_COUNTER',
        amount
    };
}

export function resetCounter(): Action {
    return {
        type: 'RESET_COUNTER'
    };
}
