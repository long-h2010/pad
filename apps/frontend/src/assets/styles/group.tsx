import { makeStyles } from 'tss-react/mui';

const GroupStyles = makeStyles()(() => {
    return {
        headerTitle: {
            color: '#106b1f',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            fontSize: '25px',
        },
        boxContainer: {
            width: 360,
            height: 'fit-content',
            padding: '16px',
            bgcolor: 'background.paper',
        },
        boxRule: {
            display: 'flex',
            minHeight: 50,
            maxHeight: 'fit-content',
            alignItems: 'center',
            paddingBottom: 1,
            margin: '0 10px',
        },
        listUser: {
            width: 250,
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
            position: 'absolute',
            zIndex: 1,
            top: 130,
            left: 24,
            backgroundColor: 'white',
        },
        avatarUser: {
            width: '30px',
            height: '30px',
        },
        selectRule: {
            width: '180px',
            marginRight: '10px',
            height: 'fit-content',
        },
        titleRule: {
            fontWeight: 500,
            fontSize: '18px',
        },
        inputSearch: {
            width: 250,
            marginRight: '10px',
            borderRadius: '4px',
            backgroundColor: 'white',
        },
    };
});

export default GroupStyles
