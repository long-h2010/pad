import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { Key, Lock } from '@mui/icons-material';
import FieldInput from '../../components/field-input';

const ResetPassword: React.FC<any> = (props) => {
    const classes = props.classes;
    const error = props.error;
    const setPassword = props.setPassword;
    const setConfirmPassword = props.setConfirmPassword;
    const handleResetPassword = props.handleResetPassword;

    return (
        <Container>
            <Box className={classes.imageBackground}>
                <Box className={classes.paper}>
                    <Box>
                        <Key className={classes.icon} />
                        <Typography className={classes.title} variant='h5'>
                            Create New Password
                        </Typography>
                        <Typography
                            className={classes.subtitleReset}
                            variant='subtitle1'
                            gutterBottom
                        >
                            Enter a new pasword below to change your password
                        </Typography>
                        <FieldInput
                            {...{
                                classNameTitle: classes.subtitle,
                                classNameInput: classes.input,
                                title: 'New password',
                                type: 'password',
                                icon: <Lock className={classes.iconInput} />,
                                placeholder: 'Enter your new password',
                                setElement: setPassword,
                            }}
                        />

                        <FieldInput
                            {...{
                                classNameTitle: classes.subtitle,
                                classNameInput: classes.input,
                                title: 'Confirm Password',
                                type: 'password',
                                icon: <Lock className={classes.iconInput} />,
                                placeholder: 'Confirm new password',
                                setElement: setConfirmPassword,
                            }}
                        />
                        <p className='error'>{error}</p>
                        <Button className={classes.btnSend} variant='contained' onClick={handleResetPassword}>
                            Reset password
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}

export default ResetPassword
