import React from 'react';
import {NavLink} from 'react-router-dom';
import {getRoute, routeInd} from '../../router/routes';

const Navbar = () => {
    return (
        <div>
            <NavLink to={getRoute(routeInd.HOME)}>Home</NavLink>
            <NavLink to={getRoute(routeInd.REGISTER)}>Register</NavLink>
            <NavLink to={getRoute(routeInd.LOGIN)}>Login</NavLink>
            <NavLink to={getRoute(routeInd.COLLECTIONS)}>Collections</NavLink>
        </div>
    );
};

export default Navbar;
