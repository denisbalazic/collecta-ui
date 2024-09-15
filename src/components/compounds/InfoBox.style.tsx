import styled from 'styled-components/macro';

interface InfoBoxStyledProps {
    $containerHeight?: string;
}

export const InfoBoxStyled = styled.div<InfoBoxStyledProps>`
    display: flex;
    flex-direction: column;
    width: 400px;
    margin: 4px 0;

    a {
        color: dodgerblue;

        &:hover {
            color: royalblue;
        }
    }
`;

export const InfoBoxHeaderStyled = styled.div<InfoBoxStyledProps>`
    min-height: 100px;
    padding: 0.5rem 1rem;
    border-radius: 6px 6px 0 0;
    background-color: ${(props) => props.theme.color.primary};
    color: ${(props) => props.theme.color.basicLight};
    font-size: 1.125rem;

    > * {
        margin: 0.25rem 0;
    }

    H1 {
        text-align: center;
    }
`;

export const InfoBoxBodyStyled = styled.div<InfoBoxStyledProps>`
    --padd: 1.5rem;
    height: ${({$containerHeight}) => `calc(${$containerHeight} + 2 * var(--padd))`};
    padding: var(--padd);
    border: 1px solid ${(props) => props.theme.color.primary};
    border-radius: 0 0 6px 6px;
    color: ${(props) => props.theme.color.basic};
    overflow: hidden;
    transition: height 0.3s ease-in-out;
`;
