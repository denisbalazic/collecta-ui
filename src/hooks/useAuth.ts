import {useSelector} from 'react-redux';
import {IUser} from '../types/IUser';
import {authSelector} from '../store/auth.reducer';

export const useAuth = (): {loggedIn: boolean; loggedUser?: IUser} => {
    const {loggedIn} = useSelector(authSelector);
    return {loggedIn};
};
