import * as React from 'react';
import { format } from 'date-fns';
import { Box, Card, CardContent, CardMedia, Chip, IconButton, ListItemIcon, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { DeleteOutline, DriveFileRenameOutline, MoreVert, OpenInNew, SellOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';

interface DocProps {
    id: string;
    name: string;
    date: Date;
    tags: Array<string>;
}

const ITEM_HEIGHT = 48;
function LongMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
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
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <DriveFileRenameOutline />
                    </ListItemIcon>
                    <Typography variant='body2' color='black'>
                        Đổi tên
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <DeleteOutline />
                    </ListItemIcon>
                    <Typography variant='body2' color='black'>
                        Xóa
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <OpenInNew />
                    </ListItemIcon>
                    <Typography variant='body2' color='black'>
                        Mở trong thẻ mới
                    </Typography>
                </MenuItem>
            </Menu>
        </div>
    );
}

const DocItem: React.FC<DocProps> = ({ id, name, date, tags }) => {
    const formattedDate = format(date, `d 'thg' MMMM, yyyy`);

    return (
        <Card
            sx={{
                width: '100%',
                height: '100%',
                overflow: 'visible',
                border: '1px solid #dfe1e5',
                boxShadow: 'none',
                cursor: 'pointer'
            }}
            key={id}
        >
            <Link to={`/document/${id}`}>
                <CardMedia
                    component='img'
                    height='150'
                    image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDq-v28-P7k7Svx4P9cnXDuL9TNeuOuoZJQg&s'
                    alt='thumbnail'
                />
            </Link>
            <hr style={{ margin: 0 }} />
            <CardContent>
                <Link to={`/document/${id}`}>
                    <Typography
                        variant='body2'
                        color='text.secondary'
                        className='docs-name'
                        sx={{ fontWeight: 700, color: 'black' }}
                    >
                        {name}
                    </Typography>
                </Link>
                <div className='docs-action'>
                    <div>
                        <Typography
                            variant='body2'
                            color='text.secondary'
                            sx={{ display: 'inline' }}
                        >
                            {formattedDate}
                        </Typography>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <IconButton
                            sx={{
                                color: 'black',
                                '&:hover .hoverBox': {
                                    display: 'inline',
                                },
                            }}
                        >
                            <SellOutlined></SellOutlined>
                            <Box
                                className='hoverBox'
                                sx={{ display: 'none', position: 'absolute' }}
                            >
                                <Stack
                                    direction='column'
                                    spacing={1}
                                    sx={{ width: 90, maxWidth: 'fit-content' }}
                                >
                                    {tags.map((tag, index) => {
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
                        <LongMenu />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default DocItem
