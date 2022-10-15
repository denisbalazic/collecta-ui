import React, {ReactElement} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
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

const Router = (): ReactElement => {
    // const {redirectTo} = useSelector(commonSelector);

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<RedirectWrapper />}>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/collections" element={<Collections />} />
                        <Route path="/collections/new" element={<NewCollectionForm />} />
                        <Route path="/collections/:collectionId/update" element={<EditCollectionForm />} />
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
