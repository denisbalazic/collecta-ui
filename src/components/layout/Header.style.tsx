import styled from 'styled-components/macro';

export const HeaderContainerStyled = styled.header`
    grid-area: header;
    display: flex;
    justify-content: space-between;
    align-content: center;
    padding: 10px;
    background-color: ${(props) => props.theme.color.primary};
    color: ${(props) => props.theme.color.basicLight} !important;
    font-size: 1.3em;
`;

export const HeaderLeftBoxStyled = styled.div`
    display: flex;
`;

export const HeaderRightBoxStyled = styled.div`
    display: flex;
`;

export const HeaderItemStyled = styled.div`
    margin: 10px;
    color: white;
    border: 1px solid white;
`;
