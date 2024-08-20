import { makeStyles } from 'tss-react/mui';

const DocumentStyles = makeStyles()(() => {
    return {
        docHeader: {
            padding: "15px",
            paddingBottom: 0,
        },
        // inputTitleDoc: {
        //     width: "30%",
        //     border: "none",
        //     fontWeight: "bold",
        //     fontSize: "16px",
        //     color: "green"
        // },
        boxColor: {
            width: "20px",
            height: "20px",
            display: "inline-block",
            margin: "5px",
            cursor: "pointer",
            borderRadius: "100%"
        },
        sigPadContainer: {
            backgroundColor: "white",
            padding: "0 10px 10px"
        },
        btnClear: {
            border: "none",
            marginLeft: "auto",
            color: "rgb(78, 75, 75)",
            padding: 0,
            display: "block",
            marginTop: "5px",
        },
        sigPadPenColors: {
            display: "inline-block",
            marginRight: "5px"
        },
        titleComment: {
            color: "#106b1f",
            fontWeight: "bold",
            fontSize: "20px",
        }
    };
});

export default DocumentStyles
