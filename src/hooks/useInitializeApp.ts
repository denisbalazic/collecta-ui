import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {getLocalAccessToken} from '../service/auth.service';
import {setLoggedIn} from '../store/auth.reducer';

export const useInitializeApp = (): void => {
    const dispatch = useDispatch();

    useEffect(() => {
        const accessToken = getLocalAccessToken();
        if (accessToken) {
            dispatch(setLoggedIn(true));
        }
    }, [dispatch]);
};
