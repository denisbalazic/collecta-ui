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
        error: string;
    };
    layout: {
        headerHeight: string;
        footerHeight: string;
        btnHeight: string;
    };
    breakpoint: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
    };
    zIndex: {
        low: number;
        medium: number;
        high: number;
        important: number;
        overlay: number;
    };
}
