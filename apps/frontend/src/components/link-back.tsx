import { ArrowBackIosNew } from "@mui/icons-material";
import { Box } from "@mui/material";

const LinkBack: React.FC<any> = (props) => {
    const { classes, title, href } = props;

    return (
        <Box className={classes.boxLink}>
            <a className={classes.link} href={href}>
                <ArrowBackIosNew sx={{ fontSize: '12px', marginRight: '10px' }} />
                Back to {title}
            </a>
        </Box>
    );
}

export default LinkBack;