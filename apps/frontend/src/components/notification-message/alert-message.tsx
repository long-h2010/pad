import { useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import { useGlobalContext } from '../../context';

type Severity = 'error' | 'success' | 'info' | 'warning' | undefined;

const AlertMessage: React.FC<any> = () => {
    const { showAlert, setShowAlert, alertInfor } = useGlobalContext();
    const [alertClass, setAlertClass] = useState('');
    const [color, setColor] = useState('green');

    const severity = (alertInfor[0] || undefined) as Severity;
    const message = alertInfor[1];

    useEffect(() => {
        if ((severity as string) === 'error') setColor('red');
        else if ((severity as string) === 'success') setColor('green');
    }, [severity])

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

    return (
        <>
            <Alert
                sx={{
                    position: 'fixed',
                    width: '600px',
                    top: '-100px',
                    left: '50%',
                    border: `1px solid ${color}`,
                    transform: 'translateX(-50%)',
                    transition: 'top 0.5s ease-in-out',
                    '&.show': {
                        top: '140px',
                    },
                }}
                className={alertClass}
                severity={severity}
            >
                {message}
            </Alert>
        </>
    );
};

export default AlertMessage
