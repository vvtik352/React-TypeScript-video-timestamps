import delay from 'redux-saga';
import { take, put, all, fork, TakeEffect, call } from 'redux-saga/effects'
import fetchTimeStamps from '../api';

function* getTimeStamps() {
    try {
        const response: TakeEffect = yield call(fetchTimeStamps)
        yield put({ type: 'GET_TIMESTAMPS', value: response });
    } catch (error: any) {
        yield put({type:'GET_TIMESTAMPS_ERROR', error});
    }
}


export default function* rootSaga() {
    yield all([
        fork(getTimeStamps)
    ])
}
