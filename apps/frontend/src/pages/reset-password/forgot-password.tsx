import { useState } from 'react';
import useStyles from '../login/styles';
import axios from 'axios';
import { useGlobalContext } from '../../context';
import SendOTP from './send-otp';
import VerifyOTP from './verify-otp';
import ResetPassword from './reset-password';
import { useNavigate } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import LinkBack from '../../components/link-back';
import AlertMessage from '../../components/alert';

function ForgotPassword() {
    const { auth_url, error, setError, setAlertMessage, setShowAlert } = useGlobalContext();
    const { classes } = useStyles();
    const navigateTo = useNavigate();
    const [sendOtpStatus, setSendOtpStatus] = useState(true);
    const [verifyOtpStatus, setVerifyOtpStatus] = useState(false);
    const [resetPasswordStatus, setResetPasswordStatus] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSendOtp = () => {
        axios
            .post(`${auth_url}/forgot-password`, { username: username })
            .then(() => {
                setSendOtpStatus(false);
                setError('');
                setVerifyOtpStatus(true);
            })
            .catch((err) => setError(err.response.data.message))
    };

    const handleVerifyOtp = (pin: string) => {
        axios
            .post(`${auth_url}/verify-otp`, { username: username, otp: pin })
            .then(() => {
                setVerifyOtpStatus(false);
                setError('');
                setResetPasswordStatus(true);
            })
            .catch((err) => setError(err.response.data.message))
    };

    const handleResetPassword = () => {
        if (password === confirmPassword) {
            axios
                .post(`${auth_url}/reset-password`, { username: username, password: password })
                .then(() => {
                    setAlertMessage('Reset password successful');
                    setShowAlert(true);
                    setError('');
                    setTimeout(() => {
                        navigateTo('/login');
                    }, 3000);
                })
                .catch((err) => setError(err.response.data.message))
        }
    };

    return (
        <Container>
            <LinkBack classes={classes} title={'loginpage'} href={'/login'} />
            <Container className={classes.imageBackground}>
                <Box className={classes.paper}>
                    <Box>
                        {sendOtpStatus && (<SendOTP {...{ classes: classes, setUsername: setUsername, error: error, handleSendOtp: handleSendOtp }} />)}
                        {verifyOtpStatus && <VerifyOTP {...{ classes: classes, error: error, handleVerifyOtp: handleVerifyOtp }} />}
                        {resetPasswordStatus && <ResetPassword {...{ classes: classes, error: error, setPassword: setPassword, setConfirmPassword: setConfirmPassword, handleResetPassword: handleResetPassword }} />}
                    </Box>
                </Box>
            </Container>
            <AlertMessage />
        </Container>
    );
}

export default ForgotPassword
