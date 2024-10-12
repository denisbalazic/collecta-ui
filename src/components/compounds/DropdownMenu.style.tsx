import styled from 'styled-components/macro';

export const DropdownMenuContainerStyled = styled.div`
    position: relative;
`;

export const DropdownMenuStyled = styled.div`
    position: absolute;
    top: 100%;
    right: 0;
    z-index: ${({theme}) => theme.zIndex.high};
    display: flex;
    flex-direction: column;
    min-width: 140px;
    padding: 8px;
    font-size: 14px;
    text-align: left;
    list-style: none;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
    color: #333;
`;
