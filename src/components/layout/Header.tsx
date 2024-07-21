import React, {ReactElement} from 'react';
import {NavLink} from 'react-router-dom';
import {HeaderContainerStyled, HeaderItemStyled, HeaderLeftBoxStyled, HeaderRightBoxStyled} from './Header.style';
import {useLogoutMutation} from '../../store/api/auth.api';
import Button from '../elements/Button';

const Header = (): ReactElement => {
    const [logout] = useLogoutMutation();

    const handleLogout = (): void => {
        logout();
    };

    return (
        <HeaderContainerStyled>
            <HeaderLeftBoxStyled>
                <HeaderItemStyled>
                    <Button to="/">Home</Button>
                </HeaderItemStyled>
            </HeaderLeftBoxStyled>

            <HeaderItemStyled>
                <Button to="/collections">Explore</Button>
            </HeaderItemStyled>

            <HeaderRightBoxStyled>
                <HeaderItemStyled>
                    <Button secondary transparent to="/register">
                        Register
                    </Button>
                </HeaderItemStyled>
                <HeaderItemStyled>
                    <Button secondary transparent to="/login">
                        Login
                    </Button>
                </HeaderItemStyled>
                <HeaderItemStyled>
                    <Button secondary transparent icon="fe:logout" onClick={handleLogout}>
                        Logout
                    </Button>
                </HeaderItemStyled>
            </HeaderRightBoxStyled>
        </HeaderContainerStyled>
    );
};

export default Header;
