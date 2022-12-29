import styled from 'styled-components';

export const NavbarContainerStyled = styled.nav`
    grid-area: navbar;
    display: flex;
    flex-direction: column;
    padding: 10px;
    //background-color: ${(props) => props.theme.color.tertiary};
    border-right: 1px solid ${(props) => props.theme.color.basic};
    font-size: 1.3em;
`;

export const NavbarItemStyled = styled.div`
    margin: 10px;
`;
