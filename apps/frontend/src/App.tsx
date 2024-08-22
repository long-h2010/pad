import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Register from "./pages/login/register";
import ForgotPassword from "./pages/reset-password/forgot-password";
import Document from "./pages/document/document";
import Profile from "./pages/profile/profile";
import NotFound from "./pages/not-found/not-found";
import DashboardLayout from "./admin/layouts/index"
import UserPage from "./pages/admin/user"
import AppPage from "./pages/admin/dashboard"
import LoginPage from "./pages/admin/login"
import { HelmetProvider } from 'react-helmet-async';
import { Suspense } from 'react';
import "./App.css";

function App() {
    return (
        <div className="App">
            <HelmetProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" Component={Home} />
                        <Route path="/login" Component={Login} />
                        <Route path="/register" Component={Register} />
                        <Route path="/reset-password" Component={ForgotPassword}></Route>
                        <Route path="/profile" Component={Profile} />
                        <Route path="/document/:id" Component={Document} />
                        <Route path="*" Component={NotFound} />
                        <Route path="/admin" element={<LoginPage />} />
                        <Route
                            path="/admin"
                            element={
                                <DashboardLayout>
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <Outlet />
                                    </Suspense>
                                </DashboardLayout>
                            }
                        >
                            <Route path="dashboard" element={<AppPage />} />
                            <Route path="user" element={<UserPage />} />
                            <Route path="document" element={<UserPage />} />
                        </Route>
                        
                    </Routes>
                </BrowserRouter>
            </HelmetProvider>
        </div>
    );
}

export default App
