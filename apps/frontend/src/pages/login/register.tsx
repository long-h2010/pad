import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Checkbox, Container, Typography } from '@mui/material';
import { AccountCircle, Email, Key } from '@mui/icons-material';
import LoginStyles from '../../assets/styles/login';
import FieldInput from '../../components/inputs/field-input';
import LinkLine from '../../components/link/link-line';
import BackTo from '../../components/link/back-to';
import ErrorMessage from '../../components/notification-message/error-message';
import { useGlobalContext } from '../../context';

function Register() {
    const navigateTo = useNavigate();
    const { auth_url, setAlertInfor, setShowAlert, error, setError } = useGlobalContext();
    const { classes } = LoginStyles();
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handelSubmitSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords doesn\'t match!');
        } else {
            const signupData: any = {
                name: name,
                username: username,
                email: email,
                password: password,
            };

            for (let i in signupData) {
                if (signupData[i] === '') {
                    setError(`Please enter your ${i}`);
                    return;
                }
            }

            axios
                .post(`${auth_url}/register`, signupData)
                .then(() => {
                    setAlertInfor(['success', 'Sign up successful']);
                    setShowAlert(true);
                    setError('');
                    setTimeout(() => {
                        navigateTo('/login');
                    }, 3000);
                })
                .catch((err) => {
                    setError(err.response.data.message);
                })
        }
    };

    return (
        <Container sx={{ zIndex: 10, height: '800px', position: 'relative' }}>
            <BackTo {...{ page: 'Home page', href: '/' }} />
            <Container className={classes.imageBackground}>
                <Box className={classes.paper}>
                    <Box sx={{ height: 'fit-content' }}>
                        <Typography className={classes.title} variant='h4'>
                            Sign up
                        </Typography>
                        <FieldInput
                            {...{
                                classNameTitle: classes.subtitle,
                                classNameInput: classes.input,
                                title: 'Fullname',
                                type: 'text',
                                icon: <AccountCircle className={classes.iconInput} />,
                                placeholder: 'Enter your fullname',
                                setValue: setName,
                            }}
                        />
                        <FieldInput
                            {...{
                                classNameTitle: classes.subtitle,
                                classNameInput: classes.input,
                                title: 'Username',
                                type: 'text',
                                icon: <AccountCircle className={classes.iconInput} />,
                                placeholder: 'Enter your username',
                                setValue: setUsername,
                            }}
                        />
                        <FieldInput
                            {...{
                                classNameTitle: classes.subtitle,
                                classNameInput: classes.input,
                                title: 'Email',
                                type: 'email',
                                icon: <Email className={classes.iconInput} />,
                                placeholder: 'Enter your email',
                                setValue: setEmail,
                            }}
                        />
                        <FieldInput
                            {...{
                                classNameTitle: classes.subtitle,
                                classNameInput: classes.input,
                                title: 'Password',
                                type: 'password',
                                icon: <Key className={classes.iconInput} />,
                                placeholder: 'Enter your password',
                                setValue: setPassword,
                            }}
                        />
                        <FieldInput
                            {...{
                                classNameTitle: classes.subtitle,
                                classNameInput: classes.input,
                                title: 'Comfirm password',
                                type: 'password',
                                icon: <Key className={classes.iconInput} />,
                                placeholder: 'Enter confirm password',
                                setValue: setConfirmPassword,
                            }}
                        />
                        {error !== '' ? <ErrorMessage {...{ message: error }} /> : <></>}
                        <Box className={classes.condition}>
                            <Checkbox className={classes.checkbox} />
                            <Typography sx={{ margin: 0 }} variant='subtitle2' gutterBottom>
                                I agree to the terms and conditions
                            </Typography>
                        </Box>
                        <form onSubmit={handelSubmitSignup}>
                            <Button type='submit' className={classes.btn} variant='contained'>
                                Sign Up
                            </Button>
                        </form>
                        <LinkLine
                            {...{
                                content: 'Already have an account?',
                                link: 'Login here',
                                href: '/login',
                            }}
                        />
                    </Box>
                </Box>
            </Container>
        </Container>
    );
}

export default Register
