import Home from '../views/Home';
import Register from '../views/auth/Register';
import Login from '../views/auth/Login';
import Collections from '../views/collection/Collections';
import NewCollectionForm from '../views/collection/NewCollectionForm';
import Collection from '../views/collection/Collection';
import EditCollectionForm from '../views/collection/EditCollectionForm';
import NotFound from '../views/NotFound';

export enum routeInd {
    HOME = 'HOME',
    REGISTER = 'REGISTER',
    LOGIN = 'LOGIN',
    COLLECTIONS = 'COLLECTIONS',
    NEW_COLLECTION = 'NEW_COLLECTION',
    UPDATE_COLLECTION = 'UPDATE_COLLECTION',
    COLLECTION = 'COLLECTION',
    NOT_FOUND = 'NOT_FOUND',
}

export const routes = [
    {
        index: routeInd.HOME,
        path: '/',
        roles: [],
        component: Home,
    },
    {
        index: routeInd.REGISTER,
        path: '/register',
        roles: [],
        component: Register,
    },
    {
        index: routeInd.LOGIN,
        path: '/login',
        roles: [],
        component: Login,
    },
    {
        index: routeInd.COLLECTIONS,
        path: '/collections',
        roles: [],
        component: Collections,
    },
    {
        index: routeInd.NEW_COLLECTION,
        path: '/collections/new',
        roles: [],
        component: NewCollectionForm,
    },
    {
        index: routeInd.UPDATE_COLLECTION,
        path: '/collections/:collectionId/update',
        roles: [],
        component: EditCollectionForm,
    },
    {
        index: routeInd.COLLECTION,
        path: '/collections/:collectionId',
        roles: [],
        component: Collection,
    },
    {
        index: routeInd.NOT_FOUND,
        path: '/*',
        roles: [],
        component: NotFound,
    },
];

export const getRoute = (index: routeInd) => {
    return routes.find((route) => route.index === index)?.path || '/';
};

export const getDynamicRoute = (index: routeInd, pathVariables: string[]) => {
    const route = pathVariables.reduce((acc, curr) => {
        return acc.replace(/:\w+(?=\/|$)/, curr);
    }, routes.find((route) => route.index === index)?.path || '');
    return route;
};
