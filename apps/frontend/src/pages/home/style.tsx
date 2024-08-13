import { makeStyles } from 'tss-react/mui';

const HomeStyles = makeStyles()(() => {
    return {
        containerHome: {
            minWidth: "80%",
            width: "fit-content",
            paddingTop: "50px",
            color: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        gridContainer: {
            width: "80% !important",
            margin: "0 !important"
        },
        contentHeader: {
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        },
        selectRule: {
            border: "none",
            boxShadow: "none",
            width: "200px",
            cursor: "pointer",
        }
    };
});

export default HomeStyles;