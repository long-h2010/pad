import React from 'react';
import { Button, Menu } from '@mui/material';

const Dashboard: React.FC<any> = (props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { iconButton, element } = props;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                id='basic-button'
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {iconButton}
            </Button>
            <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={open}
                disableScrollLock={true}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {element}
            </Menu>
        </>
    );
}

export default Dashboard
