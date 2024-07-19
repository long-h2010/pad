import React, { useState } from 'react';
import { Avatar, Box, Container, Tab, Tabs, Typography } from '@mui/material';
import axios from 'axios';
import PrimarySearchAppBar from '../../components/appbar';
import ChangePassword from './change-password';
import Information from './information';
import ProfileStyles from './styles';
import { useGlobalContext } from '../../context';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component={'div'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`
    };
}

function Profile() {
    const user_url = useGlobalContext().user_url;
    const { classes } = ProfileStyles();
    const token = localStorage.getItem('token');
    const [value, setValue] = React.useState(0);
    const [avatar, setAvatar] = useState('');
    const [fullname, setFullname] = useState('');
    const [gender, setGender] = useState('male');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState('');

    axios
        .get(user_url, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
            const user = res.data;
            setAvatar(user.avatar)
            setFullname(user.name);
            setGender(user.gender ? user.gender : '');
            setBirthday(user.birthday ? user.birthday : '');
            setEmail(user.email);
            setNickname(user.nickname);
        })
        .catch((err) => console.log(err))

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleChangePassword = () => {
        if (newPassword !== confirmNewPassword) {
            setError('New password and password confirm don\'t match!')
        } else {
            axios
                .post(user_url + 'change-password', { 
                    Authorization: `Bearer ${token}`, 
                    passwordData: { oldPassword: oldPassword, newPassword: newPassword } 
                })
                .then((res) => console.log(res.data.message))
                .catch((err) => setError(err.response.data.message))
        }
    }

    return (
        <>
            <PrimarySearchAppBar />
            <Container sx={{ zIndex: 10 }}>
                <style>
                    {`
                        .css-10d9dml-MuiTabs-indicator {
                            background-color: green;
                        }
                    `}
                </style>
                <Box className={classes.frame}>
                    <Box className={classes.paper}>
                        <Box className={classes.paperLeft}>
                            <Avatar
                                className={classes.avatar}
                                alt='Remy Sharp'
                                src={avatar}
                            />
                            <Typography className={classes.nameUser} variant='h5'>
                                {fullname}
                            </Typography>
                            <Tabs
                                orientation='vertical'
                                variant='scrollable'
                                value={value}
                                onChange={handleChange}
                                aria-label='Vertical tabs example'
                                sx={{ borderRight: 1, borderColor: 'divider' }}
                            >
                                <Tab
                                    className={classes.tab}
                                    label='Profile'
                                    {...a11yProps(0)}
                                />
                                <Tab
                                    className={classes.tab}
                                    label='Password'
                                    {...a11yProps(1)}
                                />
                            </Tabs>
                        </Box>
                        <Box className={classes.paperRight}>
                            <TabPanel value={value} index={0}>
                                <Information {...{
                                    classes: classes,
                                    fullname: fullname,
                                    setFullname: setFullname,
                                    gender: gender,
                                    setGender: setGender,
                                    birthday: birthday,
                                    setBirthday: setBirthday,
                                    email: email,
                                    setEmail: setEmail,
                                    nickname: nickname,
                                    setNickname: setNickname
                                }} />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <ChangePassword {...{
                                    classes: classes,
                                    error: error,
                                    setOldPassword: setOldPassword,
                                    setNewPassword: setNewPassword,
                                    setConfirmNewPassword: setConfirmNewPassword,
                                    handleChangePassword: handleChangePassword
                                }} />
                            </TabPanel>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </>
    );
}

export default Profile
