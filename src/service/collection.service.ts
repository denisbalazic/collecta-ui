import {apiCall, MethodType} from './http.service';
import {ICollection} from '../types/ICollection';
import {IApiResponse} from '../types/IResponse';

export function getCollections(): Promise<IApiResponse | null> {
    return apiCall({
        method: MethodType.GET,
        url: '/collections',
    });
}

export function getCollection(collectionId: string): Promise<IApiResponse | null> {
    return apiCall({
        method: MethodType.GET,
        url: `/collections/${collectionId}`,
    });
}

export function createCollection(collection: ICollection): Promise<IApiResponse | null> {
    return apiCall({
        method: MethodType.POST,
        url: `/collections`,
        body: collection,
    });
}

export function updateCollection(collection: ICollection): Promise<IApiResponse | null> {
    return apiCall({
        method: MethodType.PUT,
        url: `/collections/${collection._id}`,
        body: collection,
    });
}

export function deleteCollection(collectionId: string): Promise<IApiResponse | null> {
    return apiCall({
        method: MethodType.DELETE,
        url: `/collections/${collectionId}`,
    });
}
