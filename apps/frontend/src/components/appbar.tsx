import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Badge, Box, Button, IconButton, InputBase, Menu, MenuItem, Popover, Toolbar, Typography } from '@mui/material';
import { AccountCircleOutlined, MailOutline, Menu as MenuIcon, MoreVert, NotificationsNone, Search as SearchIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import NotificationsPopover from '../components/admin/notifications-popover';

const AppBarStyles = makeStyles()(() => {
    return {
        link: {
            color: 'black',
            '&:hover': {
                color: 'green'
            },
            textDecoration: 'none'
        },
        linkPAD: {
            color: '#106b1f',
            fontWeight: 'bold',
            '&:hover': {
                color: 'green'
            },
            textDecoration: 'none'
        }
    };
});

const AppName = import.meta.env.VITE_APP_NAME;

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#f1f3f4',
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
        border: '1px solid grey',
    },
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    border: '1px solid transparent',
    width: 700,
    [theme.breakpoints.up('mobile')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('tablet')]: {
            width: '20ch',
        },
    },
}));

function PrimarySearchAppBar() {
    const { classes } = AppBarStyles();
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleOpenProfileMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseProfileMenu = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id='primary-search-account-menu-mobile'
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size='large' color='inherit'>
                    <Badge badgeContent={4} color='error'>
                        <MailOutline />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <NotificationsPopover /><p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleOpenProfileMenu as React.MouseEventHandler}>
                <IconButton
                    size='large'
                    aria-haspopup='true'
                    color='inherit'
                >
                    <AccountCircleOutlined />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position='static'
                sx={{ backgroundColor: 'white', color: 'black' }}
            >
                <Toolbar>
                    <IconButton
                        size='large'
                        edge='start'
                        color='inherit'
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant='h6'
                        noWrap
                        component='div'
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        <Link to={'/'} className={classes.linkPAD}>{AppName}</Link>
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder='Search…'
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size='large'
                            aria-label='show 4 new mails'
                            color='inherit'
                        >
                            <Badge badgeContent={4} color='error'>
                                <MailOutline />
                            </Badge>
                        </IconButton>
                        <NotificationsPopover />
                        <IconButton
                            size='large'
                            edge='end'
                            aria-haspopup='true'
                            onClick={handleOpenProfileMenu}
                            color={open ? 'success' : 'inherit'}
                        >
                            <AccountCircleOutlined />
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleCloseProfileMenu}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                            sx={{
                                mt: 1.5,
                                ml: 0.75,
                            }}
                        >
                            <MenuItem onClick={handleCloseProfileMenu}><Link className={classes.link} to={'/profile'}>My account</Link></MenuItem>
                            <MenuItem onClick={handleCloseProfileMenu}><Link className={classes.link} to={'#'}>Logout</Link></MenuItem>
                        </Menu>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size='large'
                            aria-label='show more'
                            aria-controls='primary-search-account-menu-mobile'
                            aria-haspopup='true'
                            onClick={handleMobileMenuOpen}
                            color='inherit'
                        >
                            <MoreVert />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
        </Box>
    );
}

export default PrimarySearchAppBar