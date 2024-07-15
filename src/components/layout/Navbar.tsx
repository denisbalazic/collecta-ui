import React, {ReactElement} from 'react';
import {Link, NavLink} from 'react-router-dom';
import Button from '../elements/Button';
import {NavbarContainerStyled, NavbarItemStyled} from './Navbar.style';

const Navbar = (): ReactElement => {
    return (
        <NavbarContainerStyled>
            <NavbarItemStyled>
                <NavLink to="/collections">Collections</NavLink>
            </NavbarItemStyled>
            <NavbarItemStyled>
                <Link to="/collections/new">
                    <Button>New collection</Button>
                </Link>
            </NavbarItemStyled>
        </NavbarContainerStyled>
    );
};

export default Navbar;
