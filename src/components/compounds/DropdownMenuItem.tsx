import React, {PropsWithChildren, ReactElement} from 'react';
import {Icon} from '@iconify/react';
import {useNavigate} from 'react-router-dom';
import {DropdownMenuItemStyled} from './DropdownMenuItem.style';

interface DropdownMenuProps {
    icon?: string;
    onClick?: () => void;
    to?: string;
    testId?: string;
}

const DropdownMenu = ({icon, onClick, to, testId, children}: PropsWithChildren<DropdownMenuProps>): ReactElement => {
    const navigate = useNavigate();

    const handleClick = (): void => {
        to && navigate(to);
        onClick && onClick();
    };

    return (
        <DropdownMenuItemStyled onClick={handleClick} data-test={testId}>
            {icon && <Icon icon={icon} />}
            {children}
        </DropdownMenuItemStyled>
    );
};

export default DropdownMenu;
