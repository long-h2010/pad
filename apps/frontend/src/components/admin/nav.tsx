import PropTypes from "prop-types";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';

import usePathname from '../../admin/routes/hooks/use-pathname';
import RouterLink from '../../admin/routes/components/router-link';

import Logo from './logo/logo';
import Scrollbar from '../scrollbar/scrollbar';

import { NAV } from '../../admin/hooks/config-layout';
import SvgColor from './svg-color/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`../public/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/admin/dashboard',
    icon: icon('ic-analytics'),
  },
  {
    title: 'user',
    path: '/admin/user',
    icon: icon('ic-user'),
  },
];

// ----------------------------------------------------------------------

const Nav: React.FC<any> = () => {
  const account = {
    displayName: "Jaydon Frankie",
    email: "demo@minimals.cc",
    photoURL: "/public/images/avatar/avatar-25.webp",
  };

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: "flex",
        borderRadius: 1.5,
        alignItems: "center",
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      <Avatar src={account.photoURL} alt="photoURL" />

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{account.displayName}</Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {account.email}
        </Typography>
      </Box>
    </Box>
  );

  const renderMenu = (
    <Stack spacing={0.5} sx={{margin: 4}}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Logo sx={{ mt: 3, ml: 4 }} />

      {renderAccount}

      {renderMenu}

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
        <Box
          sx={{
            height: 1,
            position: "fixed",
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
    </Box>
  );
};

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

// ----------------------------------------------------------------------

const NavItem: React.FC<any> = ({ item }) => {
  const pathname = usePathname();

  const active = item.path === pathname;

  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: "body2",
        color: "text.secondary",
        textTransform: "capitalize",
        fontWeight: "fontWeightMedium",
        "&:hover": {
          bgcolor: "rgba(46, 125, 50, 0.16)",
          color: 'green',
        },
        ...(active && {
          color: "rgb(27, 94, 32)",
          fontWeight: "bolder",
          bgcolor: "rgba(46, 125, 50, 0.16)",
          "&:hover": {
            bgcolor: "rgba(46, 125, 50, 0.16)",
            color: 'green'
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>

      <Box component="span">{item.title} </Box>
    </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};


export default Nav;