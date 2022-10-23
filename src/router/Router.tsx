import React, {ReactElement} from 'react';
import {BrowserRouter} from 'react-router-dom';
// import {useSelector} from 'react-redux';
import Layout from '../components/layout/Layout';
// import {commonSelector} from '../store/reducer/common/common.selector';
import Home from '../views/Home';
import Register from '../views/auth/Register';
import Login from '../views/auth/Login';
import Collections from '../views/collection/Collections';
import NewCollectionForm from '../views/collection/NewCollectionForm';
import EditCollectionForm from '../views/collection/EditCollectionForm';
import Collection from '../views/collection/Collection';
import ErrorThrowingPage from '../views/ErrorThrowingPage';
import NotFound from '../views/NotFound';
import RedirectWrapper from '../components/functional/RedirectWrapper';
// eslint-disable-next-line import/no-relative-packages
import {EnhancedRoute, EnhancedRoutes} from './protected-react-router/src';

const Router = (): ReactElement => {
    // const {redirectTo} = useSelector(commonSelector);

    return (
        <BrowserRouter>
            <EnhancedRoutes isAuthed={false}>
                {/* eslint-disable-next-line react/jsx-no-undef */}
                <EnhancedRoute element={<RedirectWrapper />}>
                    <EnhancedRoute path="/" element={<Layout />}>
                        <EnhancedRoute index element={<Home />} />
                        <EnhancedRoute path="/register" element={<Register />} />
                        <EnhancedRoute path="/login" element={<Login />} />
                        <EnhancedRoute path="/collections" element={<Collections />} />
                        <EnhancedRoute path="/collections/new" element={<NewCollectionForm />} />
                        <EnhancedRoute path="/collections/:collectionId/update" element={<EditCollectionForm />} />
                        <EnhancedRoute path="/collections/:collectionId" element={<Collection />} />
                        <EnhancedRoute path="/error" element={<ErrorThrowingPage />} />
                        <EnhancedRoute path="/*" element={<NotFound />} />
                    </EnhancedRoute>
                </EnhancedRoute>
            </EnhancedRoutes>
        </BrowserRouter>
    );
};

export default Router;
