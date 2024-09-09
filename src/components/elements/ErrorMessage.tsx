import styled from 'styled-components/macro';

export const ErrorMessage = styled.div`
    height: 0.5rem;
    margin-top: 0.25rem;
    color: ${({theme}) => theme.color.error};
    font-size: 0.8rem;
`;
