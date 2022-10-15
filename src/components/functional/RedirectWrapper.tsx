// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Outlet, useNavigate} from 'react-router-dom';
import {commonSelector} from '../../store/reducer/common/common.selector';
import {setRedirectAction} from '../../store/reducer/common/common.actions';

const RedirectWrapper = (): ReactElement => {
    const {redirectTo} = useSelector(commonSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (redirectTo && redirectTo !== '') {
            navigate(redirectTo);
        }
        dispatch(setRedirectAction(''));
    }, [navigate, redirectTo]);

    return <Outlet />;
};

export default RedirectWrapper;
