import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {getRoute, routeInd} from '../../../router/routes';
import {NavbarItem, Navbarcontainer} from './styles';

const Navbar = () => {
    return (
        <Navbarcontainer>
            <NavbarItem>
                <NavLink to={getRoute(routeInd.COLLECTIONS)}>Collections</NavLink>
            </NavbarItem>
            <NavbarItem>
                <Link to={getRoute(routeInd.NEW_COLLECTION)}>New collection</Link>
            </NavbarItem>
        </Navbarcontainer>
    );
};

export default Navbar;
