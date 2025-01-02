import { makeStyles } from 'tss-react/mui';

const ChatStyles = makeStyles()(() => {
    return {
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
            '--Textarea-focusedHighlight': 'green !important',
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

export default ChatStyles