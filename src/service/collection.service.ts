import {apiCall, MethodType} from './http.service';
import {ICollection} from '../types/ICollection';

export function getCollections() {
    return apiCall({
        method: MethodType.GET,
        url: '/collections',
    });
}

export function getCollection(collectionId: string) {
    return apiCall({
        method: MethodType.GET,
        url: `/collections/${collectionId}`,
    });
}

export function createCollection(collection: ICollection) {
    return apiCall({
        method: MethodType.POST,
        url: `/collections`,
        body: collection,
    });
}

export function updateCollection(collection: ICollection) {
    return apiCall({
        method: MethodType.PUT,
        url: `/collections/${collection._id}`,
        body: collection,
    });
}

export function deleteCollection(collectionId: string) {
    return apiCall({
        method: MethodType.DELETE,
        url: `/collections/${collectionId}`,
    });
}
