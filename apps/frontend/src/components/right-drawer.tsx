import React from 'react';
import { Button, Drawer } from '@mui/material';
import { MessageOutlined } from '@mui/icons-material';
import { useGlobalContext } from '../context';

const RightDrawer: React.FC<any> = (props) => {
    const { open, toggleDrawer } = useGlobalContext();

    return (
        <>
            <Button onClick={() => toggleDrawer(!open)}>
                <MessageOutlined />
            </Button>
            <Drawer open={open} anchor='right' onClose={() => toggleDrawer(!open)}>
                {props.element}
            </Drawer>
        </>
    );
}

export default RightDrawer
