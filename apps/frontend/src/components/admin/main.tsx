import Box from '@mui/material/Box';

import useResponsive from '../../admin/hooks/use-responsive';

import { NAV, HEADER } from '../../admin/hooks/config-layout';
// ----------------------------------------------------------------------

const SPACING = 8;

const Main: React.FC<any> = ({ children, sx, ...other }) => {
  const lgUp = useResponsive('up', 'lg');

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        py: `${HEADER.H_MOBILE + SPACING}px`,
        ...(lgUp && {
          px: 2,
          py: `${HEADER.H_DESKTOP + SPACING}px`,
          width: `calc(100% - ${NAV.WIDTH}px)`,
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}

export default Main;