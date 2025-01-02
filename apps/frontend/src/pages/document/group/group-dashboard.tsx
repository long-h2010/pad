import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalContext } from '../../../context';
import axios from 'axios';
import _, { debounce } from 'lodash';
import { Box, Typography, Button, Dialog, DialogTitle, DialogActions, DialogContent, SelectChangeEvent, Select, MenuItem } from '@mui/material';
import { Add } from '@mui/icons-material';
import GroupStyles from '../../../assets/styles/group';
import ListUserSearched from './list-user';
import RoleOfUser from '../../../components/user/users-role';
import SearchUser from './search-user';

function UsersGroup() {
    const token = localStorage.getItem('token');
    const { classes } = GroupStyles();
    const { id } = useParams();
    const docId = atob(id as string);
    const { doc_url, user_url, notification_url, setShowAlert } = useGlobalContext();
    const [open, setOpen] = useState(false);
    const [owner, setOwner] = useState<any>({});
    const [writers, setWriters] = useState<any[]>([]);
    const [readers, setReaders] = useState<any[]>([]);
    const [ownerTemp, setOwnerTemp] = useState([]);
    const [writersTemp, setWritersTemp] = useState<any[]>([]);
    const [readersTemp, setReadersTemp] = useState<any[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [listSearch, setListSearch] = useState<any>([]);
    const [listSendNotification, setListSendNotification] = useState<any[]>([]);
    const [listUserSearched, setListUserSearched] = useState([]);
    const [role, setRole] = useState('writers');
    const [userRole, setUserRole] = useState('reader');

    const getUser = () => {
        axios
            .get(`${doc_url}/get-list-user/${docId}`)
            .then((res) => {
                setOwner(res.data.owner);
                setWriters(res.data.writers);
                setReaders(res.data.readers);
            })
            .catch((err) => {
                console.log('Error when get user data: ', err);
            })
    };

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        axios
            .get(`${doc_url}/${docId}/get-role`, {
                headers: { authorization: `Bearer ${token}` },
            })
            .then((res) => setUserRole(res.data))
            .catch((err) => console.log(err))
    }, []);

    const findUser = useCallback(
        debounce((value) => {
            if (value)
                axios
                    .get(`${user_url}/get-users/${value}`)
                    .then((res) => {
                        const data = res.data;
                        const nicknames = [owner, ...writers, ...readers].map((user: any) => user.nickname);
                        setListSearch(data.filter((user: any) => !nicknames.includes(user.nickname)));
                    })
                    .catch((err) => {
                        console.log('Error when find user: ', err);
                    })
            else setListSearch([]);
        }, 500),
        []
    );

    useEffect(() => {
        findUser(searchValue);
    }, [searchValue, findUser]);

    const handleClickSearchItem = (user: any) => {
        const nickname = listUserSearched.filter((u: any) => u.nickname === user.nickname);
        if (nickname.length > 0) return;
        else setListUserSearched([...listUserSearched, user] as any);
    };

    const handleDeleteSearchItem = (nickname: string) => {
        setListUserSearched(listUserSearched.filter((user: any) => user.nickname !== nickname));
    };

    const handleChangeRole = (e: SelectChangeEvent<typeof role>) => {
        setRole(e.target.value);
    };

    const handleSendNotification = (users: string[]) => {
        axios
            .post(`${notification_url}/send-notification`, {
                Authorization: `Bearer ${token}`,
                data: { to: users, docId: docId, type: 'add' },
            })
            .then((res) => console.log(res.data.message))
            .catch((err) => console.log(err))
    };

    const handleAddUser = () => {
        if (role === 'writers') setWriters([...writers, ...listUserSearched]);
        else if (role === 'readers') setReaders([...readers, ...listUserSearched]);

        setListSendNotification([...listSendNotification, ...listUserSearched]);
        setListUserSearched([]);
    };

    const updateRole = () => {
        const nicknames = {
            owner: owner.nickname,
            writers: writers.map((writer: any) => {
                return writer.nickname;
            }),
            readers: readers.map((reader: any) => {
                return reader.nickname;
            }),
        };

        axios
            .put(`${doc_url}/${docId}/update-role`, { nicknames: nicknames })
            .then((res) => console.log(res.data.message))
            .catch((err) => console.log(err))

        setShowAlert(true);
    };

    const handleOnDrag = (e: React.DragEvent, widget: any) => {
        e.dataTransfer.setData('widget', JSON.stringify(widget));
    };

    const handleOnDrop = (e: React.DragEvent, targetRole: string) => {
        const widget: any = JSON.parse(e.dataTransfer.getData('widget'));

        if (widget.nickname === owner.nickname) return;
        setWriters(writers.filter((writer: any) => writer.nickname !== widget.nickname));
        setReaders(readers.filter((reader: any) => reader.nickname !== widget.nickname));

        if (targetRole === 'owner') {
            setWriters([
                ...writers.filter((writer: any) => writer.nickname !== widget.nickname),
                owner,
            ]);
            setOwner(widget);
        } else if (targetRole === 'writer') {
            setWriters(_.uniqWith([...writers, widget], _.isEqual));
        } else if (targetRole === 'reader') { 
            setReaders(_.uniqWith([...readers, widget], _.isEqual));
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDeleteUser = (nickname: string) => {
        setWriters(writers.filter((writer: any) => writer.nickname !== nickname));
        setReaders(readers.filter((reader: any) => reader.nickname !== nickname));
    };

    const handleOpen = () => {
        if (userRole === 'owner') {
            setOwnerTemp(owner);
            setWritersTemp(writers);
            setReadersTemp(readers);
            setOpen(true);
        }
    };

    const handleClose = () => setOpen(false);

    const handleSave = () => {
        if (listSendNotification.length > 0)
            handleSendNotification(listSendNotification.map((user: any) => user.nickname));

        updateRole();
        handleClose();
    };

    const handleCancel = () => {
        setOwner(ownerTemp);
        setWriters(writersTemp);
        setReaders(readersTemp);
        handleClose();
    };

    return (
        <Box className={classes.boxContainer}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                    variant='h6'
                    sx={{ fontSize: '20px !important' }}
                    className={classes.headerTitle}
                >
                    Thêm người dùng mới
                </Typography>
                <Button sx={{ color: 'green' }} onClick={handleOpen}>
                    <Add />
                </Button>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>
                    <Typography className={classes.headerTitle}>CHIA SẺ TÀI LIỆU</Typography>
                </DialogTitle>
                <DialogContent sx={{ display: 'flex' }}>
                    <SearchUser
                        {...{
                            listSearch,
                            handleClickSearchItem,
                            setSearchValue,
                            listUserSearched,
                            handleDeleteSearchItem,
                        }}
                    />
                    <Select
                        labelId='demo-simple-select-helper-label'
                        id='demo-simple-select-helper'
                        value={role}
                        color='success'
                        className={classes.selectRule}
                        onChange={handleChangeRole}
                    >
                        <MenuItem value='writers'>Người chỉnh sửa</MenuItem>
                        <MenuItem value='readers'>Người xem</MenuItem>
                    </Select>
                    <Button variant='outlined' color='success' onClick={handleAddUser}>
                        Thêm
                    </Button>
                </DialogContent>
                <DialogContent>
                    <RoleOfUser
                        {...{
                            classes,
                            title: 'Người sở hữu',
                            role: 'owner',
                            users: [owner],
                            handleOnDrop,
                            handleDragOver,
                            handleOnDrag,
                            handleDeleteUser,
                        }}
                    />
                    <RoleOfUser
                        {...{
                            classes,
                            title: 'Người chỉnh sửa',
                            role: 'writer',
                            users: writers,
                            handleOnDrop,
                            handleDragOver,
                            handleOnDrag,
                            handleDeleteUser,
                        }}
                    />
                    <RoleOfUser
                        {...{
                            classes,
                            title: 'Người xem',
                            role: 'reader',
                            users: readers,
                            handleOnDrop,
                            handleDragOver,
                            handleOnDrag,
                            handleDeleteUser,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color='success' onClick={handleSave}>
                        Cập nhật
                    </Button>
                    <Button color='success' onClick={handleCancel} autoFocus>
                        Hủy
                    </Button>
                </DialogActions>
            </Dialog>
            <ListUserSearched {...{ owner, writers, readers }} />
        </Box>
    );
}

export default UsersGroup
