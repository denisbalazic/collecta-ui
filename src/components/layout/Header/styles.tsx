import styled from 'styled-components';

export const HeaderContainerStyled = styled.header`
    grid-area: header;
    display: flex;
    justify-content: center;
    align-content: center;
    padding: 10px;
    background-color: ${(props) => props.theme.color.primary};
    font-size: 1.3em;
`;

export const HeaderLeftBoxStyled = styled.div`
    margin-right: auto;
    display: flex;
`;

export const HeaderRightBoxStyled = styled.div`
    margin-left: auto;
    display: flex;
`;

export const HeaderItemStyled = styled.div`
    margin: 10px;
`;
