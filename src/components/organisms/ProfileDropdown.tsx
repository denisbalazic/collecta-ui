import React, {ReactElement} from 'react';
import IconButton from '../elements/IconButton';
import DropdownMenuItem from '../compounds/DropdownMenuItem';
import DropdownMenu from '../compounds/DropdownMenu';
import {useAuth} from '../../hooks/useAuth';
import {useLogoutMutation} from '../../store/api/auth.api';
import {useFetchUserQuery} from '../../store/api/user.api';
import {Divider} from '../elements/Divider';

const ProfileDropdown = (): ReactElement | null => {
    const {loggedIn} = useAuth();
    const {data: user} = useFetchUserQuery();
    const [logout] = useLogoutMutation();

    const handleLogout = (): void => {
        logout();
    };

    if (!loggedIn) return null;

    return (
        <DropdownMenu button={<IconButton secondary icon="ph:user" data-test="profile-button" />}>
            <p>{user?.email}</p>
            <Divider />
            <DropdownMenuItem icon="ph:user" to="/user">
                Profile
            </DropdownMenuItem>
            <DropdownMenuItem icon="fe:login" onClick={handleLogout} testId="logout-button">
                Logout
            </DropdownMenuItem>
        </DropdownMenu>
    );
};

export default ProfileDropdown;
