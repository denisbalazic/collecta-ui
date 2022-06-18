import styled from 'styled-components';

export const FieldStyled = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px 0;
    color: green;
`;

export const InputLabelStyled = styled.label`
    color: ${(props) => props.theme.color.basic};
    font-size: 0.8em;
`;

export const InputStyled = styled.input`
    padding: 3px 5px;
    border: 1px solid ${(props) => props.theme.color.basic};
    border-radius: 6px;
    color: ${(props) => props.theme.color.basic};
    font-size: 1.4em;
`;

export const FieldMessageStyled = styled.input`
    color: ${(props) => props.theme.color.primary};
    font-size: 0.8em;
    font-style: italic;
`;
