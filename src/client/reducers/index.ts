'use strict';

import { combineReducers } from 'redux';
import { IAppState } from '../state';
import { Action, IIncrementCounterAction } from '../actions';

const initialState = {value: 0};

function counterReducer(state = initialState, action: Action) {
    switch (action.type) {
        case 'INCREMENT_COUNTER':
            return {value: state.value + (action as IIncrementCounterAction).amount};
        case 'RESET_COUNTER':
            return {value: 0};
        default:
            return state;
    }
}

// Global reducer definition - maps reducers to pieces of state
export default combineReducers<IAppState>({
    counter: counterReducer
});
