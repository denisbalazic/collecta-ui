import styled from 'styled-components/macro';
import React, {ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {Icon} from '@iconify/react';

interface BaseButtonProps {
    icon: string;
    size?: 'sm' | 'md' | 'lg';
    secondary?: boolean;
    disabled?: boolean;
    onClick?: (e: React.FormEvent) => void;
    className?: string;
}

interface PlainButtonProps extends BaseButtonProps {
    type?: 'button' | 'reset' | 'submit';
    to?: never;
    href?: never;
    target?: never;
}

interface LinkButtonProps extends BaseButtonProps {
    to: string;
    target?: string;
    href?: never;
    type?: never;
}

interface AnchorButtonProps extends BaseButtonProps {
    href: string;
    target?: string;
    to?: never;
    type?: never;
}

type IconButtonProps = PlainButtonProps | LinkButtonProps | AnchorButtonProps;

interface StyledButtonProps {
    $size?: 'sm' | 'md' | 'lg';
    $secondary?: boolean;
    disabled?: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0.375rem;
    border-radius: 0.5rem;
    font-size: ${({$size}) => {
        if ($size === 'sm') return '1.25rem';
        if ($size === 'lg') return '2rem';
        return '1.625rem';
    }};
    color: ${({$secondary, theme}) => {
        if ($secondary) return 'white';
        return theme.color?.primary;
    }};
    cursor: ${({disabled}) => (disabled ? 'not-allowed' : 'pointer')};

    &:hover {
        opacity: 0.7;
    }
`;

const IconButton = ({
    to,
    href,
    icon,
    type = 'button',
    size = 'md',
    secondary,
    target,
    ...rest
}: IconButtonProps): ReactElement => {
    const styledProps: StyledButtonProps = {
        $size: size,
        $secondary: secondary,
    };

    if (to) {
        return (
            <StyledButton as={Link} to={to} target={target} {...rest} {...styledProps}>
                <Icon icon={icon} />
            </StyledButton>
        );
    }

    if (href) {
        return (
            <StyledButton as="a" href={href} target={target} {...rest} {...styledProps}>
                <Icon icon={icon} />
            </StyledButton>
        );
    }

    return (
        <StyledButton type={type} {...rest} {...styledProps}>
            <Icon icon={icon} />
        </StyledButton>
    );
};

export default IconButton;
