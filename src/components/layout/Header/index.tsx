import React, {ReactElement} from 'react';
import {NavLink} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {userLogoutAction} from '../../../store/saga/auth/auth.sagaActions';
import {HeaderContainer, HeaderItem, HeaderLeftBox, HeaderRightBoxStyled} from './styles';

const Header = (): ReactElement => {
    const dispatch = useDispatch();

    const handleLogout = (): void => {
        dispatch(userLogoutAction());
    };

    return (
        <HeaderContainer>
            <HeaderLeftBox>
                <HeaderItem>
                    <NavLink to="/home">Home</NavLink>
                </HeaderItem>
            </HeaderLeftBox>

            <HeaderItem>
                <NavLink to="/collections">Collections</NavLink>
            </HeaderItem>

            <HeaderRightBoxStyled>
                <HeaderItem>
                    <NavLink to="/register">Register</NavLink>
                </HeaderItem>
                <HeaderItem>
                    <NavLink to="/login">Login</NavLink>
                </HeaderItem>
                <HeaderItem>
                    <button type="button" onClick={handleLogout}>
                        logout
                    </button>
                </HeaderItem>
            </HeaderRightBoxStyled>
        </HeaderContainer>
    );
};

export default Header;
