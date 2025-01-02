import { Box, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => {
    return {
        error: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "red",
            margin: "10px 0"
        }
    }
})

const ErrorMessage: React.FC<any> = (props) => {
    const { classes } = useStyles();
    const { message } = props;

    return (
        <Box className={classes.error}>
            <ErrorOutline sx={{ marginBottom: '2px', marginRight: '5px' }} />
            <Typography variant='body2' gutterBottom>
                {message}
            </Typography>
        </Box>
    );
}

export default ErrorMessage;