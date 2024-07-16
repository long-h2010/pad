import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const RoleOfUser: React.FC<any> = (props) => {
    const title = props.title;
    const role = props.role;
    const users = props.users;
    const classes = props.classes;
    const handleOnDrop = props.handleOnDrop;
    const handleDragOver = props.handleDragOver;
    const handleOnDrag = props.handleOnDrag;

    return (
        <>
            <Typography variant='h6'>{title}</Typography>
            <Box
                className={classes.boxRule}
                onDrop={(e) => handleOnDrop(e, role)}
                onDragOver={handleDragOver}
            >
                {Object.keys(users).length !== 0 ? (
                    (users as any).map((user: any, index: number) => (
                        <Button
                            className={classes.btnUser}
                            draggable
                            onDragStart={(e) => handleOnDrag(e, user)}
                            variant='outlined'
                            key={index}
                        >
                            {user.nickname}
                        </Button>
                    ))
                ) : (
                    <></>
                )}
            </Box>
        </>
    );
}

export default RoleOfUser
