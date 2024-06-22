import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import './login.css';

function Login() {
    const navigateTo = useNavigate();
    const auth_url = import.meta.env.VITE_APP_AUTH_URL;

    const [action, setAction] = useState('Login');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handelSubmitSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            setError('Passwords doesn\'t match!');
        } else {
            const signupData = {
                name: name,
                username: username,
                password: password,
            };

            axios.post(auth_url + 'register', signupData)
                .then(() => {
                    setError('');
                    setAction('Login');
                })
                .catch(err => {
                    setError(err.response.data.message);
                })
        }
    };

    const handleSubmitLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const loginData = { username: username, password: password };

        axios.post(auth_url + 'login', loginData)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                navigateTo('/');
            })
            .catch(err => {
                setError(err.response.data.message);
            })
    };

    // const handleGoogleLogin = useGoogleLogin({
    //     onSuccess: async (credentialResponse: any) => {
    //         console.log(credentialResponse)
    //         axios.post(auth_url + 'google/login', {token : credentialResponse.credential})
    //             .then(res => {
    //                 console.log(res);
    //                 navigateTo('/');
    //             })
    //             .catch(err => {
    //                 setError(err.response.data.message);
    //             })
    //     },
    //     onError: (error) => console.log('Login Failed', error)
    // });

    const handleGoogleLogin = async (credentialResponse: any) => {
        const token = credentialResponse.credential;
        axios.post(auth_url + 'google/login', { token: token })
            .then(res => {
                localStorage.setItem('token', res.data.token);
                navigateTo('/');
            })
            .catch(err => {
                setError(err.response.data.message);
            })
    };

    const handleGoogleLoginFailed = async () => {
        console.log('Login Failed');
    };

    return (
        <div className={'container ' + (action === 'Login' ? '' : 'active')} id='container'>
            <div className='form-container sign-up'>
                <form onSubmit={handelSubmitSignup}>
                    <h1>Create Account</h1>
                    <input
                        required
                        type='name'
                        value={name}
                        placeholder='Enter your name'
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        required
                        type='text'
                        value={username}
                        placeholder='Enter your username'
                        onChange={e => setUsername(e.target.value)}
                    />
                    <input
                        required
                        type='password'
                        value={password}
                        placeholder='Enter your password'
                        onChange={e => setPassword(e.target.value)}
                    />
                    <input
                        required
                        type='password'
                        value={confirmPassword}
                        placeholder='Confirm password'
                        onChange={e => setconfirmPassword(e.target.value)}
                    />
                    <p className='error'>{error}</p>
                    <button>Sign Up</button>
                </form>
            </div>
            <div className='form-container sign-in'>
                <form onSubmit={handleSubmitLogin}>
                    <h1>Login</h1>
                    <input
                        required
                        type='text'
                        value={username}
                        placeholder='Enter your username'
                        onChange={e => setUsername(e.target.value)}
                    />
                    <input
                        required
                        type='password'
                        value={password}
                        placeholder='Enter your password'
                        onChange={e => setPassword(e.target.value)}
                    />
                    <p className='error'>{error}</p>
                    <span>or login with</span>
                    <div className='social-icons'>
                        {/* <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
                        <a onClick={() => {handleGoogleLogin}} className='icon'>
                            <FontAwesomeIcon icon={faGoogle} />
                        </a>
                        </GoogleOAuthProvider> */}
                        <div className='icon'>
                            <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
                                <GoogleLogin
                                    type='standard'
                                    onSuccess={handleGoogleLogin}
                                    onError={handleGoogleLoginFailed}
                                />
                            </GoogleOAuthProvider>
                        </div>
                        {/* <a className='icon'><FontAwesomeIcon icon={faFacebook} /></a>
                        <a className='icon'><FontAwesomeIcon icon={faGithub} /></a>
                        <a className='icon'><FontAwesomeIcon icon={faLinkedin} /></a> */}
                    </div>
                    <button type='submit'>Login</button>
                </form>
            </div>
            <div className='toggle-container'>
                <div className='toggle'>
                    <div className='toggle-panel toggle-left'>
                        <h1>Welcome Back!</h1>
                        <p>Enter your personal details to use all of site features</p>
                        <button className='hidden' id='login' onClick={() => { setAction('Login'); setError('') }}>Login</button>
                    </div>
                    <div className='toggle-panel toggle-right'>
                        <h1>Hello, Friend!</h1>
                        <p>Register with your personal details to use all of site features</p>
                        <button className='hidden' id='signup' onClick={() => { setAction('SignUp'); setError('') }}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login