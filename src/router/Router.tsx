import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {routes} from './routes';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {routes.map(({path, roles = [], component}) =>
                    roles.length === 0 ? (
                        <Route path={path} element={React.createElement(component)} />
                    ) : (
                        <Route path={path} element={React.createElement(component)} />
                    )
                )}
            </Routes>
        </BrowserRouter>
    );
};

export default App;
