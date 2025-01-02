import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import Nav from '../../components/admin/nav';
import Main from '../../components/admin/main';
import Header from '../../components/admin/header';

// ----------------------------------------------------------------------

const DashboardLayout: React.FC<any> = ({ children }) => {

    return (
        <>
            <Header/>

            <Box
                sx={{
                    minHeight: 1,
                    display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row' },
                }}
            >
                <Nav openNav="true"/>
                <Main>{children}</Main>
            </Box>
        </>
    );
};

DashboardLayout.propTypes = {
    children: PropTypes.node,
};

export default DashboardLayout
