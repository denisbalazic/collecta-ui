import styled from 'styled-components';

export const GridContainerStyled = styled.div`
    display: grid;
    grid-template-rows: 60px 1fr 40px;
    grid-template-columns: 200px 1fr 200px;
    grid-template-areas:
        'header header header'
        'navbar main sidebar'
        'footer footer footer';
    min-height: 100vh;

    //margin: auto;
    //max-width: 1400px;
    //justify-content: stretch;
    //position: relative; /* ? */
`;

export const MainContainerStyled = styled.main`
    padding: 10px;
`;
