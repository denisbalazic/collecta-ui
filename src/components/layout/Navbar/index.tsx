import React, {ReactElement} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {NavbarContainerStyled, NavbarItemStyled} from './styles';
import Button from '../../elements/Button';

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
