import { Box, Typography } from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import useStyles from '../pages/login/styles'
function ErrorMessage() {
    const { classes } = useStyles();

    return (
        <Box className={classes.error}>
            <ErrorOutlineIcon sx={{marginBottom: "2px", marginRight: "5px"}}/>
            <Typography variant="body2" gutterBottom>
                 Password is incorrect
            </Typography>
        </Box>
    );
}

export default ErrorMessage;