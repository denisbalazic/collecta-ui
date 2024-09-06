import React, {ReactElement} from 'react';
import Button from '../elements/Button';
import {NavbarContainerStyled, NavbarItemStyled} from './Navbar.style';

const Navbar = (): ReactElement => {
    return (
        <NavbarContainerStyled>
            <NavbarItemStyled>Sort by:</NavbarItemStyled>
            <NavbarItemStyled>Filter:</NavbarItemStyled>
            <NavbarItemStyled>
                <Button to="/collections/new">New collection</Button>
            </NavbarItemStyled>
        </NavbarContainerStyled>
    );
};

export default Navbar;
