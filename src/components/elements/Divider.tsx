import styled from 'styled-components/macro';

export const Divider = styled.div`
    height: 1px;
    width: 100%;
    margin: 0.5rem 0;
    background-color: ${({theme}) => theme.color.primary};
`;
