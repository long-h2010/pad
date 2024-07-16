import { makeStyles } from 'tss-react/mui';

const GroupStyles = makeStyles()(() => {
    return {
        headerTitle: {
            color: 'green',
            fontWeight: 'bold',
        },
        btnUser: {
            color: 'green',
            borderColor: '#298A08',
            marginRight: '10px',
        },
        boxContainer: {
            width: 360,
            height: 'fit-content',
            padding: '16px',
            bgcolor: 'background.paper',
        },
        boxFrame: {
            display: 'flex',
            alignItems: 'center',
            paddingBottom: 1,
        },
        inputSearch: {
            width: 250,
            marginRight: 2,
            borderRadius: '4px',
            backgroundColor: 'white'
        },
        boxRule: {
            display: 'flex',
            height: 50,
            maxHeight: 'fit-content',
            alignItems: 'center',
            paddingBottom: 1,
        },
    };
});

export default GroupStyles;