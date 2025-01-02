import { Box, Button, Typography } from '@mui/material';
import { Female, Male } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import FieldInput from '../../components/inputs/field-input';
import ErrorMessage from '../../components/notification-message/error-message';
import ProfileStyles from '../../assets/styles/profile';
import dayjs from 'dayjs';

const Information: React.FC<any> = (props) => {
    const { classes } = ProfileStyles();
    const { fullname, setFullname, gender, setGender, birthday, setBirthday, email, setEmail, nickname, setNickname, handleUpdateInfo, error } = props;

    return (
        <>
            <Typography className={classes.title} variant='h4'>
                Profile
            </Typography>
            <Box>
                <Box className={classes.frame}>
                    <FieldInput
                        {...{
                            classNameTitle: classes.subtitle,
                            classNameInput: classes.input,
                            title: 'Fullname',
                            type: 'text',
                            icon: '',
                            value: fullname,
                            placeholder: 'Enter your fullname',
                            setValue: setFullname,
                        }}
                    />
                </Box>
                <Box sx={{ margin: 0 }} className={classes.frame}>
                    <Typography
                        className={classes.subtitle}
                        variant='subtitle1'
                        gutterBottom
                    >
                        Gender
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                        <Box
                            className={classes.boxGender}
                            onClick={() => setGender('male')}
                            sx={{color: (gender === 'male') ? '#289bed' : 'rgb(79, 79, 79)'}}
                        >
                            <Male sx={{ fontSize: '34px' }} />
                            <Typography sx={{ margin: 0 }} variant='body2' gutterBottom>
                                Male
                            </Typography>
                        </Box>
                        <Box
                            className={classes.boxGender}
                            onClick={() => setGender('female')}
                            sx={{color: (gender === 'female') ? 'red' : 'rgb(79, 79, 79)'}}
                        >
                            <Female sx={{ fontSize: '34px' }} />
                            <Typography sx={{ margin: 0 }} variant='body2' gutterBottom>
                                Female
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box className={classes.frame}>
                    <Typography
                        className={classes.subtitle}
                        variant='subtitle1'
                        gutterBottom
                    >
                        Date of birth
                    </Typography>
                    <Box>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                    format='DD/MM/YYYY'
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            sx: {
                                                width: '70%',
                                                '& .MuiInputBase-root': {
                                                    color: 'rgb(50, 56, 62)',
                                                    backgroundColor: 'white',
                                                    paddingTop: '2px',
                                                    paddingBottom: '2px',
                                                    borderRadius: '5px',
                                                    borderColor: '#ededed',
                                                    boxShadow: '0 1px 5px rgba(0, 0, 0, 0.2)',
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: 'rgb(237, 237, 237)', 
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: 'darkgreen',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: 'darkgreen',
                                                    },
                                                }
                                            }
                                        }
                                    }}
                                    onChange={(e: any) => setBirthday(e)}
                                    value={dayjs(birthday)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Box>
                </Box>
                <Box className={classes.frame}>
                    <FieldInput
                        {...{
                            classNameTitle: classes.subtitle,
                            classNameInput: classes.input,
                            title: 'Email',
                            type: 'email',
                            value: email,
                            placeholder: 'Enter your email',
                            setValue: setEmail,
                        }}
                    />
                </Box>
                <Box className={classes.frame}>
                    <FieldInput
                        {...{
                            classNameTitle: classes.subtitle,
                            classNameInput: classes.input,
                            title: 'Nickname',
                            type: 'text',
                            icon: '',
                            value: nickname,
                            placeholder: 'Enter your nickname',
                            setValue: setNickname,
                        }}
                    />
                </Box>
                {error !== '' ? <ErrorMessage {...{ message: error }} /> : <></>}
                <Box sx={{ float: 'right' }} >
                    <Button variant='contained' color='success' onClick={handleUpdateInfo} className={classes.btnSave}>
                        Save
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default Information
