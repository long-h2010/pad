import React from 'react';
import { Typography } from '@mui/material';
import { Input } from '@mui/joy';

const FieldInput: React.FC<any> = (props) => {
    const classNameTitle = props.classNameTitle;
    const classNameInput = props.classNameInput;
    const title = props.title;
    const type = props.type;
    const icon = props.icon;
    const value = props.value;
    const placeholder = props.placeholder;
    const setElement = props.setElement;

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
                onChange={(e) => setElement(e.target.value)}
                value={value}
            />
            
        </>
    )
}

export default FieldInput