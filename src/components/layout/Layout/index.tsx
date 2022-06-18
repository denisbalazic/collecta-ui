import React from 'react';
import Header from '../Header';
import {GridContainer, MainContainer} from './styles';
import Footer from '../Footer';
import Navbar from '../Navbar';

const Layout = ({children}: {children: any}) => {
    return (
        <GridContainer>
            <Header />
            <Navbar />
            <MainContainer>{children}</MainContainer>
            <Footer />
        </GridContainer>
    );
};

export default Layout;
