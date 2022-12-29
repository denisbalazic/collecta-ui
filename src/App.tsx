import React, {ReactElement} from 'react';
import {ThemeProvider} from 'styled-components';
import Router from './router/Router';
import GlobalStyle from './styles/global.style';
import theme from './styles/theme.style';

const App = (): ReactElement => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Router />
        </ThemeProvider>
    );
};

export default App;
