import { useEffect, useState } from "react";
import useStyles from '../pages/login/styles';
import { Alert } from '@mui/material';

const AlertMessage = () => {
    const [showAlert, setShowAlert] = useState(false);
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
    }, [showAlert]);

    const toggleAlert = () => {
        setShowAlert(!showAlert);
    };
    return (
        <>
            <Alert className={`${classes.alert} ${alertClass}`} severity="success">This is a success Alert.</Alert>
            <button onClick={toggleAlert}>Toggle Alert</button>
        </>
    );
}

export default AlertMessage;