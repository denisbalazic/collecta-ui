// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {setRedirectAction} from '../../store/reducer/common/common.actions';

const NavigateWrapper = ({children}: {children: any}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setRedirectAction(''));
    }, []);

    console.log('Inside navigate wrapper');
    return children;
};

export default NavigateWrapper;
