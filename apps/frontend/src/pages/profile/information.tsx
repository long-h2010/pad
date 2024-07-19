import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import React from 'react';
import FieldInput from '../../components/field-input';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const Information: React.FC<any> = (props) => {
    const classes = props.classes;
    const fullname = props.fullname;
    const setFullname = props.setFullname;
    const gender = props.gender;
    const setGender = props.setGender;
    const birthday = props.birthday;
    const setBirthday = props.setBirthday;
    const email = props.email;
    const setEmail = props.setEmail;
    const nickname = props.nickname
    const setNickname = props.setNickname;

    return (
        <>
            <Typography className={classes.title} variant='h4'>
                Profile
            </Typography>
            <Box>
                <Box className={classes.fieldName}>
                    <FieldInput
                        {...{
                            classNameTitle: classes.subtitle,
                            classNameInput: classes.input,
                            title: 'Fullname',
                            type: 'text',
                            icon: '',
                            value: fullname,
                            placeholder: 'Enter your fullname',
                            setElement: setFullname,
                        }}
                    />
                </Box>
                <Box className={classes.fieldName}>
                    <Typography
                        className={classes.subtitle}
                        variant='subtitle1'
                        gutterBottom
                    >
                        Gender
                    </Typography>
                    <Box sx={{ width: '80%' }}>
                        <FormControl component='fieldset'>
                            <RadioGroup
                                row
                                aria-label='gender'
                                name='gender'
                                // value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <FormControlLabel value='male' control={<Radio />} label='Male' />
                                <FormControlLabel value='female' control={<Radio />} label='Female' />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                </Box>
                <Box className={classes.fieldName}>
                    <Typography
                        className={classes.subtitle}
                        variant='subtitle1'
                        gutterBottom
                    >
                        Date of birth
                    </Typography>
                    <Box sx={{ width: '80%' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Box>
                </Box>
                <Box className={classes.fieldName}>
                    <FieldInput
                        {...{
                            classNameTitle: classes.subtitle,
                            classNameInput: classes.input,
                            title: 'Email',
                            type: 'email',
                            icon: '',
                            value: email,
                            placeholder: 'Enter your email',
                            setElement: setEmail,
                        }}
                    />
                </Box>
                <Box className={classes.fieldName}>
                    <FieldInput
                        {...{
                            classNameTitle: classes.subtitle,
                            classNameInput: classes.input,
                            title: 'Nickname',
                            type: 'text',
                            icon: '',
                            value: nickname,
                            placeholder: 'Enter your nickname',
                            setElement: setNickname,
                        }}
                    />
                </Box>
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

export default Information