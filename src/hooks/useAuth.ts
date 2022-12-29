import {useSelector} from 'react-redux';
import {authSelector} from '../store/reducer/auth/auth.selector';
import {IUser} from '../types/IUser';

export const useAuth = (): {loggedIn: boolean; loggedUser?: IUser} => {
    const {loggedIn, loggedUser} = useSelector(authSelector);
    return {loggedIn, loggedUser};
};
