import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import FieldInput from '../../components/field-input';
import ErrorMessage from '../../components/error-message';
import ProfileStyles from './styles';

const ChangePassword: React.FC<any> = (props) => {
    const { classes } = ProfileStyles();
    const { setOldPassword, setNewPassword, setConfirmNewPassword, handleChangePassword, error } = props;

    return (
        <>
            <Typography className={classes.title} variant='h4'>
                Change password
            </Typography>
            <Box>
                <FieldInput
                    {...{
                        classNameTitle: classes.subtitle,
                        classNameInput: classes.input,
                        title: 'Old password',
                        type: 'password',
                        icon: '',
                        placeholder: 'Enter your old password',
                        setElement: setOldPassword,
                    }}
                />
                <FieldInput
                    {...{
                        classNameTitle: classes.subtitle,
                        classNameInput: classes.input,
                        title: 'New password',
                        type: 'password',
                        icon: '',
                        placeholder: 'Enter your new password',
                        setElement: setNewPassword,
                    }}
                />
                <FieldInput
                    {...{
                        classNameTitle: classes.subtitle,
                        classNameInput: classes.input,
                        title: 'Confirm password',
                        type: 'password',
                        icon: '',
                        placeholder: 'Enter confirmation password',
                        setElement: setConfirmNewPassword,
                    }}
                />
                {error !== '' ? <ErrorMessage {...{ message: error }} /> : <></>}
                <Box
                    sx={{
                        float: 'right',
                        marginTop: '30px',
                    }}
                >
                    <Button
                        variant='contained'
                        color='success'
                        onClick={handleChangePassword} className={classes.btnSave}
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default ChangePassword
