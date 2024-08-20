import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Register from "./pages/login/register";
import ForgotPassword from "./pages/reset-password/forgot-password";
import Document from "./pages/document/document";
import Profile from "./pages/profile/profile";
import NotFound from "./pages/not-found/not-found";
import DashboardLayout from "./pages/admin/dashboard"
import UserPage from "./pages/admin/user"
import "./App.css";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" Component={Home} />
                    <Route path="/login" Component={Login} />
                    <Route path="/register" Component={Register} />
                    <Route path="/reset-password" Component={ForgotPassword}></Route>
                    <Route path="/profile" Component={Profile} />
                    <Route path="/document/:id" Component={Document} />
                    <Route path="/dashboard" Component={DashboardLayout} />
                    <Route path="/user" Component={UserPage} />
                    <Route path="*" Component={NotFound} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App
