import React, {ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {HeaderBoxStyled, HeaderContainerStyled, HeaderLeftBoxStyled} from './Header.style';
import {useLogoutMutation} from '../../store/api/auth.api';
import Button from '../elements/Button';
import IconButton from '../elements/IconButton';
import {useAuth} from '../../hooks/useAuth';
import Input from '../elements/Input';
import Logo from '../compounds/Logo';
import {useCollection} from '../../hooks/useCollection';

const Header = (): ReactElement => {
    const [logout] = useLogoutMutation();
    const {loggedIn} = useAuth();
    const {isCollectionMode, collection} = useCollection();

    const [search, setSearch] = React.useState<string>('');

    const handleLogout = (): void => {
        logout();
    };

    return (
        <HeaderContainerStyled>
            <HeaderBoxStyled>
                <HeaderLeftBoxStyled>
                    <Link to="/collections">
                        <Logo />
                    </Link>

                    {isCollectionMode && collection && <>/ {collection.name}</>}
                </HeaderLeftBoxStyled>
            </HeaderBoxStyled>

            <HeaderBoxStyled>
                <Input
                    type="text"
                    placeholder={isCollectionMode ? 'Search items' : 'Search collections'}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    endAdornment="ph:magnifying-glass"
                />
            </HeaderBoxStyled>

            <HeaderBoxStyled>
                {!loggedIn ? (
                    <>
                        <IconButton secondary icon="ph:question" to="/about" />

                        <Button secondary transparent to="/register">
                            Register
                        </Button>

                        <Button secondary transparent to="/login">
                            Login
                        </Button>
                    </>
                ) : (
                    <>
                        <IconButton secondary icon="ph:plus-fill" to="/collections/new" />

                        <IconButton secondary icon="ph:question" to="/about" />

                        <IconButton secondary icon="fe:logout" onClick={handleLogout} />
                    </>
                )}
            </HeaderBoxStyled>
        </HeaderContainerStyled>
    );
};

export default Header;
