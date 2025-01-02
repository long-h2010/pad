import { makeStyles } from 'tss-react/mui';

const HomeStyles = makeStyles()(() => {
    return {
      containerHome: {
        minWidth: "80%",
        paddingTop: "50px",
        color: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "20px",
        backgroundColor: "rgb(243, 243, 243)",
      },
      gridContainer: {
        width: "80% !important",
        margin: "0 !important",
      },
      contentHeader: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      },
      selectType: {
        border: "none",
        boxShadow: "none",
        width: "200px",
        cursor: "pointer",
      },
      contentBody: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      },
      docName: {
        height: "20px",
        width: "100%",
        overflow: "hidden",
        display: "inline-block",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        color: "#000",
      },
      hoverBox: {
        maxWidth: "fit-content",
        bottom: "-60px",
        right: "-60px",
      },
      iconTag: {
        color: "black",
        "&:hover [class*='hoverBox']": {
          display: "inline",
        },
      },
    };
});

export default HomeStyles;