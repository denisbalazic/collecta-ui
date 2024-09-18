import styled from 'styled-components/macro';

interface CheckboxStyledProps {
    $hasError?: boolean;
}

export const CheckboxStyled = styled.div<CheckboxStyledProps>`
    display: flex;
    margin: 10px 0;
    color: ${(props) => (props.$hasError ? props.theme.color.error : props.theme.color.basic)};
    cursor: pointer;
`;

export const CheckboxLabelStyled = styled.label<CheckboxStyledProps>`
    margin-left: 10px;
    color: ${(props) => props.theme.color.basic};
    font-size: 1rem;
    cursor: pointer;
`;

export const CheckboxInputStyled = styled.input<CheckboxStyledProps>`
    padding: 3px 5px;
    border: 1px solid ${(props) => props.theme.color.basic};
    border-radius: 6px;
    color: ${(props) => props.theme.color.basic};
    font-size: 1.4em;
    cursor: pointer;
`;
