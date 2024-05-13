import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Login from './pages/login/login';
import './App.css';

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' Component={ Home } />
                    <Route path='/login' Component={ Login } />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App
