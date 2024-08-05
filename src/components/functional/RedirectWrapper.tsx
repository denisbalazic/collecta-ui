// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Outlet, useNavigate} from 'react-router-dom';
import {setRedirectAction, commonSelector} from '../../store/common.reducer';

const RedirectWrapper = (): ReactElement => {
    const {redirectTo} = useSelector(commonSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (redirectTo && redirectTo !== '') {
            navigate(redirectTo);
        }
        dispatch(setRedirectAction(''));
    }, [dispatch, navigate, redirectTo]);

    return <Outlet />;
};

export default RedirectWrapper;
