import { Helmet } from 'react-helmet-async';

import LoginView from "../../admin/sections/login/login-view"

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <LoginView />
    </>
  );
}
