import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalContext } from '../../../context';
import axios from 'axios';
import _, { debounce } from 'lodash';
import { Box, Typography, Button, Dialog, DialogTitle, DialogActions, DialogContent, SelectChangeEvent, Select, MenuItem } from '@mui/material';
import { Add } from '@mui/icons-material';
import GroupStyles from './style';
import ListUser from './list-user';
import RoleOfUser from '../../../components/users-role';
import SearchUser from './search-user';

function UsersGroup() {
    const { classes } = GroupStyles();
    const docId = useParams().id;
    const { doc_url, user_url, setShowAlert } = useGlobalContext();
    const [open, setOpen] = useState(false);
    const [owners, setOwners] = useState([]);
    const [writers, setWriters] = useState([]);
    const [readers, setReaders] = useState([]);
    const [ownersTemp, setOwnersTemp] = useState([]);
    const [writersTemp, setWritersTemp] = useState([]);
    const [readersTemp, setReadersTemp] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [listSearch, setListSearch] = useState([]);
    const [listUser, setListUser] = useState([]);
    const [role, setRole] = useState('owners');

    const getUser = () => {
        axios
            .get(`${doc_url}/get-list-user/${docId}`)
            .then((res) => {
                setOwners(res.data.owners);
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

    const findUser = useCallback(debounce((value) => {
        if (value)
            axios
                .get(`${user_url}/get-users/${value}`)
                .then((res) => {
                    const data = res.data;
                    const nicknames = [...owners, ...writers, ...readers].map((user: any) => user.nickname);
                    setListSearch(data.filter((user: any) => !nicknames.includes(user.nickname)));
                })
                .catch((err) => {
                    console.log('Error when find user: ', err);
                })
        else
            setListSearch([]);
    }, 500), []);

    useEffect(() => {
        findUser(searchValue);
    }, [searchValue, findUser]);

    const handleClickSearchItem = (user: any) => {
        const nickname = listUser.filter((u: any) => (u.nickname === user.nickname));
        if (nickname.length > 0)
            return;
        else
            setListUser(([...listUser, user]) as any);
    };

    const handleDeleteSearchItem = (nickname: string) => {
        setListUser(listUser.filter((user: any) => (user.nickname !== nickname)));
    };

    const handleChangeRole = (e: SelectChangeEvent<typeof role>) => {
        setRole(e.target.value);
    };

    const handleAddUser = () => {
        if (role === 'owners')
            setOwners([...owners, ...listUser]);
        else if (role === 'writers')
            setWriters([...writers, ...listUser]);
        else if (role === 'readers')
            setReaders([...readers, ...listUser]);

        setListUser([]);
    };

    const updateRole = () => {
        const nicknames = {
            owners: owners.map((owner: any) => {
                return owner.nickname;
            }),
            writers: writers.map((writer: any) => {
                return writer.nickname;
            }),
            readers: readers.map((reader: any) => {
                return reader.nickname;
            })
        };

        axios
            .put(`${doc_url}/${docId}/update-role`, { nicknames: nicknames })
            .then((res) => console.log(res.data.message))
            .catch((err) => console.log(err))

        setShowAlert(true);
    };

    const handleOnDrag = (e: React.DragEvent, widget: any) => {
        e.dataTransfer.setData('widget', JSON.stringify(widget));
        console.log(widget)
    };

    const handleOnDrop = (e: React.DragEvent, targetRole: string) => {
        const widget: any = JSON.parse(e.dataTransfer.getData('widget'));

        setOwners(owners.filter((owner: any) => (owner.nickname !== widget.nickname)));
        setWriters(writers.filter((writer: any) => (writer.nickname !== widget.nickname)));
        setReaders(readers.filter((reader: any) => (reader.nickname !== widget.nickname)));

        if (targetRole === 'owner')
            setOwners(_.uniqWith([...owners, widget], _.isEqual) as any);
        else if (targetRole === 'writer')
            setWriters(_.uniqWith([...writers, widget], _.isEqual) as any);
        else if (targetRole === 'reader')
            setReaders(_.uniqWith([...readers, widget], _.isEqual) as any);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDeleteUser = (nickname: string) => {
        setOwners(owners.filter((owner: any) => (owner.nickname !== nickname)));
        setWriters(writers.filter((writer: any) => (writer.nickname !== nickname)));
        setReaders(readers.filter((reader: any) => (reader.nickname !== nickname)));
    };

    const handleOpen = () => {
        setOwnersTemp(owners);
        setWritersTemp(writers);
        setReadersTemp(readers);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleSave = () => {
        updateRole();
        handleClose();
    };

    const handleCancel = () => {
        setOwners(ownersTemp);
        setWriters(writersTemp);
        setReaders(readersTemp);
        handleClose();
    };

    return (
        <Box className={classes.boxContainer}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h6' sx={{fontSize: "20px !important"}} className={classes.headerTitle}>
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
                    <Typography className={classes.headerTitle}>
                        CHIA SẺ TÀI LIỆU
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{ display: 'flex' }}>
                    <SearchUser {...{ listSearch, handleClickSearchItem, setSearchValue, listUser, handleDeleteSearchItem }} />
                    <Select
                        labelId='demo-simple-select-helper-label'
                        id='demo-simple-select-helper'
                        value={role}
                        className={classes.selectRule}
                        onChange={handleChangeRole}
                    >
                        <MenuItem value='owners'>Người sở hữu</MenuItem>
                        <MenuItem value='writers'>Người chỉnh sửa</MenuItem>
                        <MenuItem value='readers'>Người xem</MenuItem>
                    </Select>
                    <Button variant='outlined' color='success' onClick={handleAddUser}>
                        Thêm
                    </Button>
                </DialogContent>
                <DialogContent>
                    <RoleOfUser {...{ classes, title: 'Người sở hữu', role: 'owner', users: owners, handleOnDrop, handleDragOver, handleOnDrag, handleDeleteUser }} />
                    <RoleOfUser {...{ classes, title: 'Người chỉnh sửa', role: 'writer', users: writers, handleOnDrop, handleDragOver, handleOnDrag, handleDeleteUser }} />
                    <RoleOfUser {...{ classes, title: 'Người xem', role: 'reader', users: readers, handleOnDrop, handleDragOver, handleOnDrag, handleDeleteUser }} />
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
            <ListUser {...{ owners: owners, writers: writers, readers: readers }} />
        </Box>
    );
}

export default UsersGroup;