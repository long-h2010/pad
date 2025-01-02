import React from 'react';
import { Button, Typography } from '@mui/material';
import { Key, Lock } from '@mui/icons-material';
import FieldInput from '../../components/inputs/field-input';
import LoginStyles from '../../assets/styles/login';

const ResetPassword: React.FC<any> = (props) => {
    const { classes } = LoginStyles();
    const { error, setPassword, setConfirmPassword, handleResetPassword } = props;

    return (
        <>
            <Key className={classes.icon} />
            <Typography className={classes.title} variant='h5'>
                Create New Password
            </Typography>
            <Typography
                className={classes.subtitleReset}
                variant='subtitle1'
                gutterBottom
            >
                Enter a new pasword below to change your password
            </Typography>
            <FieldInput
                {...{
                    classNameTitle: classes.subtitle,
                    classNameInput: classes.input,
                    title: 'New password',
                    type: 'password',
                    icon: <Lock className={classes.iconInput} />,
                    placeholder: 'Enter your new password',
                    setValue: setPassword,
                }}
            />
            <FieldInput
                {...{
                    classNameTitle: classes.subtitle,
                    classNameInput: classes.input,
                    title: 'Confirm Password',
                    type: 'password',
                    icon: <Lock className={classes.iconInput} />,
                    placeholder: 'Confirm new password',
                    setValue: setConfirmPassword,
                }}
            />
            <p className='error'>{error}</p>
            <Button className={classes.btn} variant='contained' onClick={handleResetPassword}>
                Reset password
            </Button>
        </>
    );
}

export default ResetPassword
