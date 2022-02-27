import {deleteApi, get, post, put} from './http.service';
import {ICollection} from '../types/ICollection';

export function getCollections() {
    return get(`/collections`, {}, false);
}

export function getCollection(collectionId: string) {
    return get(`/collections/${collectionId}`, {}, true);
}
export function createCollection(collection: ICollection) {
    return post(`/collections`, collection, {}, true);
}
export function updateCollection(collection: ICollection) {
    return put(`/collections/${collection._id}`, collection, {}, true);
}
export function deleteCollection(collectionId: string) {
    return deleteApi(`/collections/${collectionId}`, {}, true);
}
