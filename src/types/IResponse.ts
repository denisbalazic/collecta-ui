import {ICollection} from './ICollection';
import {IAuthCredentials, IRegisterUser, IUser} from './IUser';

export interface IPageableResponse<T> {
    data: T[];
    pagination: IPagination;
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

export type WithoutId<T extends {_id: string}> = Omit<T, '_id'>;

export type IBodyTypes = ICollection | IUser | IRegisterUser | IAuthCredentials;

export interface IApiResponse {
    data: IBodyTypes | IPageableResponse<IBodyTypes>;
    status: number;
}
