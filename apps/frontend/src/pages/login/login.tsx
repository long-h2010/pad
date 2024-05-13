import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub, faGoogle, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import './login.css';

function Login() {
    const navigateTo = useNavigate();

    const [action, setAction] = useState('Login');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handelSubmitSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords doesn\'t match');
        } else {
            const signupData = {
                name: name,
                email: email,
                password: password,
            }

            axios.post(import.meta.env.VITE_APP_AUTHLOGIN_URL + 'signup', signupData)
                .then(res => {
                    console.log(res);
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

        const loginData = { email: email, password: password };

        console.log(loginData);

        axios.post(import.meta.env.VITE_APP_AUTHLOGIN_URL + 'login', loginData)
            .then(res => {
                console.log(res);
                navigateTo('/');
            })
            .catch(err => {
                setError(err.response.data.message);
            })
    };

    const handleGoogleLogin = async () => {
        axios.post(import.meta.env.VITE_APP_AUTHLOGIN_URL + 'google/login')
            .then(res => {
                console.log(res);
                navigateTo('/');
            })
            .catch(err => {
                setError(err.response.data.message);
            })
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
                        type='email'
                        value={email}
                        placeholder='Enter your email'
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        required
                        type='password'
                        value={password}
                        placeholder="Enter your password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <input
                        required
                        type='password'
                        value={confirmPassword}
                        placeholder="Confirm password"
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
                        type='email'
                        value={email}
                        placeholder='Enter your email'
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        required
                        type='password'
                        value={password}
                        placeholder="Enter your password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <p className='error'>{error}</p>
                    <span>or login with</span>
                    <div className='social-icons'>
                        <a onClick={handleGoogleLogin} className='icon'><FontAwesomeIcon icon={faGoogle} /></a>
                        <a className='icon'><FontAwesomeIcon icon={faFacebook} /></a>
                        <a className='icon'><FontAwesomeIcon icon={faGithub} /></a>
                        <a className='icon'><FontAwesomeIcon icon={faLinkedin} /></a>
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