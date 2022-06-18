import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {getRoute, routeInd} from '../../../router/routes';
import {NavbarItem, Navbarcontainer} from './styles';
import Button from '../../elements/Button';

const Navbar = () => {
    return (
        <Navbarcontainer>
            <NavbarItem>
                <NavLink to={getRoute(routeInd.COLLECTIONS)}>Collections</NavLink>
            </NavbarItem>
            <NavbarItem>
                <Link to={getRoute(routeInd.NEW_COLLECTION)}>
                    <Button>New collection</Button>
                </Link>
            </NavbarItem>
        </Navbarcontainer>
    );
};

export default Navbar;
