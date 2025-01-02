import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Box, Container, IconButton, Tab, Tabs, Typography } from '@mui/material';
import { CameraAlt } from '@mui/icons-material';
import axios from 'axios';
import PrimarySearchAppBar from '../../components/sections/appbar';
import ChangePassword from './password';
import Information from './information';
import ProfileStyles from '../../assets/styles/profile';
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
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

function Profile() {
    const token = localStorage.getItem('token');
    const userAvatar = localStorage.getItem('avatar') as string;
    const { user_url, cloud_url, error, setError, setAlertInfor, setShowAlert } = useGlobalContext();
    const fileUploadRef = useRef(null);
    const { classes } = ProfileStyles();
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

    useEffect(() => {
        axios
            .get(`${user_url}/`, { headers: { authorization: `Bearer ${token}` } })
            .then((res) => {
                const user = res.data;
                setAvatar(userAvatar);
                setFullname(user.name);
                setGender(user.gender);
                setBirthday(user.birthday ? user.birthday : null);
                setEmail(user.email);
                setNickname(user.nickname);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleChangeTap = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleUpdateInfo = () => {
        const updateData = {
            name: fullname,
            gender: gender,
            birthday: birthday,
            email: email,
            nickname: nickname,
        };

        axios
            .post(`${user_url}/update-information`, {
                Authorization: `Bearer ${token}`,
                updateData,
            })
            .then((res) => {
                const data = res.data.message;
                setAlertInfor(['success', data]);
                setShowAlert(true);
            })
            .catch((err) => setError(err.response.data.message))
    };

    const handleUpdateAvatar = (image: any) => {
        if (image) {    
            const file = new FormData();
            file.append('avatar', image);

            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                }
            };

            axios
                .post(`${cloud_url}/update-avatar`, file, config)
                .then((res) => {
                    setAvatar(res.data.secure_url);
                    localStorage.setItem('avatar', res.data.secure_url);
                    setAlertInfor(['success', 'Update avatar successfully']);
                    setShowAlert(true);
                })
                .catch((err) => setError(err.response.data.message))
        }
    };

    const handleChangePassword = () => {
        if (newPassword !== confirmNewPassword) {
            setError('New password and password confirm don\'t match!');
        } else {
            const passwordData: any = {
                oldPassword: oldPassword,
                newPassword: newPassword,
            };

            for (let i in passwordData) {
                if (passwordData[i] === '') {
                    setError(`Please enter your ${i}`);
                    return;
                }
            }

            axios
                .post(`${user_url}/change-password`, {
                    Authorization: `Bearer ${token}`,
                    passwordData,
                })
                .then((res) => {
                    const data = res.data.message;
                    setAlertInfor(['success', data]);
                    setShowAlert(true);
                })
                .catch((err) => setError(err.response.data.message))
        }
    };

    useEffect(() => setError(''), [value, avatar, fullname, gender, birthday, 
        email, nickname, oldPassword, newPassword, confirmNewPassword]);

    return (
        <>
            <PrimarySearchAppBar />
            <Container sx={{ zIndex: 10 }}>
                <style>
                    {`
                        .css-10d9dml-MuiTabs-indicator { background-color: green }
                        .MuiTabs-scroller { width: 100% }
                    `}
                </style>
                <Box>
                    <Box className={classes.paper}>
                        <Box className={classes.paperLeft}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    '&:hover .camera-icon': {
                                        opacity: 1,
                                    },
                                    '&:hover [class*="Avatar"]': {
                                        backgroundColor: '#ecebed',
                                    },
                                }}
                                onClick={() => (fileUploadRef.current as any).click()}
                            >
                                <Avatar
                                    className={classes.avatar}
                                    alt='Avatar'
                                    sx={{ cursor: 'pointer' }}
                                    src={avatar}
                                />
                                <IconButton
                                    className='camera-icon'
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        opacity: 0,
                                        transition: 'opacity 0.3s ease',
                                        color: 'white',
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                        },
                                    }}
                                >
                                    <CameraAlt />
                                </IconButton>
                                <input
                                    type='file'
                                    onChange={(e: any) => handleUpdateAvatar(e.target.files[0])}
                                    hidden
                                    ref={fileUploadRef}
                                />
                            </Box>
                            <Typography className={classes.nameUser} variant='h5'>
                                {fullname}
                            </Typography>
                            <Tabs
                                orientation='vertical'
                                variant='scrollable'
                                value={value}
                                onChange={handleChangeTap}
                                aria-label='Vertical tabs example'
                                sx={{ alignItems: 'center' }}
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
                                <Information
                                    {...{
                                        fullname,
                                        setFullname,
                                        gender,
                                        setGender,
                                        birthday,
                                        setBirthday,
                                        email,
                                        setEmail,
                                        nickname,
                                        setNickname,
                                        handleUpdateInfo: handleUpdateInfo,
                                        error,
                                    }}
                                />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <ChangePassword
                                    {...{
                                        setOldPassword,
                                        setNewPassword,
                                        setConfirmNewPassword,
                                        handleChangePassword,
                                        error,
                                    }}
                                />
                            </TabPanel>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </>
    );
}

export default Profile
