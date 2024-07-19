import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Checkbox, Container, Typography } from '@mui/material';
import { AccountCircle, Email, Key } from '@mui/icons-material';
import LoginStyles from './styles';
import FieldInput from '../../components/field-input';
import LinkLine from '../../components/link-line';
import LinkBack from '../../components/link-back';

function Register() {
    const navigateTo = useNavigate();
    const auth_url = import.meta.env.VITE_APP_AUTH_URL;
    const { classes } = LoginStyles();

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handelSubmitSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords doesn\'t match!');
        } else {
            const signupData = {
                name: name,
                username: username,
                email: email,
                password: password
            };

            axios
                .post(auth_url + 'register', signupData)
                .then(() => {
                    setError('');
                    navigateTo('/login')
                })
                .catch((err) => {
                    setError(err.response.data.message);
                });
        }
    };

    return (
        <Container sx={{ zIndex: 10 }}>
            <LinkBack classes= {classes} title={"loginpage"} href={'/login'}/>
            <Box className={classes.imageBackground}>
                <Box className={classes.paper}>
                    <Box>
                        <Typography className={classes.title} variant='h4'>
                            Sign up
                        </Typography>
                        <FieldInput {...{ classNameTitle: classes.subtitle, classNameInput: classes.input, title: 'Fullname', type: 'text', icon: <AccountCircle className={classes.iconInput} />, placeholder: 'Enter your fullname', setElement: setName }} />
                        <FieldInput {...{ classNameTitle: classes.subtitle, classNameInput: classes.input, title: 'Username', type: 'text', icon: <AccountCircle className={classes.iconInput} />, placeholder: 'Enter your username', setElement: setUsername }} />
                        <FieldInput {...{ classNameTitle: classes.subtitle, classNameInput: classes.input, title: 'Email', type: 'email', icon: <Email className={classes.iconInput} />, placeholder: 'Enter your email', setElement: setEmail }} />
                        <FieldInput {...{ classNameTitle: classes.subtitle, classNameInput: classes.input, title: 'Password', type: 'password', icon: <Key className={classes.iconInput} />, placeholder: 'Enter your password', setElement: setPassword }} />
                        <FieldInput {...{ classNameTitle: classes.subtitle, classNameInput: classes.input, title: 'Comfirm password', type: 'password', icon: <Key className={classes.iconInput} />, placeholder: 'Enter confirm password', setElement: setConfirmPassword }} />
                        <p className='error'>{error}</p>
                        <Box className={classes.condition}>
                            <Checkbox
                                className={classes.checkbox}
                            />
                            <Typography sx={{ margin: 0 }} variant='subtitle2' gutterBottom>
                                I agree to the terms and conditions
                            </Typography>
                        </Box>
                        <form onSubmit={handelSubmitSignup}>
                            <Button
                                type='submit'
                                className={classes.btn}
                                variant='contained'
                            >
                                Sign Up
                            </Button>
                        </form>
                        <LinkLine {...{ content: 'Already have an account?', link: 'Login here', href: '/login' }} />
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}

export default Register
