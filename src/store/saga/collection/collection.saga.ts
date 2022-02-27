import * as Effects from 'redux-saga/effects';
import {put, takeLatest} from 'redux-saga/effects';
import {
    CREATE_COLLECTION,
    DELETE_COLLECTION,
    FETCH_COLLECTION,
    FETCH_COLLECTIONS,
    ICreateCollectionAction,
    IDeleteCollectionAction,
    IFetchCollectionAction,
    IUpdateCollectionAction,
    UPDATE_COLLECTION,
} from './collection.sagaActionTypes';
import {
    createCollection,
    deleteCollection,
    getCollection,
    getCollections,
    updateCollection,
} from '../../../service/collection.service';
import {
    createCollectionSuccessAction,
    deleteCollectionSuccessAction,
    fetchCollectionsSuccessAction,
    fetchCollectionSuccessAction,
    updateCollectionSuccessAction,
} from '../../reducer/collection/collection.actions';

const {call} = Effects;

function* fetchCollectionsSaga(): Generator<void> | void {
    const response = yield call(getCollections);
    if (response.status === 200) {
        yield put(fetchCollectionsSuccessAction(response.data));
    }
}

function* fetchCollectionSaga(action: IFetchCollectionAction): Generator<void> | void {
    const response = yield call(getCollection, action.payload);
    if (response.status === 200) {
        yield put(fetchCollectionSuccessAction(response.data));
    }
}

function* createCollectionSaga(action: ICreateCollectionAction): Generator<void> | void {
    const response = yield call(createCollection, action.payload);
    if (response.status === 200) {
        yield put(createCollectionSuccessAction(response.data));
    }
}

function* updateCollectionSaga(action: IUpdateCollectionAction): Generator<void> | void {
    const response = yield call(updateCollection, action.payload);
    if (response.status === 200) {
        yield put(updateCollectionSuccessAction(response.data));
    }
}

function* deleteCollectionSaga(action: IDeleteCollectionAction): Generator<void> | void {
    const response = yield call(deleteCollection, action.payload);
    if (response.status === 200) {
        yield put(deleteCollectionSuccessAction(response.data));
    }
}

export function* collectionSaga(): Generator<Effects.ForkEffect<never>, void> {
    yield takeLatest(FETCH_COLLECTIONS, fetchCollectionsSaga);
    yield takeLatest(FETCH_COLLECTION, fetchCollectionSaga);
    yield takeLatest(CREATE_COLLECTION, createCollectionSaga);
    yield takeLatest(UPDATE_COLLECTION, updateCollectionSaga);
    yield takeLatest(DELETE_COLLECTION, deleteCollectionSaga);
}
