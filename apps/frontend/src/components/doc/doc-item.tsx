import { format } from 'date-fns';
import { Box, Button, Card, CardContent, CardMedia, Chip, IconButton, ListItemIcon, Menu, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { Add, DeleteOutline, DriveFileRenameOutline, MoreVert, OpenInNew, SellOutlined, SettingsBackupRestore } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import { useState } from 'react';
import DialogCustom from '../sections/dialog';
import BlankImg from '/images/blank-img.png';
import GroupsIcon from "@mui/icons-material/Groups";

const ITEM_HEIGHT = 48;
const LongMenu: React.FC<any> = (props) => {
    const { _id, name, handleUpdateDocName, handleDeleteDoc } = props;
    const [newName, setNewName] = useState<string>(name);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [openDialogRename, setOpenDialogRename] = useState(false);
    const [openDialogDelete, setOpenDialogDelete] = useState(false);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setOpenDialogRename(false);
        setOpenDialogDelete(false);
    };

    const handleOpenDialogRename = () => {
        setAnchorEl(null);
        setOpenDialogRename(true);
    };

    const handleOpenDialogDelete = () => {
        setAnchorEl(null);
        setOpenDialogDelete(true);
    };

    const handleClickOk = () => {
        handleUpdateDocName(_id, newName);
        handleClose();
    };

    const handleClickDelete = () => {
        handleDeleteDoc(_id);
        handleClose();
    };

    return (
        <div>
            <IconButton
                aria-label='more'
                id='long-button'
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup='true'
                onClick={handleClick}
            >
                <MoreVert sx={{ color: 'black' }} />
            </IconButton>
            <Menu
                id='long-menu'
                MenuListProps={{ 'aria-labelledby': 'long-button' }}
                anchorEl={anchorEl}
                open={open}
                disableScrollLock={true}
                aria-hidden='false'
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                <MenuItem onClick={handleOpenDialogRename}>
                    <ListItemIcon>
                        <DriveFileRenameOutline />
                    </ListItemIcon>
                    <Typography variant='body2' color='black'>
                        Đổi tên
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleOpenDialogDelete}>
                    <ListItemIcon>
                        <DeleteOutline />
                    </ListItemIcon>
                    <Typography variant='body2' color='black'>
                        Xóa
                    </Typography>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        window.open(`/document/${btoa(_id)}`);
                        handleClose();
                    }}
                >
                    <ListItemIcon>
                        <OpenInNew />
                    </ListItemIcon>
                    <Typography variant='body2' color='black'>
                        Mở trong thẻ mới
                    </Typography>
                </MenuItem>
            </Menu>
            <DialogCustom
                open={openDialogRename}
                handleClose={handleClose}
                title='ĐỔI TÊN TÀI LIỆU'
                button={true}
                content={
                    <>
                        <Typography variant='body2' sx={{ mb: 2 }}>
                            Nhập tên mới:
                        </Typography>
                        <TextField
                            id='outlined-basic'
                            placeholder='Type here...'
                            variant='outlined'
                            color='success'
                            size='small'
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            sx={{ width: '400px' }}
                        />
                    </>
                }
                onOk={handleClickOk}
            />
            <DialogCustom
                open={openDialogDelete}
                handleClose={handleClose}
                title='XÓA TÀI LIỆU'
                button={true}
                content={
                    <Typography variant='subtitle1' sx={{ maxWidth: '400px', minWidth: '300px' }}>
                        Bạn có chắc muốn xóa tài liệu <b>{name}</b> không?
                    </Typography>
                }
                type='error'
                onOk={handleClickDelete}
            />
        </div>
    );
};

const DocItemStyle = makeStyles()(() => {
    return {
        docCard: {
            width: '100%',
            border: '1px solid #dfe1e5',
            boxShadow: 'none',
            cursor: 'pointer',
            overflow: 'visible',
        },
        docAction: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        docName: {
            fontWeight: 700,
            color: 'black',
            wordBreak: 'break-word',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
    };
});

const DocItem: React.FC<any> = (props) => {
    const { document, isDeleted, handleUpdateDocName, handleUpdateTags, handleDeleteDoc, restoreDocument } = props;
    const { _id, name, updatedAt, tags, thumbnail } = document;
    const id = btoa(_id);
    const date = format(updatedAt, `d 'thg' MMMM, yyyy`);
    const { classes } = DocItemStyle();
    const [newTags, setNewTags] = useState('');
    const [openTag, setOpenTag] = useState(false);

    const handleOpenTag = () => setOpenTag(true);

    const handleCloseTag = () => setOpenTag(false);

    return (
        <Card key={_id} className={classes.docCard}>
            <Link to={`/document/${id}`}>
                <CardMedia
                    component='img'
                    height='150'
                    image={thumbnail || BlankImg}
                    alt='thumbnail'
                />
            </Link>
            <hr style={{ margin: 0 }} />
            <CardContent>
                <Link to={`/document/${id}`}>
                    <Typography variant='body2' color='text.secondary' className={classes.docName}>
                        {name}
                    </Typography>
                </Link>
                <Box className={classes.docAction}>
                    <Box>
                        <Typography
                            variant='body2'
                            color='text.secondary'
                            sx={{ display: 'inline' }}
                        >
                            {date}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        {isDeleted ? (
                            <IconButton onClick={() => restoreDocument(_id)}>
                                <SettingsBackupRestore />
                            </IconButton>
                        ) : (
                            <>
                                <IconButton
                                    onClick={handleOpenTag}
                                    sx={{
                                        color: 'black',
                                        position: 'relative',
                                        '&:hover .hoverBox': {
                                            display: 'inline',
                                        },
                                    }}
                                >
                                    <SellOutlined></SellOutlined>
                                    <Box
                                        className='hoverBox'
                                        sx={{
                                            display: 'none',
                                            position: 'absolute',
                                            top: 40,
                                            left: '30%',
                                        }}
                                    >
                                        <Stack
                                            direction='column'
                                            spacing={1}
                                            sx={{ width: 90, maxWidth: 'fit-content' }}
                                        >
                                            {tags.map((tag: string, index: number) => {
                                                return (
                                                    <Chip
                                                        key={index}
                                                        color='success'
                                                        label={'#' + tag}
                                                        size='small'
                                                        variant='outlined'
                                                    />
                                                );
                                            })}
                                        </Stack>
                                    </Box>
                                </IconButton>
                                <LongMenu
                                    {...{ _id, name, handleUpdateDocName, handleDeleteDoc }}
                                />
                                <DialogCustom
                                    open={openTag}
                                    handleClose={handleCloseTag}
                                    title='NHÃN DÁN'
                                    content={
                                        <Box sx={{ width: '240px' }}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    marginTop: '5px',
                                                    marginBottom: '20px',
                                                }}
                                            >
                                                <TextField
                                                    id='outlined-size-small'
                                                    size='small'
                                                    color='success'
                                                    placeholder='Thêm nhãn dán'
                                                    onChange={(e: any) =>
                                                        setNewTags(e.target.value)
                                                    }
                                                />
                                                <Button
                                                    color='success'
                                                    variant='outlined'
                                                    sx={{ p: '7px', marginLeft: '10px' }}
                                                    onClick={() => {
                                                        const tagsArr = [
                                                            ...new Set<string>([
                                                                ...tags,
                                                                ...newTags.split(','),
                                                            ]),
                                                        ];
                                                        handleUpdateTags(_id, tagsArr);
                                                        handleCloseTag();
                                                    }}
                                                >
                                                    <Add />
                                                </Button>
                                            </Box>
                                            {tags.length <= 0 && (
                                                <Box>Tài liệu không có nhãn dán</Box>
                                            )}
                                            {tags.length > 0 && (
                                                <Stack
                                                    direction='column'
                                                    spacing={1}
                                                    sx={{ width: 90, maxWidth: 'fit-content' }}
                                                >
                                                    {tags.map((tag: string, index: number) => {
                                                        return (
                                                            <Box
                                                                key={index}
                                                                sx={{
                                                                    width: '240px',
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    alignItems: 'center',
                                                                }}
                                                            >
                                                                <Chip
                                                                    key={index + 10}
                                                                    label={'#' + tag}
                                                                    size='small'
                                                                    variant='outlined'
                                                                    sx={{ padding: '10px' }}
                                                                />
                                                                <Box>
                                                                    <IconButton
                                                                        sx={{ color: 'black' }}
                                                                        onClick={() => {
                                                                            const newTagsArr =
                                                                                tags.filter(
                                                                                    (t: string) =>
                                                                                        t !== tag
                                                                                );
                                                                            handleUpdateTags(
                                                                                _id,
                                                                                newTagsArr
                                                                            );
                                                                        }}
                                                                    >
                                                                        <DeleteOutline />
                                                                    </IconButton>
                                                                </Box>
                                                            </Box>
                                                        );
                                                    })}
                                                </Stack>
                                            )}
                                        </Box>
                                    }
                                />
                            </>
                        )}
                    </Box>
                </Box>
                <Box sx={{display: "flex", alignItems: "center", height: "10px"}}>
                    <Typography variant="caption" sx={{fontStyle: "italic", paddingRight: "8px"}}>{document.isShared ? "Được chia sẻ với tôi" : ""}</Typography>
                    {document.isShared ? <GroupsIcon/>: ""}
                </Box>
            </CardContent>
        </Card>
    );
};

export default DocItem;
