export interface IPageableResponse<T> {
    data: T[];
    pagination: IPagination;
    status: ResponseStatus;
}

export interface IPagination {
    page: number;
    size: number;
    numberOfElements: number;
}

export interface IPageableQuery {
    page?: string;
    size?: string;
    sort?: string;
    sortBy?: string;
    filter?: string;
    filterBy?: string;
}

export interface IValidationError {
    field: string;
    message: string;
}

export enum ResponseStatus {
    IDLE,
    LOADING,
    SUCCESS,
    FAILURE,
}
