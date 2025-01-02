import { ArrowBackIosNew } from '@mui/icons-material';
import { Box } from '@mui/material';

const Back: React.FC<any> = (props) => {
    const { page, href } = props;
    return (
        <Box
            sx={{
                textAlign: 'center',
                marginTop: '30px',
                color: '#66799e !important',
            }}
        >
            <a
                style={{
                    color: '#66799e',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textDecoration: 'none',
                }}
                href={href}
            >
                <ArrowBackIosNew sx={{ fontSize: '12px', marginRight: '10px' }} />
                Back to {page}
            </a>
        </Box>
    );
};

export default Back
