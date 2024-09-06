import React, {ReactElement} from 'react';
import {Outlet} from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import {GridContainerStyled, MainContainerStyled} from './MainLayout.style';

const MainLayout = (): ReactElement => {
    return (
        <GridContainerStyled>
            <Header />
            <MainContainerStyled>
                <Outlet />
            </MainContainerStyled>
            <Footer />
        </GridContainerStyled>
    );
};

export default MainLayout;
