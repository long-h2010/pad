import { Mic } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import useSpeechRecognition from '../../../hooks/useSpeechRecognition';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

const SpeechToText: React.FC<any> = ({ content , setContent }) => {
    const [text, setText] = useState('');
    const [language, setLanguage] = useState('vi-VN');
    const recognition = useSpeechRecognition(language);

    useEffect(() => {
        setContent(content + recognition.text);
    }, [recognition.isListening])

    return (
        <Box sx={{ width: '160px', height: '160px', display: 'flex', justifyContent: 'center' }}>
            <IconButton onClick={() => recognition.isListening ? recognition.stopListening() : recognition.startListening()} disableRipple>
                <FontAwesomeIcon icon={faMicrophone} beat={recognition.isListening ? true : false} size='lg' />
            </IconButton>
        </Box>
    );
}

export default SpeechToText