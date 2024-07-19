import { makeStyles } from 'tss-react/mui';

const ProfileStyles = makeStyles()(() => {
    return {
        frame: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100%',
            transform: 'translate(-50%, -50%)',
            minHeight: '500px',
        },
        paper: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '500px',
            boxSizing: 'border-box',
            display: 'block',
            borderRadius: '10px',
        },
        paperLeft: {
            float: 'left',
            width: '30%',
            height: '100%',
            backgroundColor: 'white',
            borderRadius: '10px 0 0 10px',
        },
        paperRight: {
            float: 'right',
            width: '70%',
            height: '100%',
            backgroundColor: 'white',
            borderRadius: '0 10px 10px 0',
            padding: '30px',
        },
        title: {
            color: 'black',
            fontWeight: 'bold',
            marginBottom: '40px',
        },
        avatar: {
            width: '140px',
            height: '140px',
            margin: '20px auto',
        },
        nameUser: {
            textAlign: 'center',
            fontWeight: 'bold',
            marginBottom: '30px',
        },
        tab: {
            color: 'black',
            '&.Mui-selected': {
                color: 'green',
                fontWeight: 'bold',
            },
        },
        subtitle: {
            margin: '10px 20px 10px 0',
            fontWeight: '600',
            color: 'green',
            textAlign: 'left',
            fontSize: '14px',
        },
        input: {
            width: '80%',
            backgroundColor: 'white',
            marginBottom: '15px',
            padding: '10px',
            borderRadius: '5px',
            borderColor: '#ededed',
        },
        fieldName: {
            display: 'flex',
            justifyContent: 'space-between',
        },
    };
})

export default ProfileStyles