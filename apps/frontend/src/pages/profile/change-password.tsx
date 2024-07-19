import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import FieldInput from '../../components/field-input';

const ChangePassword: React.FC<any> = (props) => {
    const classes = props.classes;
    const error = props.error;
    const setOldPassword = props.setOldPassword;
    const setNewPassword = props.setNewPassword;
    const setConfirmNewPassword = props.setConfirmNewPassword;
    const handleChangePassword = props.handleChangePassword;

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
                <p className='error'>{error}</p>
                <Box
                    sx={{
                        display: 'flex',
                        float: 'right',
                        marginTop: '30px',
                    }}
                >
                    <Button
                        sx={{ marginRight: '10px' }}
                        variant='contained'
                        color='success'
                        onClick={handleChangePassword}
                    >
                        Save
                    </Button>
                    <Button variant='outlined' color='success'>
                        Cancel
                    </Button>
                </Box>
            </Box>
        </>
    );
}

export default ChangePassword