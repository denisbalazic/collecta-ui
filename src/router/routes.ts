import Home from '../views/Home';
import Register from '../views/auth/Register';
import Login from '../views/auth/Login';
import Collections from '../views/collection/Collections';

export const routes = [
    {
        title: 'Home',
        path: '/',
        roles: [],
        component: Home,
    },
    {
        title: 'Register',
        path: '/register',
        roles: [],
        component: Register,
    },
    {
        title: 'Login',
        path: '/login',
        roles: [],
        component: Login,
    },
    {
        title: 'Collections',
        path: '/collections',
        roles: [],
        component: Collections,
    },
];
