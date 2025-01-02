import { useEffect, useState } from 'react';
import { Box, Button, Container } from '@mui/material';
import { HighlightOff } from '@mui/icons-material';

const Spelling: React.FC<any> = ({ spell }) => {
    const { text, top, left, open, handleWordReplace } = spell;
    const [openSpell, setOpenSpell] = useState(open);

    useEffect(() => {
        setOpenSpell(true);
    }, [text]);

    // if (openSpell) setTimeout(() => setOpenSpell(false), 5000);

    const handleClick = () => {
        handleWordReplace();
        setOpenSpell(false);
    };

    const handleClose = () => {
        setOpenSpell(false);
    };

    return (
        <Container>
            <Box
                sx={{
                    top: `${top + 200}px !important`,
                    left: `${left + 400}px`,
                    backgroundColor: 'white',
                    padding: '5px',
                }}
                className={openSpell ? 'spelling open' : 'spelling'}
            >
                <Button
                    sx={{ fontWeight: 'bold', p: 0, textTransform: 'none' }}
                    onClick={handleClick}
                    color='success'
                >
                    {text}
                </Button>
                <Box
                    sx={{ p: 0, display: 'inline', mr: 1, cursor: 'pointer' }}
                    onClick={handleClose}
                >
                    <HighlightOff sx={{ fontSize: '18px', color: 'green' }} />
                </Box>
            </Box>
        </Container>
    );
};

export default Spelling
