import React, {ReactElement} from 'react';
import {ThemeProvider} from 'styled-components';
import Router from './router/Router';
import GlobalStyle from './components/global/global.style';
import theme from './components/global/theme.style';

const App = (): ReactElement => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Router />
        </ThemeProvider>
    );
};

export default App;
