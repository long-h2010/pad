import React from 'react';
import { deepOrange } from '@mui/material/colors';
import { makeStyles } from 'tss-react/mui';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar } from '@mui/material';
import { format } from "date-fns";

const theme = createTheme();
const useStyles = makeStyles()((theme) => {
    return {
        messageRow: {
            width: "100%",
            marginTop: 20,
            display: "flex",
        },
        messageRowRight: {
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 20,
        },
        messageBlue: {
            color: "black",
            fontWeight: "bold",
            marginTop: 10,
            position: "relative",
            marginLeft: "20px",
            marginBottom: "10px",
            padding: "10px",
            minWidth: "100px",
            backgroundColor: "rgb(184,232,156)",
            textAlign: "left",
            font: `400 .9em 'Open Sans', sans-serif`,
            border: "1px solid rgb(184,232,156)",
            borderRadius: "10px",
            "&:after": {
                content: `''`,
                position: "absolute",
                width: "0",
                height: "0",
                borderTop: "15px solid rgb(184,232,156)",
                borderLeft: "15px solid transparent",
                borderRight: "15px solid transparent",
                top: "0",
                left: "-15px",
            },
            "&:before": {
                content: `''`,
                position: "absolute",
                width: "0",
                height: "0",
                borderTop: "17px solid rgb(184,232,156)",
                borderLeft: "16px solid transparent",
                borderRight: "16px solid transparent",
                top: "-1px",
                left: "-17px",
            },
        },
        messageOrange: {
            position: "relative",
            marginRight: "20px",
            marginBottom: "10px",
            padding: "10px",
            backgroundColor: "rgb(242,242,242)",
            minWidth: "100px",
            textAlign: "left",
            font: `400 .9em 'Open Sans', sans-serif`,
            border: "1px solid rgb(242,242,242)",
            borderRadius: "10px",
            "&:after": {
                content: `''`,
                position: "absolute",
                width: "0",
                height: "0",
                borderTop: "15px solid rgb(242,242,242)",
                borderLeft: "15px solid transparent",
                borderRight: "15px solid transparent",
                top: "0",
                right: "-15px",
            },
            "&:before": {
                content: `''`,
                position: "absolute",
                width: "0",
                height: "0",
                borderTop: "17px solid rgb(242,242,242)",
                borderLeft: "16px solid transparent",
                borderRight: "16px solid transparent",
                top: "-1px",
                right: "-17px",
            },
        },
        messageContent: {
            padding: 0,
            margin: "0px 0px 20px 0px",
            lineHeight: 1.5,
        },
        messageTimeStamp: {
            position: "absolute",
            fontSize: ".85em",
            fontWeight: 300,
            marginTop: "10px",
            marginBottom: "10px",
            marginRight: "5px",
            bottom: "-4px",
            right: "5px",
        },
        orange: {
            color: theme.palette.getContrastText(deepOrange[500]),
            backgroundColor: deepOrange[600],
            width: theme.spacing(4),
            height: theme.spacing(4),
        },
        avatarNothing: {
            color: "transparent",
            backgroundColor: "transparent",
            width: theme.spacing(4),
            height: theme.spacing(4),
        },
        displayName: {
            marginLeft: "20px",
        },
    };
}
);

export const MessageLeft: React.FC<any> = (props) => {
    const { classes } = useStyles();
    const message = props.message;
    const formattedDate = format(props.time, `hh:mm`);
    const photoURL = props.photoURL;
    const displayName = props.username;
    return (
        <ThemeProvider theme={theme}>
            <div className={classes.messageRow}>
                <Avatar alt={displayName} className={classes.orange} src={photoURL} />
                <div>
                    <div className={classes.displayName}>{displayName}</div>
                    <div className={classes.messageBlue}>
                        <div>
                            <p className={classes.messageContent}>{message}</p>
                        </div>
                        <div className={classes.messageTimeStamp}>{formattedDate}</div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
};

export const MessageRight: React.FC<any> = (props) => {
    const { classes } = useStyles();
    const formattedDate = format(props.time, `hh:mm`);
    const message = props.message;
    return (
        <div className={classes.messageRowRight}>
            <div className={classes.messageOrange}>
                <p className={classes.messageContent}>{message}</p>
                <div className={classes.messageTimeStamp}>{formattedDate}</div>
            </div>
        </div>
    );
};
