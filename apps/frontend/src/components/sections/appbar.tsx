import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Avatar, Badge, Box, Drawer, IconButton, InputBase, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { AccountCircleOutlined, Login, Logout, MailOutline, ManageAccounts, Menu as MenuIcon, MoreVert, PendingActions, Search as SearchIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import NotificationsPopover from './notifications-popover';
import LogoImg from '/images/logo.png';

const AppBarStyles = makeStyles()(() => {
    return {
        link: {
            color: 'black',
            '&:hover': {
                color: 'green',
            },
            textDecoration: 'none',
        },
        linkPAD: {
            color: '#106b1f',
            fontWeight: 'bold',
            '&:hover': {
                color: 'green',
            },
            textDecoration: 'none',
        },
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
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('tablet')]: {
            width: '20ch',
        },
    },
}));

const PrimarySearchAppBar: React.FC<any> = ({ setSearchValue }) => {
    const { classes } = AppBarStyles();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const token = localStorage.getItem('token')
    const avatar = token ? localStorage.getItem('avatar') as string : '';
    const navigateTo = useNavigate();

    const handleOpenProfileMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseProfileMenu = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('avatar');
    };

    const moveToDeleteDocs = () => {
        navigateTo('/documents-deleted');
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
                <NotificationsPopover />
            </MenuItem>
            <MenuItem onClick={handleOpenProfileMenu as React.MouseEventHandler}>
                <IconButton size='large' aria-haspopup='true' color='inherit'>
                    <AccountCircleOutlined />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    const [openDrawer, setOpenDrawer] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpenDrawer(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role='presentation' onClick={toggleDrawer(false)}>
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                <Link to={'/'} className={classes.linkPAD}>
                    <img
                        src={LogoImg}
                        style={{ width: '40px', height: '40px', marginRight: '12px' }}
                    />
                    <Typography variant='h5'>{AppName}</Typography>
                </Link>
            </Box>

            <List>
                <ListItem key='Tài liệu đã xóa' disablePadding>
                    <ListItemButton onClick={moveToDeleteDocs}>
                        <ListItemIcon>
                            <PendingActions />
                        </ListItemIcon>
                        <ListItemText primary='Tài liệu đã xóa' />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static' sx={{ backgroundColor: 'white', color: 'black' }}>
                <Toolbar>
                    <IconButton
                        onClick={toggleDrawer(true)}
                        size='large'
                        edge='start'
                        color='inherit'
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Drawer
                        disableScrollLock={true}
                        open={openDrawer}
                        onClose={toggleDrawer(false)}
                    >
                        {DrawerList}
                    </Drawer>
                    <Typography
                        variant='h6'
                        noWrap
                        component='div'
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        <Link to={'/'} className={classes.linkPAD}>
                            <img
                                src={LogoImg}
                                style={{ width: '40px', height: '40px', marginRight: '12px' }}
                            />
                            {AppName}
                        </Link>
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder='Search…'
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(e: any) => setSearchValue(e.target.value)}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton size='large' aria-label='show 4 new mails' color='inherit'>
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
                            <Avatar src={avatar} />
                        </IconButton>
                        <Menu
                            id='basic-menu'
                            anchorEl={anchorEl}
                            open={open}
                            disableScrollLock={true}
                            onClose={handleCloseProfileMenu}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                            sx={{
                                mt: 1.5,
                                ml: 0.75,
                            }}
                        >
                            {avatar ? (
                                <Box>
                                    <MenuItem onClick={handleCloseProfileMenu}>
                                        <Link className={classes.link} to={'/profile'}>
                                            <ManageAccounts /> My account
                                        </Link>
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        <Link className={classes.link} to={'/login'}>
                                            <Logout /> Logout
                                        </Link>
                                    </MenuItem>
                                </Box>
                            ) : (
                                <MenuItem onClick={handleCloseProfileMenu}>
                                    <Link className={classes.link} to={'/login'}>
                                        <Login /> Login
                                    </Link>
                                </MenuItem>
                            )}
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
};

export default PrimarySearchAppBar;
