import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Login from './pages/login/login';
import Document from './pages/document/document';
import Profile from './pages/profile/profile';
import NotFound from './pages/not-found/not-found';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './App.css';
import MyEditor from './pages/document/editor/editor';


function App() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/login" Component={Login} />
            <Route path="/profile" Component={Profile} />
            <Route path="/document/:id" Component={Document} />
            <Route path="/editor" Component={MyEditor} />
            <Route path="*" Component={NotFound} />
          </Routes>
        </BrowserRouter>
      </div>
    );
}

export default App
