import styled from 'styled-components';

const Button = styled.button`
    margin: 15px 0;
    padding: 3px 6px;
    border: 1px solid ${(props) => props.theme.color.basic};
    border-radius: 6px;
    background-color: ${(props) => props.theme.color.primary};
    color: ${(props) => props.theme.color.basicLight};
    font-size: 1.4rem;

    &:hover {
        background-color: ${(props) => props.theme.color.secondary};
        color: ${(props) => props.theme.color.basic};
    }
`;

export default Button;
