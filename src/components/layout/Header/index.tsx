import React, {ReactElement} from 'react';
import {NavLink} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {userLogoutAction} from '../../../store/saga/auth/auth.sagaActions';
import {HeaderContainerStyled, HeaderItemStyled, HeaderLeftBoxStyled, HeaderRightBoxStyled} from './styles';

const Header = (): ReactElement => {
    const dispatch = useDispatch();

    const handleLogout = (): void => {
        dispatch(userLogoutAction());
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
