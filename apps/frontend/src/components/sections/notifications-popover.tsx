import { useEffect, useState } from 'react';
import { Avatar, Badge, Box, Divider, IconButton, List, ListItemAvatar, ListItemButton, ListItemText, ListSubheader, Popover, Tooltip, Typography } from '@mui/material';
import { NotificationsNoneOutlined } from '@mui/icons-material';
import { fToNow } from '../../utils/format-time';
import Iconify from '../admin/iconify/iconify';
import Scrollbar from '../scrollbar/scrollbar';
import AddIcon from '../../assets/icons/notification/ic-notification-add.svg';
import MessageIcon from '../../assets/icons/notification/ic-notification-chat.svg';
import { useGlobalContext } from '../../context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import requestApi from '../../hooks/useApi';

const NotificationItem: React.FC<any> = ({ notification }) => {
    const { avatar, title } = renderContent(notification);
    const navigateTo = useNavigate();

    const handleClickNotificationItem = () => {
        const docId = notification.docId;
        navigateTo(`/document/${btoa(docId)}`)
    };

    return (
        <ListItemButton
            sx={{
                py: 1.5,
                px: 2.5,
                mt: '1px',
                ...(!notification.isReaded && {
                    bgcolor: 'rgba(46, 125, 50, 0.16)',
                }),
            }}
            onClick={handleClickNotificationItem}
        >
            <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'rgba(46, 125, 50, 0.1)' }}>{avatar}</Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={title}
                secondary={
                    <Typography
                        variant='caption'
                        sx={{
                            mt: 0.5,
                            display: 'flex',
                            alignItems: 'center',
                            color: 'text.disabled',
                        }}
                    >
                        <Iconify icon='eva:clock-outline' sx={{ mr: 0.5, width: 16, height: 16 }} />
                        {fToNow(notification.createdAt)}
                    </Typography>
                }
            />
        </ListItemButton>
    );
}

// ----------------------------------------------------------------------

function renderContent(notification: any) {
    const title = (
        <Typography variant='subtitle2'>
            {notification.title}
            <Typography component='span' variant='body2' sx={{ color: 'text.secondary' }}>
                &nbsp; {notification.description}
            </Typography>
        </Typography>
    );

    if (notification.type === 'add') {
        return {
            avatar: <img alt={notification.title} src={AddIcon} />,
            title,
        };
    } else if (notification.type === 'message') {
        return {
            avatar: <img alt={notification.title} src={MessageIcon} />,
            title,
        };
    }

    return {
        avatar: notification.avatar ? <img alt={notification.title} src={notification.avatar} /> : null,
        title,
    };
}

const NotificationsPopover = () => {
    const { notification_url } = useGlobalContext();
    const [open, setOpen] = useState(null);
    const [notifications, setNotifications] = useState<any[]>([]);
    
    useEffect(() => {
        requestApi(`${notification_url}/get-notifications`, 'get')
            .then(res => {
                setNotifications(res.data);
            })
            .catch()
    }, []);

    const totalUnRead = notifications.filter((item: any) => item.isReaded === false).length;

    const handleMarkAllAsRead = () => {
        requestApi(`${notification_url}/readed`, 'put', [])
            .then(() => {
                setNotifications(
                    notifications.map((notification) => ({
                        ...notification,
                        isReaded: true,
                    }))
                );
            })
            .catch(() => console.log('Error in read notifications!'))
    };

    const handleOpen = (event: any) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
        handleMarkAllAsRead();
    };

    return (
        <>
            <style>
                {`
                    .simplebar-placeholder {
                        display: none
                    }
                `}
            </style>
            <IconButton color={open ? 'success' : 'inherit'} onClick={handleOpen}>
                <Badge badgeContent={totalUnRead} color='error'>
                    <NotificationsNoneOutlined />
                </Badge>
            </IconButton>

            <Popover
                open={!!open}
                anchorEl={open}
                onClose={handleClose}
                disableScrollLock={true}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        mt: 2,
                        ml: 0.75,
                        width: 360,
                    },
                }}
                sx={{ maxHeight: '500px'}}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant='h6'>Notifications</Typography>
                        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                            You have {totalUnRead} unread messages
                        </Typography>
                    </Box>

                    {totalUnRead > 0 && (
                        <Tooltip title=' Mark all as read'>
                            <IconButton color='success'>
                                <Iconify icon='eva:done-all-fill' />
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
                    <List
                        disablePadding
                        subheader={
                            <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline', fontWeight: 'bold' }}>
                                New
                            </ListSubheader>
                        }
                    >
                        {notifications.map((notification: any) => {
                            if (!notification.isReaded)
                                return <NotificationItem key={notification._id} notification={notification} />
                        })}
                    </List>

                    <List
                        disablePadding
                        subheader={
                            <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline', fontWeight: 'bold' }}>
                                Before that
                            </ListSubheader>
                        }
                    >
                        {notifications.map((notification: any) => {
                            if (notification.isReaded)
                                return <NotificationItem key={notification._id} notification={notification} />
                        })}
                    </List>
                </Scrollbar>
            </Popover>
        </>
    );
}

export default NotificationsPopover