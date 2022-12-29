import React, {ReactElement} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {PrRoutes as Routes, PrRoute as Route} from 'protected-react-router';
import Layout from '../components/layout/MainLayout';
import Home from '../components/views/Home';
import Register from '../components/views/auth/Register';
import Login from '../components/views/auth/Login';
import Collections from '../components/views/collection/Collections';
import NewCollectionForm from '../components/views/collection/NewCollectionForm';
import EditCollectionForm from '../components/views/collection/EditCollectionForm';
import Collection from '../components/views/collection/Collection';
import ErrorThrowingPage from '../components/views/ErrorThrowingPage';
import NotFound from '../components/views/NotFound';
import RedirectWrapper from '../components/functional/RedirectWrapper';
import {useAuth} from '../hooks/useAuth';

const Router = (): ReactElement => {
    const {loggedIn} = useAuth();

    return (
        <BrowserRouter>
            <Routes
                authenticated={loggedIn}
                notAuthenticatedRoute="/login"
                notAuthenticatedAction={() => alert('you are not authenticated')}
            >
                {/* eslint-disable-next-line react/jsx-no-undef */}
                <Route element={<RedirectWrapper />}>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/collections" element={<Collections />} />
                        <Route isPrivate path="/collections/new" element={<NewCollectionForm />} />
                        <Route isPrivate path="/collections/:collectionId/update" element={<EditCollectionForm />} />
                        <Route isPrivate path="/collections/:collectionId" element={<Collection />} />
                        <Route path="/error" element={<ErrorThrowingPage />} />
                        <Route path="/*" element={<NotFound />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
