// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import { createTheme } from '@mui/material/styles';
// // import DashboardIcon from '@mui/icons-material/Dashboard';
// // import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import { AppProvider } from '@toolpad/core/AppProvider';
// import { DashboardLayout as Layout } from '@toolpad/core/DashboardLayout';
// import type { Navigation, Router } from '@toolpad/core';
// import { useMemo, useState } from 'react';

// const NAVIGATION: Navigation = [
//     {
//         segment: 'dashboard',
//         title: 'Dashboard',
//         // icon: <DashboardIcon />,
//     },
//     {
//         segment: 'orders',
//         title: 'Orders',
//         // icon: <ShoppingCartIcon />,
//     },
// ];

// // const demoTheme = createTheme({
// //     cssVariables: {
// //         colorSchemeSelector: 'data-toolpad-color-scheme',
// //     },
// //     colorSchemes: { light: true, dark: true },
// //     breakpoints: {
// //         values: {
// //             xs: 0,
// //             sm: 600,
// //             md: 600,
// //             lg: 1200,
// //             xl: 1536,
// //         },
// //     },
// // });

// function DemoPageContent({ pathname }: { pathname: string }) {
//     return (
//         <Box
//             sx={{
//                 py: 4,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 textAlign: 'center',
//             }}
//         >
//             <Typography>Dashboard content for {pathname}</Typography>
//         </Box>
//     );
// }

// interface DemoProps {
//     /**
//      * Injected by the documentation to work in an iframe.
//      * Remove this when copying and pasting into your project.
//      */
//     window?: () => Window;
// }

// export default function DashboardLayout(props: DemoProps) {
//     const { window } = props;

//     const [pathname, setPathname] = useState('/dashboard');

//     const router = useMemo<Router>(() => {
//         return {
//             pathname,
//             searchParams: new URLSearchParams(),
//             navigate: (path) => setPathname(String(path)),
//         };
//     }, [pathname]);

//     // Remove this const when copying and pasting into your project.
//     const demoWindow = window !== undefined ? window() : undefined;

//     return (
//         // preview-start
//         <AppProvider
//             navigation={NAVIGATION}
//             branding={{
//                 logo: <img src='https://mui.com/static/logo.png' alt='MUI logo' />,
//                 title: 'MUI',
//             }}
//             router={router}
//             // theme={demoTheme}
//             // window={demoWindow}
//         >
//             <Layout>
//                 <DemoPageContent pathname={pathname} />
//             </Layout>
//         </AppProvider>
//         // preview-end
//     );
// }