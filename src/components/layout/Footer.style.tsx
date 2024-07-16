import styled from 'styled-components/macro';

export const FooterContainerStyled = styled.footer`
    grid-area: footer;
    display: flex;
    justify-content: space-around;
    align-content: center;
    padding: 10px;
    background-color: ${(props) => props.theme.color.primary};
    font-size: 0.9em;
`;
