import React, {ReactElement} from 'react';
import {HeaderContainerStyled, HeaderItemStyled, HeaderBoxStyled} from './Header.style';
import {useLogoutMutation} from '../../store/api/auth.api';
import Button from '../elements/Button';
import IconButton from '../elements/IconButton';
import {useAuth} from '../../hooks/useAuth';

const Header = (): ReactElement => {
    const [logout] = useLogoutMutation();

    const {loggedIn} = useAuth();

    const handleLogout = (): void => {
        logout();
    };

    return (
        <HeaderContainerStyled>
            <HeaderBoxStyled>
                <HeaderItemStyled>
                    <Button to="/">Home</Button>
                </HeaderItemStyled>
            </HeaderBoxStyled>

            <HeaderBoxStyled>
                <HeaderItemStyled>
                    <Button to="/collections">Explore</Button>
                </HeaderItemStyled>
            </HeaderBoxStyled>

            <HeaderBoxStyled>
                {!loggedIn ? (
                    <>
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
                    </>
                ) : (
                    <HeaderItemStyled>
                        <IconButton secondary icon="fe:logout" onClick={handleLogout} />
                    </HeaderItemStyled>
                )}
            </HeaderBoxStyled>
        </HeaderContainerStyled>
    );
};

export default Header;
