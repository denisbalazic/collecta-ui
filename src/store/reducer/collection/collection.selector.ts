import {AppState} from '../reducer';
import {ICollectionReducerState} from './collection.reducer';

export const collectionSelector = (state: AppState): ICollectionReducerState => state.collection;
