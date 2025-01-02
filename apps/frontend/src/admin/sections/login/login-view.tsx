
import { useState } from 'react';

import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import BgImage from '../../../assets/background/background-login.svg';
import { useRouter } from '../../routes/hooks/use-router';
import Iconify from '../../../components/admin/iconify/iconify';
import LoginStyles from '../../../assets/styles/login';
// ----------------------------------------------------------------------

const LoginView: React.FC<any> = () => {
  const theme = useTheme();
  const { classes } = LoginStyles();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    router.push('/admin/dashboard');
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link to={'/reset-password'}>
          <Typography
            sx={{ margin: 0, color: '#37b85e' }}
            variant='subtitle1'
            gutterBottom
          >
            Forgot password?
          </Typography>
        </Link>
      </Stack>

      <Button
        type='submit'
        className={classes.btn}
        variant='contained' onClick={handleClick}
      >
        Sign In
      </Button>
    </>
  );

  return (
    <Container sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundRepeat: 'no-repeat !important',
      backgroundImage: `url(${BgImage})`,
      minHeight: '600px',
    }} >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.1)',
        }}
      >

        <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
          <Card
            sx={{
              p: 5,
              width: 1,
              maxWidth: 420,
            }}
          >
            <Typography className={classes.title} variant='h4' sx={{padding: "25px"}}>
              Sign in
            </Typography>

            {renderForm}
          </Card>
        </Stack>
      </Box>
    </Container>
  );
}

export default LoginView;