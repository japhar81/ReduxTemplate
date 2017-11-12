'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import { ICounter, IState } from '../state';
import { Action, incrementCounter, resetCounter } from '../actions';

interface ICounterProps {
}

interface ICounterOwnProps {
    increment(amount: number): Action;

    reset(): Action;

    counter: ICounter;
}

interface ICounterState {
}

class Counter extends React.Component<ICounterProps & ICounterOwnProps, ICounterState> {

    constructor(props: any) {
        super(props);
        this.increment = this.increment.bind(this);
    }

    private increment(e: any) {
        e.preventDefault();
        this.props.increment(1);
    }

    private reset(e: any) {
        e.preventDefault();
        this.props.reset();
    }

    public render() {
        const {counter} = this.props;

        return (
            <div>
                <div className='hero'>
                    <strong>{counter.value}</strong>
                </div>
                <form>
                    <button ref='increment' onClick={this.increment}>increment!</button>
                    <button ref='reset' onClick={this.reset}>Reset</button>
                </form>
            </div>
        );

    }
}

function mapStateToProps(state: IState) {
    return {
        counter: state.counter
    };
}

export default connect(mapStateToProps, {
    increment: incrementCounter,
    reset: resetCounter
})(Counter);
