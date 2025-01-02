import React from 'react';
import { Button, Drawer } from '@mui/material';
import { MessageOutlined } from '@mui/icons-material';
import { useGlobalContext } from '../../context';

const RightDrawer: React.FC<any> = (props) => {
    const { openDrawer, setOpenDrawer } = useGlobalContext();

    return (
        <>
            <Button onClick={() => setOpenDrawer(!openDrawer)}>
                <MessageOutlined sx={{ color: "rgb(34, 47, 62)" }}/>
            </Button>
            <Drawer open={openDrawer} anchor='right' onClose={() => setOpenDrawer(!open)}>
                {props.element}
            </Drawer>
        </>
    );
}

export default RightDrawer
