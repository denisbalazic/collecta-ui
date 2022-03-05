import React from 'react';
import {NavLink} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {getRoute, routeInd} from '../../router/routes';
import {userLogoutAction} from '../../store/saga/auth/auth.sagaActions';

const Navbar = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(userLogoutAction());
    };

    return (
        <div>
            <NavLink to={getRoute(routeInd.HOME)}>Home</NavLink>
            <NavLink to={getRoute(routeInd.REGISTER)}>Register</NavLink>
            <NavLink to={getRoute(routeInd.LOGIN)}>Login</NavLink>
            <NavLink to={getRoute(routeInd.COLLECTIONS)}>Collections</NavLink>
            <button type="button" onClick={handleLogout}>
                logout
            </button>
        </div>
    );
};

export default Navbar;
