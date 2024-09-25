/*
 * These types should match on the frontend and backend.
 * They are used to handle pagination.
 */

export interface IPageable<T> {
    content: T[];
    pagination: IPagination;
}

export interface IPagination {
    page?: number;
    size?: number;
    numberOfElements?: number;
}

export interface IPageableQuery {
    page?: number;
    size?: number;
    sort?: string;
    sortBy?: string;
    filter?: string;
    filterBy?: string;
}
