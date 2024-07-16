import { makeStyles } from 'tss-react/mui';
import BgImage from '../../assets/background-login.svg';     

const LoginStyles = makeStyles()(() => {
    return {
        imageBackground: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '80%',
            transform: 'translate(-50%, -50%)',
            backgroundRepeat: 'no-repeat !important',
            backgroundImage: `url(${BgImage})`,
            minHeight: '600px',
        },
        iconInput: {
            fontSize: '18px',
        },
        icon: {
            color: 'red',
            fontSize: '80px',
            margin: '0 0 20px 0',
        },
        paper: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '500px',
            textAlign: 'center',
            boxSizing: 'border-box',
            padding: '40px 60px',
            display: 'block',
            boxShadow:
                '0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.1)',
            borderRadius: '4px',
        },
        title: {
            color: 'black',
            fontWeight: 'bold',
            textAlign: 'center',
        },
        subtitle: {
            margin: '12px 0',
            fontWeight: '600',
            color: '#4a5073',
            textAlign: 'left',
            fontSize: '16px',
        },
        input: {
            width: '100%',
            margin: '10px auto',
            backgroundColor: 'white',
        },
        inputSignup: {
            width: '100%',
            margin: '10px auto',
            backgroundColor: 'white',
        },
        subTitleSignup: {
            fontWeight: '600',
            color: '#4a5073',
            textAlign: 'left',
            marginBottom: '10px',
        },
        btn: {
            width: '100%',
            marginTop: '20px',
            background: '#262b40',
            padding: '10px',
            borderRadius: '8px',
            fontWeight: 'bold',
            textTransform: 'none',
            '&:hover': {
                backgroundColor: '#37b85e',
                cursor: 'pointer',
            },
        },
        subtitleReset: {
            margin: '15px 0',
        },
        btnSend: {
            width: '100%',
            marginTop: '10px',
            background: '#37b85e',
            padding: '10px',
            textTransform: 'none',
            '&:hover': {
                backgroundColor: '#20c95b',
                cursor: 'pointer',
            },
            fontWeight: 'bold',
        },
        number: {
            border: '1px solid #ededed',
            borderRadius: '5px',
            width: '10px',
            height: '10px',
            padding: '10px',
        },
        frameRemember: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '20px',
        },
        remember: {
            display: 'flex',
            alignItems: 'center',
        },
        google: {
            display: 'flex',
            justifyContent: 'center',
        },
        textLoginWith: {
            margin: '20px',
            textAlign: 'center',
        },
        link: {
            textAlign: 'center',
            marginTop: '30px',
            color: '#66799e !important',
        },
    };
});

export default LoginStyles
