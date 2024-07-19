import { makeStyles } from 'tss-react/mui';

const GroupStyles = makeStyles()(() => {
    return {
        headerTitle: {
            color: '#106b1f',
            fontWeight: 'bold',
            textTransform: "uppercase"
        },
        boxContainer: {
            width: 360,
            height: 'fit-content',
            padding: '16px',
            bgcolor: 'background.paper',
        },
        boxRule: {
            display: 'flex',
            height: 50,
            maxHeight: 'fit-content',
            alignItems: 'center',
            paddingBottom: 1,
        },
        inputSearch: {
            width: 250,
            marginRight: "10px",
            borderRadius: '4px',
            backgroundColor: 'white',
        },
        listUser: {
            width: 250, 
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            position: 'absolute',
            zIndex: 1,
            top: 130,
            left: 24,
            backgroundColor: "white"
        },
        avatarUser: {
            width: "30px",
            height: "30px"
        },
        selectRule: {
            width: "180px",
            marginRight: "10px"
        },
        titleRule: {
            fontWeight: 500,
            fontSize: "18px"
        }
    };
});

export default GroupStyles;