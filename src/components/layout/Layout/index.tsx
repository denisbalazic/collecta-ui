import React, {ReactElement} from 'react';
import {Outlet} from 'react-router-dom';
import Header from '../Header';
import {GridContainer, MainContainer} from './styles';
import Footer from '../Footer';
import Navbar from '../Navbar';

const Layout = (): ReactElement => {
    return (
        <GridContainer>
            <Header />
            <Navbar />
            <MainContainer>
                <Outlet />
            </MainContainer>
            <Footer />
        </GridContainer>
    );
};

export default Layout;
