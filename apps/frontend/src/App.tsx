import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Login from './pages/login/login';
import Document from './pages/document/document';
import './App.css';
import Profile from './pages/profile/profile';
import MyEditor from './pages/editor/editor';
import Home1 from './pages/home1/home1';

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' Component={Home} />
                    <Route path='/home' Component={Home1} />
                    <Route path='/login' Component={Login} />
                    <Route path='/profile' Component={Profile} />
                    <Route path='/document/:id' Component={Document} />
                    <Route path='/editor' Component={MyEditor} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App
