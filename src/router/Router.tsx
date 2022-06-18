import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {routes} from './routes';
import Layout from '../components/layout/Layout';
import {commonSelector} from '../store/reducer/common/common.selector';
import NavigateWrapper from '../components/functional/NavigateWrapper';

const Router = () => {
    const {redirectTo} = useSelector(commonSelector);

    return (
        <BrowserRouter>
            <Routes>
                {routes.map(({path, roles = [], component}, index) =>
                    roles.length === 0 ? (
                        <Route
                            key={index}
                            path={path}
                            element={
                                <Layout>
                                    {redirectTo && redirectTo !== '' && (
                                        <NavigateWrapper>
                                            <Navigate to={redirectTo} />
                                        </NavigateWrapper>
                                    )}
                                    {React.createElement(component)}
                                </Layout>
                            }
                        />
                    ) : (
                        <Route path={path} element={React.createElement(component)} />
                    )
                )}
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
