import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {routes} from './routes';
import Layout from '../components/layout/Layout';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {routes.map(({path, roles = [], component}, index) =>
                    roles.length === 0 ? (
                        <Route key={index} path={path} element={<Layout>{React.createElement(component)}</Layout>} />
                    ) : (
                        <Route path={path} element={React.createElement(component)} />
                    )
                )}
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
