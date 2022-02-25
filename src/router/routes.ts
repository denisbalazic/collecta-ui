import Home from '../views/Home';
import Register from '../views/auth/Register';
import Login from '../views/auth/Login';
import Collections from '../views/collection/Collections';

export enum routeInd {
    HOME = 'HOME',
    REGISTER = 'REGISTER',
    LOGIN = 'LOGIN',
    COLLECTIONS = 'COLLECTIONS',
    COLLECTION = 'COLLECTION',
}

export const routes = [
    {
        index: routeInd.HOME,
        title: 'Home',
        path: '/',
        roles: [],
        component: Home,
    },
    {
        index: routeInd.REGISTER,
        title: 'Register',
        path: '/register',
        roles: [],
        component: Register,
    },
    {
        index: routeInd.LOGIN,
        title: 'Login',
        path: '/login',
        roles: [],
        component: Login,
    },
    {
        index: routeInd.COLLECTIONS,
        title: 'Collections',
        path: '/collections',
        roles: [],
        component: Collections,
    },
    {
        index: routeInd.COLLECTION,
        title: 'Collections',
        path: '/collections/:collectionId/item/:itemId',
        roles: [],
        component: Collections,
    },
];

export const getRoute = (index: routeInd) => {
    return routes.find((route) => route.index === index)?.path || '';
};

export const getDynamicRoute = (index: routeInd, pathVariables: string[]) => {
    const route = pathVariables.reduce((acc, curr) => {
        return acc.replace(/:\w+(?=\/|$)/, curr);
    }, routes.find((route) => route.index === index)?.path || '');
    return route;
};
