import React, {ReactElement} from 'react';
import {ThemeProvider} from 'styled-components';
import {I18nextProvider} from 'react-i18next';
import i18n from './utils/i18n';
import Router from './router/Router';
import GlobalStyle from './styles/global.style';
import theme from './styles/theme.style';
import {useInitializeApp} from './hooks/useInitializeApp';

const App = (): ReactElement => {
    useInitializeApp();

    return (
        <I18nextProvider i18n={i18n}>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Router />
            </ThemeProvider>
        </I18nextProvider>
    );
};

export default App;
