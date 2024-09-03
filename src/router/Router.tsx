import React, {ReactElement} from 'react';
import {BrowserRouter, Navigate} from 'react-router-dom';
import {PrRoute as Route, PrRoutes as Routes} from 'protected-react-router';
import Layout from '../components/layout/MainLayout';
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
import AboutPage from '../components/views/AboutPage';
import VerifyEmail from '../components/views/auth/VerifyEmail';

const Router = (): ReactElement => {
    const {loggedIn} = useAuth();

    return (
        <BrowserRouter>
            <Routes
                authenticated={loggedIn}
                notAuthenticatedRoute="/login"
                notAuthenticatedAction={() => alert('you are not authenticated')}
            >
                <Route element={<RedirectWrapper />}>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Navigate to="/about" />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/verify-email/:token" element={<VerifyEmail />} />
                        <Route path="/collections" element={<Collections />} />
                        <Route isPrivate path="/collections/new" element={<NewCollectionForm />} />
                        <Route isPrivate path="/collections/:collectionId/update" element={<EditCollectionForm />} />
                        <Route path="/collections/:collectionId" element={<Collection />} />
                        <Route path="/error" element={<ErrorThrowingPage />} />
                        <Route path="/*" element={<NotFound />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
