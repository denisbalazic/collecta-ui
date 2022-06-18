import React, {ReactElement} from 'react';
import {NavLink} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {getRoute, routeInd} from '../../../router/routes';
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
                    <NavLink to={getRoute(routeInd.HOME)}>Home</NavLink>
                </HeaderItem>
            </HeaderLeftBox>

            <HeaderItem>
                <NavLink to={getRoute(routeInd.COLLECTIONS)}>Collections</NavLink>
            </HeaderItem>

            <HeaderRightBoxStyled>
                <HeaderItem>
                    <NavLink to={getRoute(routeInd.REGISTER)}>Register</NavLink>
                </HeaderItem>
                <HeaderItem>
                    <NavLink to={getRoute(routeInd.LOGIN)}>Login</NavLink>
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
