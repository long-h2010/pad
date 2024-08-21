import React, { useEffect, useState } from 'react';
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
    const { user_url, cloud_url, error, setError } = useGlobalContext();
    const { classes } = ProfileStyles();
    const token = localStorage.getItem('token');
    const [value, setValue] = React.useState(0);
    const [avatar, setAvatar] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState('');
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
            .get(`${user_url}/`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                const user = res.data;
                setAvatarUrl(user.avatar)
                setFullname(user.name);
                setGender(user.gender);
                setBirthday(user.birthday ? user.birthday : undefined);
                // setBirthday(format(user.birthday, `dd:mm:yy`));
                setEmail(user.email);
                setNickname(user.nickname);
            })
            .catch((err) => console.log(err))
    }, [])

    const handleChangeTap = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleUpdateInfo = () => {
        const updateData = {
            name: fullname,
            gender: gender,
            birthday: birthday,
            email: email,
            nickname: nickname
        };

        axios
            .post(`${user_url}/update-information`, {
                Authorization: `Bearer ${token}`,
                updateData
            })
            .then((res) => console.log(res))
            .catch((err) => setError(err.response.data.message))
    };

    const handleUpdateAvatar = () => {
        const file = new FormData();
        file.append('avatar', avatar as any)
        console.log(file)

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
        };

        axios
            .post(`${cloud_url}/update-avatar`, file, config)
            .then((res) => console.log(res.data.message))
            .catch((err) => setError(err.response.data.message))
    }

    const handleChangePassword = () => {
        if (newPassword !== confirmNewPassword) {
            setError('New password and password confirm don\'t match!')
        } else {
            const passwordData: any = {
                oldPassword: oldPassword,
                newPassword: newPassword
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
                    passwordData
                })
                .then((res) => console.log(res.data.message))
                .catch((err) => setError(err.response.data.message))
        }
    };

    return (
        <>
            <PrimarySearchAppBar />
            <Container sx={{ zIndex: 10 }}>
                <style>
                    {`
                        .css-10d9dml-MuiTabs-indicator {
                            background-color: green;
                        }
                        .MuiTabs-scroller {
                            width: 100%
                        }
                    `}
                </style>
                <Box>
                    <Box className={classes.paper}>
                        <Box className={classes.paperLeft}>
                            <Avatar
                                className={classes.avatar}
                                alt='Remy Sharp'
                                src={avatarUrl}
                            />
                            <input type="file" onChange={(e: any) => setAvatar(e.target.files[0])} />
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
                                <Information {...{
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
                                    handleUpdateInfo: handleUpdateAvatar,
                                    error
                                }} />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <ChangePassword {...{
                                    setOldPassword,
                                    setNewPassword,
                                    setConfirmNewPassword,
                                    handleChangePassword,
                                    error
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
