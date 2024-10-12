import React, {PropsWithChildren, ReactElement} from 'react';
import {DropdownMenuContainerStyled, DropdownMenuStyled} from './DropdownMenu.style';

interface DropdownMenuProps {
    button: ReactElement;
}

const DropdownMenu = ({button, children}: PropsWithChildren<DropdownMenuProps>): ReactElement => {
    const [dropdownOpen, setDropdownOpen] = React.useState(false);

    return (
        <DropdownMenuContainerStyled>
            <button type="button" onClick={() => setDropdownOpen(!dropdownOpen)}>
                {button}
            </button>
            {dropdownOpen && <DropdownMenuStyled>{children}</DropdownMenuStyled>}
        </DropdownMenuContainerStyled>
    );
};

export default DropdownMenu;
