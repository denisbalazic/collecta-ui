import styled from 'styled-components/macro';

export const HeaderContainerStyled = styled.header`
    grid-area: header;
    display: flex;
    justify-content: space-between;
    align-content: center;
    padding: 0 10px;
    background-color: ${(props) => props.theme.color.primary};
    color: #fff;
    font-size: 1.3em;
`;

export const HeaderBoxStyled = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;

export const HeaderLeftBoxStyled = styled.div`
    display: flex;
    align-items: baseline;
    gap: 1rem;
    font-size: 1.625rem;
`;
