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
                <Button to="/collections/new">New collection</Button>
            </NavbarItemStyled>
        </NavbarContainerStyled>
    );
};

export default Navbar;
