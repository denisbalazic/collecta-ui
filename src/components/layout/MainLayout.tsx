import React, {ReactElement} from 'react';
import {Outlet} from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import Header from './Header';
import {GridContainerStyled, MainContainerStyled} from './MainLayout.style';

const Layout = (): ReactElement => {
    return (
        <GridContainerStyled>
            <Header />
            <Navbar />
            <MainContainerStyled>
                <Outlet />
            </MainContainerStyled>
            <Footer />
        </GridContainerStyled>
    );
};

export default Layout;
