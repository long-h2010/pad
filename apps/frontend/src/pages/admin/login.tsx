import { Helmet } from 'react-helmet-async';

import LoginView from "../../admin/sections/login/login-view"

// ----------------------------------------------------------------------

export default function AdminLogin() {
  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <LoginView />
    </>
  );
}
