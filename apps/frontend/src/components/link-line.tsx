import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const LinkLine: React.FC<any> = (props) => {
    const content = props.content;
    const link = props.link;
    const href = props.href;

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '20px',
                justifyContent: 'center',
            }}
        >
            <Typography
                variant='body1'
                sx={{ margin: '0 5px 0 0' }}
                gutterBottom
            >
                {content}
            </Typography>
            <Link to={href}>
                <Typography
                    sx={{ margin: 0, color: '#262b40', fontWeight: 'bold' }}
                    variant='subtitle1'
                    gutterBottom
                >
                    {link}
                </Typography>
            </Link>
        </Box>
    )
}

export default LinkLine