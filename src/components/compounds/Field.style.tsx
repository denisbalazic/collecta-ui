import styled from 'styled-components/macro';

interface FieldStyledProps {
    $hasError?: boolean;
}

export const FieldStyled = styled.div`
    display: flex;
    flex-direction: column;
    margin: 4px 0;
    color: green;
    font-size: 1rem;
`;

export const InputLabelStyled = styled.label<FieldStyledProps>`
    color: ${(props) => (props.$hasError ? props.theme.color.error : props.theme.color.basic)};
    font-size: 1em;
`;

export const InputStyled = styled.input<FieldStyledProps>`
    padding: 3px 5px;
    border: 1px solid ${(props) => (props.$hasError ? props.theme.color.error : props.theme.color.basic)};
    border-radius: 6px;
    color: ${(props) => props.theme.color.basic};
    font-size: 1.5em;

    &::placeholder {
        color: #bababa;
    }

    &:focus {
        border-color: limegreen;
    }
`;

export const FieldMessageStyled = styled.div<FieldStyledProps>`
    font-size: 0.8em;
    font-style: italic;
    color: ${(props) => (props.$hasError ? props.theme.color.error : props.theme.color.primary)};

    height: ${(props) => (props.$hasError ? 'auto' : '0')};
    opacity: ${(props) => (props.$hasError ? '1' : '0')};
    overflow: hidden;
    transition: height 0.3s ease, opacity 0.3s ease;
`;
