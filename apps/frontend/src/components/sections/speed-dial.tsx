import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { Edit } from '@mui/icons-material';

const MySpeedDial: React.FC<any> = (props) => {
    const { actions } = props

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 20,
                right: 20,
                transform: 'translateZ(0px)',
                flexGrow: 1,
            }}
        >
            <style>
                {   
                    `#root>div>main>div.MuiBox-root.css-19o4u0u>div>button {
                        background-color: white;
                    }`
                }
            </style>
            <SpeedDial
                ariaLabel='SpeedDial openIcon example'
                icon={<SpeedDialIcon sx={{ color: 'black' }} openIcon={<Edit />} />}
            >
                {actions.map((action: any) => (
                    <SpeedDialAction
                        sx={{ backgroundColor: 'white', color: 'black' }}
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.click}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
};

export default MySpeedDial