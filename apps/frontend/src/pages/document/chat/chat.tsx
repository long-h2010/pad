import { MessageLeft, MessageRight } from '../../../components/user/message';
import { useGlobalContext } from '../../../context';
import { Box, Button, Container, Divider, Typography } from '@mui/material';
import { CameraAlt, Close, Send } from '@mui/icons-material';
import { Textarea } from '@mui/joy';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import React from 'react';
import moment from 'moment';
import { format } from 'date-fns';
import { socket } from '../../../socket';
import ChatStyles from '../../../assets/styles/chat';


function Chat(this: any) {
    const token = localStorage.getItem('token');
    const { id } = useParams();
    const docId = atob(id as string);
    const { chat_url, notification_url } = useGlobalContext();
    const { classes } = ChatStyles();
    const { openDrawer, setOpenDrawer } = useGlobalContext();
    const [messages, setMessages] = useState({});
    const [message, setMessage] = useState<string>('');
    const decoded: any = jwtDecode(token as string);
    let lastDate = '';

    useEffect(() => {
        axios
            .get(`${chat_url}/${docId}`)
            .then((res) => {
                if (res.data)
                    setMessages(res.data);
            })
            .catch((err) => {
                console.log('Error when retrieving chat data: ', err);
            })
    }, []);

    useEffect(() => {
        socket.on('send', (data) => {
            setMessages(data);
        });

        return () => {
            socket.off('send');
        };
    }, []);

    const handleSendNotification = () => {
        axios
            .post(`${notification_url}/send-notification`, { 
                Authorization: `Bearer ${token}`,
                data: { docId: docId, type: 'message' }
            })
            .then((res) => console.log(res.data.message))
            .catch((err) => console.log(err))
    };

    const handleSendMessage = (message: string) => {
        if (Object.keys(messages).length === 0)
            axios
                .post(`${chat_url}/${docId}`, {
                    Authorization: `Bearer ${token}`,
                    message: message,
                })
                .then((res) => {
                    socket.emit('send', { data: res.data });
                })
                .catch((err) => console.log('Error when send message: ', err))
        else
            axios
                .put(`${chat_url}/${docId}`, {
                    Authorization: `Bearer ${token}`,
                    message: message,
                })
                .then((res) => {
                    socket.emit('send', { data: res.data });
                })
                .catch((err) => console.log('Error when send message: ', err))

        setMessage('');
        handleSendNotification();
    };

    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <Container className={classes.containerChat}>
            <Box className={classes.container}>
                <Box className={classes.headerChat}>
                    <Box>
                        <Typography className={classes.headerTitle} variant='h5'>
                            CHAT
                        </Typography>
                    </Box>
                    <Box>
                        <Button
                            className={classes.closeBtn}
                            onClick={() => setOpenDrawer(!openDrawer)}
                        >
                            <Close />
                        </Button>
                    </Box>
                </Box>
                <Divider className={classes.divider} />
                <Box className={classes.bodyChat}>
                    <Box className={classes.contentChat}>
                        {Object.keys(messages).length !== 0 ? (
                            (messages as any).map((message: any) => {
                                const messageDate = moment(message.time).format('DD-MM-yyyy');
                                const showDate = messageDate !== lastDate;
                                lastDate = messageDate;
                                return (
                                    <React.Fragment key={message.id}>
                                        {showDate && (
                                            <Typography className={classes.dateFormat}>
                                                {format(message.time, `d 'thg' MMMM, yyyy`)}
                                            </Typography>
                                        )}
                                        {message.userId === decoded.id ? (
                                            <MessageRight key={message.id} {...message} />
                                        ) : (
                                            <MessageLeft key={message.id} {...message} />
                                        )}
                                    </React.Fragment>
                                );
                            })
                        ) : (
                            <></>
                        )}
                        <div ref={messagesEndRef} />
                    </Box>
                </Box>
                <Box className={classes.footerChat}>
                    <Button className={classes.cameraBtn}>
                        <CameraAlt />
                    </Button>
                    <Textarea
                        className={classes.messageInput}
                        name='Primary'
                        placeholder='Type in here…'
                        variant='outlined'
                        maxRows={8}
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.shiftKey === false) {
                                e.preventDefault();
                                handleSendMessage(message);
                            }
                        }}
                    />
                    <Button className={classes.sendBtn} onClick={handleSendMessage.bind(this, message)}>
                        <Send />
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default Chat
