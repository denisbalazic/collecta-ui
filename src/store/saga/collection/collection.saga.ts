import {call, ForkEffect, put, takeLatest} from 'redux-saga/effects';
import {
    CREATE_COLLECTION,
    DELETE_COLLECTION,
    FETCH_COLLECTION,
    FETCH_COLLECTIONS,
    ICreateCollectionAction,
    IDeleteCollectionAction,
    IFetchCollectionAction,
    IFetchCollectionsAction,
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
import {apiRequest} from '../helpers/apiRequest';
import {setRedirectAction} from '../../reducer/common/common.actions';

function* fetchCollectionsSaga(action: IFetchCollectionsAction): Generator<void> | void {
    yield call(apiRequest, {
        ...action,
        service: getCollections,
    });
}

function* fetchCollectionSaga(action: IFetchCollectionAction): Generator<void> | void {
    yield call(apiRequest, {
        ...action,
        service: getCollection,
    });
}

function* createCollectionSaga(action: ICreateCollectionAction): Generator<void> | void {
    yield call(apiRequest, {
        ...action,
        service: createCollection,
        *onSuccess() {
            yield put(setRedirectAction('/collections'));
        },
    });
}

function* updateCollectionSaga(action: IUpdateCollectionAction): Generator<void> | void {
    yield call(apiRequest, {
        ...action,
        service: updateCollection,
        *onSuccess() {
            yield put(setRedirectAction(`/collections/${action.payload._id}`));
        },
    });
}

function* deleteCollectionSaga(action: IDeleteCollectionAction): Generator<void> | void {
    yield call(apiRequest, {
        ...action,
        service: deleteCollection,
        *onSuccess() {
            yield put(setRedirectAction('/collections'));
        },
    });
}

export function* collectionSaga(): Generator<ForkEffect<never>, void> {
    yield takeLatest(FETCH_COLLECTIONS, fetchCollectionsSaga);
    yield takeLatest(FETCH_COLLECTION, fetchCollectionSaga);
    yield takeLatest(CREATE_COLLECTION, createCollectionSaga);
    yield takeLatest(UPDATE_COLLECTION, updateCollectionSaga);
    yield takeLatest(DELETE_COLLECTION, deleteCollectionSaga);
}
