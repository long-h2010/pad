import { useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useGlobalContext } from '../context';

const useStyles = makeStyles()(() => {
    return {
        alert: {
            position: 'fixed',
            width: '600px',
            top: '-100px',
            left: '50%',
            border: '1px solid green',
            transform: 'translateX(-50%)',
            transition: 'top 0.5s ease-in-out',
            '&.show': {
                top: '140px'
            }
        }
    }
});

const AlertMessage: React.FC<any> = () => {
    const { showAlert, setShowAlert, alertMessage } = useGlobalContext();
    const [alertClass, setAlertClass] = useState('');
    const { classes } = useStyles();

    useEffect(() => {
        if (showAlert) {
            setAlertClass('show');
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 3000);
            return () => clearTimeout(timer);
        } else {
            setAlertClass('');
        }
    }, [showAlert])

    return (
        <>
            <Alert className={`${classes.alert} ${alertClass}`} severity='success'>{alertMessage}</Alert>
        </>
    );
}

export default AlertMessage