import { makeStyles } from 'tss-react/mui';
import BgImage from '../../assets/background-login.svg';     

const LoginStyles = makeStyles()(() => {
    return {
        imageBackground: {
            position: 'absolute',
            top: '50%',
            left: '50%',
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
            color: 'rgb(38, 43, 64)',
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
        frameRemember: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '20px',
        },
        condition: {
            display: 'flex',
            alignItems: 'center',
        },
        checkbox: {
            paddingLeft: 0,
            color: 'grey',
            '&.Mui-checked': {
                color: 'rgb(38, 43, 64)',
            },
        },
        google: {
            display: 'flex',
            justifyContent: 'center',
        },
        textLoginWith: {
            margin: '20px',
            textAlign: 'center',
        },
        boxLink: {
            textAlign: 'center',
            marginTop: '30px',
            color: '#66799e !important',
        },
        link: {
            color: '#66799e', 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center" 
        }
    };
});

export default LoginStyles
