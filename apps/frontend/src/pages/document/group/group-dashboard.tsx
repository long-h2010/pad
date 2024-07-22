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
    const { doc_url, user_url } = useGlobalContext();
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

    useEffect(() => {
        axios
            .get(`${doc_url}/get-list-user/${docId}`)
            .then((res) => {
                setOwners(res.data.owners);
                setWriters(res.data.writers);
                setReaders(res.data.readers);
            })
            .catch((err) => {
                console.log('Error when retrieving documents data: ', err);
            })
    }, []);

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
            }),
        };

        axios
            .put(`${doc_url}/${docId}/update-role`, { nicknames: nicknames })
            .then((res) => console.log(res.data.message))
            .catch((err) => console.log(err));
    };

    const handleOnDrag = (e: React.DragEvent, widget: any) => {
        e.dataTransfer.setData('widget', JSON.stringify(widget));
    };

    const handleOnDrop = (e: React.DragEvent, targetRole: string) => {
        const widget: any = JSON.parse(e.dataTransfer.getData('widget'));

        setOwners(owners.filter((owner) => !_.isEqual(owner, widget)));
        setWriters(writers.filter((writer) => !_.isEqual(writer, widget)));
        setReaders(readers.filter((reader) => !_.isEqual(reader, widget)));

        if (targetRole === 'owner') {
            setOwners(_.uniqWith([...owners, widget], _.isEqual) as any);
        } else if (targetRole === 'writer') {
            setWriters(_.uniqWith([...writers, widget], _.isEqual) as any);
        } else if (targetRole === 'reader') {
            setReaders(_.uniqWith([...readers, widget], _.isEqual) as any);
        }
    };

    function handleDragOver(e: React.DragEvent) {
        e.preventDefault();
    }

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

    const findUser = useCallback(debounce((value) => {
        if (value)
            axios
                .get(`${user_url}/get-users/${value}`)
                .then((res) => {
                    setListSearch(res.data);
                })
                .catch((err) => {
                    console.log('Error when retrieving users data: ', err);
                })
        else
            setListSearch([]);
    }, 500), []);

    useEffect(() => {
        findUser(searchValue);
    }, [searchValue, findUser]);

    const handleClickSearchItem = (user: any) => {
        setListUser(_.uniqWith([...listUser, user]) as any);
        console.log(listUser)
    };

    const [age, setAge] = useState<string | number>('owner');

    const handleChangeRole = (event: SelectChangeEvent<typeof age>) => {
        setAge(event.target.value);
    };

    const handleAddUser = () => {

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
                    <SearchUser {...{ listSearch, handleClickSearchItem, setSearchValue, listUser }} />
                    {/* <SearchForm searchValue={searchValue} setSearchValue={setSearchValue} />
                            <List className={classes.listUser} hidden={searchValue === '' || listSearch.length === 0} >
                                {listSearch.map((user: any, index: number) => {
                                    return user ? <User key={index} onClick={handleClickSearchItem} {...{ avatar: user.avatar, name: user.name, nickname: user.nickname }} /> : <></>
                                })}
                            </List> */}
                    <Select
                        labelId='demo-simple-select-helper-label'
                        id='demo-simple-select-helper'
                        value={age}
                        className={classes.selectRule}
                        onChange={handleChangeRole}
                    >
                        <MenuItem value='owner'>Người sở hữu</MenuItem>
                        <MenuItem value='writer'>Người chỉnh sửa</MenuItem>
                        <MenuItem value='reader'>Người xem</MenuItem>
                    </Select>
                    <Button variant='outlined' sx={{height: "56px"}} color='success' onClick={handleAddUser}>
                        Thêm
                    </Button>
                </DialogContent>
                <DialogContent>
                    <RoleOfUser {...{ title: 'Người sở hữu', role: 'owner', users: owners, classes,  handleOnDrop, handleDragOver, handleOnDrag }} />
                    <RoleOfUser {...{ title: 'Người chỉnh sửa', role: 'writer', users: writers, classes, handleOnDrop, handleDragOver, handleOnDrag }} />
                    <RoleOfUser {...{ title: 'Người xem', role: 'reader', users: readers, classes, handleOnDrop, handleDragOver, handleOnDrag }} />
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