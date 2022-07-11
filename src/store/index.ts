import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from '../reducers';
import { createLogger } from 'redux-logger';

const logger = createLogger();

export default function configureStore(initialState: any) {
    const sagaMiddleware = createSagaMiddleware();
    return {
        ...createStore(reducer, initialState, applyMiddleware(logger, sagaMiddleware)),
        runSaga: sagaMiddleware.run
    }
}
