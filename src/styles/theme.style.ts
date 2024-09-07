import {BasicTheme} from './theme.type';

const theme: BasicTheme = {
    color: {
        basic: '#274c77',
        basicLight: '#e7ecef',
        primary: '#006769',
        primaryLight: '#00787A',
        secondary: '#d2ebd8',
        secondaryLight: '#edf5e5',
        tertiary: '#8b8c89',
        background: '#f5f5f5',
        error: '#ff0000',
    },
    layout: {
        headerHeight: '60px',
        footerHeight: '60px',
        btnHeight: '2.5rem',
    },
    breakpoint: {
        xs: '(max-width: 400px)', // for small screen mobile
        sm: '(max-width: 600px)', // for mobile screen
        md: '(max-width: 900px)', // for tablets
        lg: '(max-width: 1280px)', // for laptops
        xl: '(max-width: 1440px)', // for desktop / monitors
        xxl: '(max-width: 1920px)', // for big screens
    },
};

export default theme;
