import { Box, Container, List, Typography } from '@mui/material';
import { Pin } from '@mui/icons-material';
import OTPInput from '../../components/otp-input';
import LinkLine from '../../components/link-line';

const VerifyOTP: React.FC<any> = (props) => {
    const classes = props.classes;
    const error = props.error;
    const handleVerifyOtp = props.handleVerifyOtp

    return (
        <Container>
            <Box className={classes.imageBackground}>
                <Box className={classes.paper}>
                    <Box>
                        <Pin className={classes.icon} />
                        <Typography className={classes.title} variant='h5'>
                            OTP Generator
                        </Typography>
                        <Typography
                            className={classes.subtitleReset}
                            variant='subtitle1'
                            gutterBottom
                        >
                            Your code was sent to you via email
                        </Typography>
                        <List>
                            <OTPInput length={6} onComplete={handleVerifyOtp} />
                        </List>
                        <p className='error'>{error}</p>
                        <LinkLine {...{ content: `Didn't receive code?`, link: 'Request again', herf: '#' }} />
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}

export default VerifyOTP
