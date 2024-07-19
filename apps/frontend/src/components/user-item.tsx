import { Avatar, Badge, Box, styled, Typography } from '@mui/material';
import React from 'react';

const StyledBadgeOnline = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: `''`,
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

const StyledBadgeOffline = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        backgroundColor: "#BDBDBD",
        color: "#BDBDBD",
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
}));

export const UserOnline: React.FC<any> = (props) => {
    const name = props.name;
    const avatar = props.avatar;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', paddingBottom: 1 }}>
            <StyledBadgeOnline
                overlap='circular'
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant='dot'
            >
                <Avatar alt='avatar' src={avatar} />
            </StyledBadgeOnline>
            <Box>
                <Typography variant='subtitle1' ml={3}>
                    {name}
                </Typography>
                <Typography variant='body2' sx={{color: "rgba(0, 0, 0, 0.6)"}} ml={3}>
                    thaoyi
                </Typography>
            </Box>
        </Box>
    );
}

export const UserOffline: React.FC<any> = (props) => {
    const name = props.name;
    const avatar = props.avatar;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', paddingBottom: 1 }}>
            <StyledBadgeOffline
                overlap='circular'
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant='dot'
            >
                <Avatar alt='avatar' src={avatar} />
            </StyledBadgeOffline>
            <Box>
                <Typography variant='subtitle1' ml={3}>
                    {name}
                </Typography>
                <Typography variant='body2' sx={{color: "rgba(0, 0, 0, 0.6)"}} ml={3}>
                    thaoyi
                </Typography>
            </Box>
        </Box>
    );
}
