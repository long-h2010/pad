import React from 'react';
import { Button, Typography } from '@mui/material';
import { AccountCircle, LockOutlined } from '@mui/icons-material';
import { Input } from '@mui/joy';
import ErrorMessage from '../../components/notification-message/error-message';
import LoginStyles from '../../assets/styles/login';

const SendOTP: React.FC<any> = (props) => {
    const { classes } = LoginStyles();
    const { setUsername, error, handleSendOtp } = props;

    return (
        <>
            <LockOutlined className={classes.icon} />
            <Typography className={classes.title} variant='h5'>
                Reset Password
            </Typography>
            <Typography
                className={classes.subtitleReset}
                variant='subtitle1'
                gutterBottom
            >
                Enter your username and we'll send you otp to reset your
                password
            </Typography>
            <Input
                startDecorator={<AccountCircle />}
                size='md'
                className={classes.input}
                placeholder='Enter your username…'
                variant='outlined'
                color='neutral'
                onChange={e => setUsername(e.target.value)}
            />
            {error !== '' ? <ErrorMessage {...{ message: error }} /> : <></>}
            <Button
                type='button'
                className={classes.btn}
                variant='contained'
                onClick={handleSendOtp}
            >
                Send OTP
            </Button>
        </>
    );
}

export default SendOTP
