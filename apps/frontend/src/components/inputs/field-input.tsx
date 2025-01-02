import React from 'react';
import { Typography } from '@mui/material';
import { Input } from '@mui/joy';

const FieldInput: React.FC<any> = (props) => {
    const { classNameTitle, classNameInput, title, type, icon, value, placeholder, setValue } = props;

    return (
        <>
            <Typography
                className={classNameTitle}
                variant='subtitle1'
                gutterBottom
            >
                {title}
            </Typography>
            <Input
                type={type}
                startDecorator={icon}
                size='md'
                className={classNameInput}
                placeholder={placeholder}
                variant='outlined'
                color='neutral'
                onChange={(e) => setValue(e.target.value)}
                value={value}
            />

        </>
    )
}

export default FieldInput