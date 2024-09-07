import styled from 'styled-components/macro';

export const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    align-content: stretch;
    max-width: 600px;

    > H1 {
        text-align: center;
    }

    > Button {
        margin-top: 12px;
    }
`;
