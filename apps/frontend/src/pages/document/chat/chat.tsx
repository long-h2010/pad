import { makeStyles } from 'tss-react/mui';
import { MessageLeft, MessageRight } from '../../../components/message';
import { useGlobalContext } from '../../../context';
import { Box, Button, Container, Divider, Typography } from '@mui/material';
import { CameraAlt, Close, Send } from '@mui/icons-material';
import { Textarea } from '@mui/joy';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import React from 'react';
import moment from 'moment';
import { format } from 'date-fns';

const useStyles = makeStyles()(() => {
    return {
        root: {
            '& .Mui-focused': {
                borderBottomColor: 'green', // Màu viền dưới khi focus
            },
        },
        containerChat: {
            width: '400px',
            boxShadow: 'none',
            borderRadius: '0',
            padding: '0 !important',
            height: '100%',
        },
        container: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        },
        headerChat: {
            display: 'flex',
            justifyContent: 'space-between',
            bottomBorder: '1px solid grey',
            margin: '5px 0',
            padding: '20px',
        },
        bodyChat: {
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            overflowY: 'auto',
            flex: 1,
        },
        contentChat: {
            marginTop: 'auto',
        },
        footerChat: {
            margin: '20px 0',
            display: 'flex',
            justifyContent: 'space-around',
        },
        messageInput: {
            width: '270px !important',
            position: 'relative',
        },
        closeBtn: {
            padding: 0,
            minWidth: '24px',
            color: 'green',
        },
        sendBtn: {
            color: 'grey',
            position: 'fixed',
            bottom: '20px',
            right: 0,
        },
        cameraBtn: {
            color: 'grey',
            position: 'fixed',
            bottom: '20px',
            right: '335px',
        },
        headerTitle: {
            color: 'green',
            fontWeight: 'bold',
        },
        divider: {
            opacity: 1,
        },
        dateFormat: {
            textAlign: 'center',
            color: 'grey',
            fontSize: '14px',
            margin: '10px 0',
        },
    };
});

function Chat() {
    const docId = useParams().id;
    const socket = io('http://localhost:3000');
    const { chat_url } = useGlobalContext();
    const { classes } = useStyles();
    const { openDrawer, setOpenDrawer } = useGlobalContext();
    const [messages, setMessages] = useState({});
    const [message, setMessage] = useState('');
    const token: string = localStorage.getItem('token') || '';
    const decoded: any = jwtDecode(token);
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
        socket.on('connect', () => {
            console.log('Connected');
        });

        socket.on('send', (data) => {
            setMessages(data);
        });

        return () => {
            socket.off('connect');
            socket.off('send');
        };
    }, []);

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
                .catch((err) => {
                    console.log('Error when send message: ', err);
                })
        else
            axios
                .put(`${chat_url}/${docId}`, {
                    Authorization: `Bearer ${token}`,
                    message: message,
                })
                .then((res) => {
                    socket.emit('send', { data: res.data });
                })
                .catch((err) => {
                    console.log('Error when send message: ', err);
                })

        setMessage('');
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
                        color='neutral'
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.shiftKey === false) {
                                e.preventDefault();
                                handleSendMessage(message);
                            }
                        }}
                    />
                    <Button className={classes.sendBtn}>
                        <Send />
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default Chat
