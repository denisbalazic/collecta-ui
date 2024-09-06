import styled from 'styled-components/macro';
import React, {ReactElement} from 'react';
import {useMobile} from '../../hooks/useMobile';

export const LogoStyled = styled.h3`
    font-family: 'TsukimiRounded', 'Arial', sans-serif;
    font-size: 1.75rem;
    font-weight: bold;
`;

const Logo = (): ReactElement => {
    const isMobile = useMobile();

    if (isMobile) return <LogoStyled>C</LogoStyled>;

    return <LogoStyled>Collecta</LogoStyled>;
};

export default Logo;
