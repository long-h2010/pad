import { makeStyles } from 'tss-react/mui';

const DocumentStyles = makeStyles()(() => {
    return {
        docHeader: {
            padding: "15px",
            paddingBottom: 0
        },
        inputTitleDoc: {
            width: "500px",
            height: "5px !important",
            border: "none",
            backgroundColor: "white",
            fontWeight: "bold",
            fontSize: 18,
            marginLeft: "54px"
        },
    };
});

export default DocumentStyles
