import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context';
import { Box, Button, Container, Checkbox, Typography } from '@mui/material';
import { AccountCircle, Lock } from '@mui/icons-material';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import FieldInput from '../../components/inputs/field-input';
import LinkLine from '../../components/link/link-line';
import BackTo from '../../components/link/back-to';
import ErrorMessage from '../../components/notification-message/error-message';
import LoginStyles from '../../assets/styles/login';
import DefaultAvatar from '/images/default-user-avatar.jpg';
import requestApi from '../../hooks/useApi';

function Login() {
    const navigateTo = useNavigate();
    const { auth_url } = useGlobalContext();
    const { classes } = LoginStyles();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmitLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const loginData: any = { username: username, password: password };

        for (let i in loginData) {
            if (loginData[i] === '') {
                setError(`Please enter your ${i}`);
                return;
            }
        }

        requestApi(`${auth_url}/login`, 'post', loginData)
            .then((res) => {
                localStorage.setItem('token', res.data.accessToken);
                localStorage.setItem('refreshToken', res.data.refreshToken);
                localStorage.setItem('name', res.data.name);
                localStorage.setItem('avatar', res.data.avatar || DefaultAvatar);
                navigateTo('/');
            })
            .catch((err) => {
                setError(err.response.data.message);
            })
    };

    const handleGoogleLogin = async (credentialResponse: any) => {
        const token = credentialResponse.credential;
        axios
            .post(`${auth_url}/google/login`, { token: token })
            .then((res) => {
                localStorage.setItem('token', res.data.accessToken);
                localStorage.setItem('refreshToken', res.data.refreshToken);
                localStorage.setItem('name', res.data.name);
                localStorage.setItem('avatar', res.data.avatar || DefaultAvatar);
                navigateTo('/');
            })
            .catch((err) => {
                setError(err.response.data.message);
            })
    };

    const handleGoogleLoginFailed = async () => {
        console.log('Login Failed');
    };

    return (
        <Container sx={{ zIndex: 10 }}>
            <BackTo {...{ page: 'Home page', href: '/' }} />
            <Container className={classes.imageBackground}>
                <Box className={classes.paper}>
                    <Box>
                        <Typography className={classes.title} variant='h4'>
                            Sign in
                        </Typography>
                        <FieldInput {...{ classNameTitle: classes.subtitle, classNameInput: classes.input, title: 'Username', type: 'text', icon: <AccountCircle className={classes.iconInput} />, placeholder: 'Enter your username', setValue: setUsername }} />
                        <FieldInput {...{ classNameTitle: classes.subtitle, classNameInput: classes.input, title: 'Password', type: 'password', icon: <Lock className={classes.iconInput} />, placeholder: 'Enter your password', setValue: setPassword }} />
                        {(error !== '') ? <ErrorMessage {...{ message: error }} /> : <></>}
                        <Box className={classes.frameRemember}>
                            <Box className={classes.condition}>
                                <Checkbox
                                    className={classes.checkbox}
                                />
                                <Typography sx={{ margin: 0 }} variant='subtitle2' gutterBottom>
                                    Remember me
                                </Typography>
                            </Box>
                            <Box>
                                <Link to={'/reset-password'}>
                                    <Typography
                                        sx={{ margin: 0, color: '#37b85e' }}
                                        variant='subtitle1'
                                        gutterBottom
                                    >
                                        Forgot password?
                                    </Typography>
                                </Link>
                            </Box>
                        </Box>
                        <form onSubmit={handleSubmitLogin}>
                            <Button
                                type='submit'
                                className={classes.btn}
                                variant='contained'
                            >
                                Sign In
                            </Button>
                        </form>
                        <Typography
                            className={classes.textLoginWith}
                            variant='body1'
                            gutterBottom
                        >
                            or login with
                        </Typography>
                        <Box className={classes.google}>
                            <GoogleOAuthProvider
                                clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}
                            >
                                <GoogleLogin
                                    type='standard'
                                    onSuccess={handleGoogleLogin}
                                    onError={handleGoogleLoginFailed}
                                />
                            </GoogleOAuthProvider>
                        </Box>
                        <LinkLine {...{ content: 'Not registered?', link: 'Create account', href: '/register' }} />
                    </Box>
                </Box>
            </Container>
        </Container>
    );
}

export default Login