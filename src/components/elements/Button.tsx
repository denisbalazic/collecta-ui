import styled, {css, keyframes} from 'styled-components/macro';
import React, {ReactElement, ReactNode} from 'react';
import {Link} from 'react-router-dom';
import {Icon} from '@iconify/react';

interface BaseButtonProps {
    size?: 'sm' | 'md' | 'lg';
    secondary?: boolean;
    transparent?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    icon?: string;
    onClick?: (e: React.FormEvent) => void;
    children?: ReactNode;
    className?: string;
}

interface PlainButtonProps extends BaseButtonProps {
    type?: 'button' | 'reset' | 'submit';
    spinner?: boolean;
    to?: never;
    href?: never;
    target?: never;
}

interface LinkButtonProps extends BaseButtonProps {
    to: string;
    target?: string;
    href?: never;
    type?: never;
    spinner?: never;
}

interface AnchorButtonProps extends BaseButtonProps {
    href: string;
    target?: string;
    to?: never;
    type?: never;
    spinner?: never;
}

type ButtonProps = PlainButtonProps | LinkButtonProps | AnchorButtonProps;

interface StyledButtonProps {
    $size?: 'sm' | 'md' | 'lg';
    $secondary?: boolean;
    $transparent?: boolean;
    $fullWidth?: boolean;
    $spinner?: boolean;
    disabled?: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: ${({$fullWidth}) => ($fullWidth ? '100%' : 'auto')};
    height: ${({theme}) => theme.layout.btnHeight};
    padding: 0.375rem 1rem;
    border: ${({$transparent, $secondary, theme}) => {
        if ($transparent && $secondary) return `1px solid white`;
        if ($transparent) return `1px solid ${theme.color.primary}`;
        if ($secondary) return `1px solid ${theme.color.primary}`;
        return `1px solid ${theme.color.primary}`;
    }};
    border-radius: 5px;
    font-size: ${({$size}) => {
        if ($size === 'sm') return '0.75rem';
        if ($size === 'lg') return '1.25rem';
        return '1rem';
    }};
    color: ${({$transparent, $secondary, theme}) => {
        if ($transparent && $secondary) return 'white';
        if ($transparent) return theme.color.primary;
        if ($secondary) return theme.color.primary;
        return 'white';
    }};
    background-color: ${({$transparent, $secondary, theme}) => {
        if ($transparent) return 'transparent';
        if ($secondary) return theme.color.secondary;
        return theme.color.primary;
    }};
    opacity: ${({disabled}) => (disabled ? '0.5' : '1')};
    cursor: ${({disabled}) => (disabled ? 'not-allowed' : 'pointer')};

    &:hover {
        opacity: 0.7;
    }

    svg {
        margin-right: 0.5rem;
    }

    /* Spinner styles */
    position: relative;
    ${({$spinner}) =>
        $spinner &&
        css`
            &::after {
                content: '';
                position: absolute;
                width: 1rem;
                height: 1rem;
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-top-color: white;
                border-radius: 50%;
                animation: ${keyframes`
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                `} 0.6s linear infinite;
            }
            color: transparent;
            pointer-events: none;
        `}
`;

const Button = ({
    to,
    href,
    icon,
    type = 'button',
    size = 'md',
    secondary,
    transparent,
    spinner,
    fullWidth,
    target,
    children,
    ...rest
}: ButtonProps): ReactElement => {
    const styledProps: StyledButtonProps = {
        $size: size,
        $secondary: secondary,
        $transparent: transparent,
        $fullWidth: fullWidth,
        $spinner: spinner,
    };

    if (to) {
        return (
            <StyledButton as={Link} to={to} target={target} {...rest} {...styledProps}>
                {icon && <Icon icon={icon} />}
                {children}
            </StyledButton>
        );
    }

    if (href) {
        return (
            <StyledButton as="a" href={href} target={target} {...rest} {...styledProps}>
                {icon && <Icon icon={icon} />}
                {children}
            </StyledButton>
        );
    }

    return (
        <StyledButton type={type} {...rest} {...styledProps}>
            {icon && <Icon icon={icon} />}
            {children}
        </StyledButton>
    );
};

export default Button;
