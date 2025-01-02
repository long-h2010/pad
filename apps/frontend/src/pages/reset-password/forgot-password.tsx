import { useState } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../../context';
import SendOTP from './send-otp';
import VerifyOTP from './verify-otp';
import ResetPassword from './reset-password';
import { useNavigate } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import BackTo from '../../components/link/back-to';
import LoginStyles from '../../assets/styles/login';

function ForgotPassword() {
    const { auth_url, error, setError, setAlertInfor, setShowAlert } = useGlobalContext();
    const { classes } = LoginStyles();
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
                    setAlertInfor(['success', 'Reset password successful']);
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
            <BackTo {...{ page: 'Login page', href: '/login' }} />
            <Container className={classes.imageBackground}>
                <Box className={classes.paper}>
                    <Box>
                        {sendOtpStatus && (<SendOTP {...{ setUsername, error, handleSendOtp }} />)}
                        {verifyOtpStatus && <VerifyOTP {...{ error, handleVerifyOtp }} />}
                        {resetPasswordStatus && <ResetPassword {...{ error, setPassword, setConfirmPassword, handleResetPassword }} />}
                    </Box>
                </Box>
            </Container>
        </Container>
    );
}

export default ForgotPassword
