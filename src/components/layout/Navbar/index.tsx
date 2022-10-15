import React, {ReactElement} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {Navbarcontainer, NavbarItem} from './styles';
import Button from '../../elements/Button';

const Navbar = (): ReactElement => {
    return (
        <Navbarcontainer>
            <NavbarItem>
                <NavLink to="/collections">Collections</NavLink>
            </NavbarItem>
            <NavbarItem>
                <Link to="/collections/new">
                    <Button>New collection</Button>
                </Link>
            </NavbarItem>
        </Navbarcontainer>
    );
};

export default Navbar;
