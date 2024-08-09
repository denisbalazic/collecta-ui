import React, {ReactElement} from 'react';
import {NavLink} from 'react-router-dom';
import {HeaderContainerStyled, HeaderItemStyled, HeaderLeftBoxStyled, HeaderRightBoxStyled} from './Header.style';
import {useLogoutMutation} from '../../store/api/auth.api';

const Header = (): ReactElement => {
    const [logout] = useLogoutMutation();

    const handleLogout = (): void => {
        logout();
    };

    return (
        <HeaderContainerStyled>
            <HeaderLeftBoxStyled>
                <HeaderItemStyled>
                    <NavLink to="/">Home</NavLink>
                </HeaderItemStyled>
            </HeaderLeftBoxStyled>

            <HeaderItemStyled>
                <NavLink to="/collections">Collections</NavLink>
            </HeaderItemStyled>

            <HeaderRightBoxStyled>
                <HeaderItemStyled>
                    <NavLink to="/register">Register</NavLink>
                </HeaderItemStyled>
                <HeaderItemStyled>
                    <NavLink to="/login">Login</NavLink>
                </HeaderItemStyled>
                <HeaderItemStyled>
                    <button type="button" onClick={handleLogout}>
                        logout
                    </button>
                </HeaderItemStyled>
            </HeaderRightBoxStyled>
        </HeaderContainerStyled>
    );
};

export default Header;
