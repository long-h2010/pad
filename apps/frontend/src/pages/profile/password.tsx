import { Box, Button, Typography } from '@mui/material';
import FieldInput from '../../components/inputs/field-input';
import ErrorMessage from '../../components/notification-message/error-message';
import ProfileStyles from '../../assets/styles/profile';

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
                        setValue: setOldPassword,
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
                        setValue: setNewPassword,
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
                        setValue: setConfirmNewPassword,
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
