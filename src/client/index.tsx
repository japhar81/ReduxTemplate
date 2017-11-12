'use strict';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as redux from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { reducers } from './reducers';
import Counter from './components/counter';
import { IState } from './state';

const enhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
    redux.applyMiddleware(thunk)
);

const store: redux.Store<IState> = redux.createStore(
    reducers,
    {} as IState,
    enhancer
);

const Root: React.SFC<{}> = () => (
    <Provider store={store}>
        <Counter />
    </Provider>
);

window.addEventListener('DOMContentLoaded', () => {
    const rootEl = document.getElementById('root');
    ReactDOM.render(<Root />, rootEl);
});
