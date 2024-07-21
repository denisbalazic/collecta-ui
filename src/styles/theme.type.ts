import {DefaultTheme} from 'styled-components';

export interface BasicTheme extends DefaultTheme {
    color: {
        basic: string;
        basicLight: string;
        primary: string;
        primaryLight: string;
        secondary: string;
        secondaryLight: string;
        tertiary: string;
        background: string;
    };
    layout: {
        headerHeight: string;
        footerHeight: string;
    };
    breakpoint: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
    };
}
