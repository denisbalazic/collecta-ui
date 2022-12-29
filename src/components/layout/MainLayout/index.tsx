import React, {ReactElement} from 'react';
import {Outlet} from 'react-router-dom';
import Header from '../Header';
import {GridContainerStyled, MainContainerStyled} from './styles';
import Footer from '../Footer';
import Navbar from '../Navbar';

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
