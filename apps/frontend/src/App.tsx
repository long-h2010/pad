import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import Home from './pages/home/home';
import Login from './pages/login/login';
import Register from './pages/login/register';
import ForgotPassword from './pages/reset-password/forgot-password';
import Document from './pages/document/document';
import Profile from './pages/profile/profile';
import NotFound from './pages/not-found/not-found';
import DashboardLayout from './pages/admin/index';
import UserPage from './pages/admin/user';
import Dashboard from './pages/admin/dashboard';
import AdminLogin from './pages/admin/login';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './App.css';
import { socket } from './socket';
import { useGlobalContext } from './context';
import { HelmetProvider } from 'react-helmet-async';
import AlertMessage from './components/notification-message/alert-message';
import Deleted from './pages/deleted/docs-deleted';

function App() {
    const token = localStorage.getItem('token');
    const { setUsersOnline } = useGlobalContext();

    if (token) {
        useEffect(() => {
            socket.on('connect', () => {
                console.log('Connected');
            });

            socket.on('online', (users) => {
                setUsersOnline(users)
            });

            return () => {
                socket.off('connect');
                socket.off('online');
            };
        }, []);

        useEffect(() => {
            socket.emit('login', token);
        }, [token]);
    };

    return (
        <div className='App'>
            <HelmetProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' Component={Home} />
                        <Route path='/login' Component={Login} />
                        <Route path='/register' Component={Register} />
                        <Route path='/reset-password' Component={ForgotPassword}></Route>
                        <Route path='/profile' Component={Profile} />
                        <Route path='/document/:id' Component={Document} />
                        <Route path='/documents-deleted' Component={Deleted} />
                        <Route path='/admin' element={<AdminLogin />} />
                        <Route
                            path='/admin'
                            element={
                                <DashboardLayout>
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <Outlet />
                                    </Suspense>
                                </DashboardLayout>
                            }
                        >
                            <Route path='dashboard' element={<Dashboard />} />
                            <Route path='user' element={<UserPage />} />
                            <Route path='document' element={<UserPage />} />
                        </Route>
                        <Route path='*' Component={NotFound} />
                    </Routes>
                </BrowserRouter>
            </HelmetProvider>
            <AlertMessage />
        </div>
    );
}

export default App
