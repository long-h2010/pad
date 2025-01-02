import { useEffect, useState } from 'react';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const useSpeechRecognition = (language: string) => {
    const [text, setText] = useState('');
    const [isListening, setIsListening] = useState(false);
    
    recognition.continuous = true;
    recognition.lang = language;

    useEffect(() => {
        if (!recognition) return;

        recognition.onresult = (event: any) => {
            setText(event.results[0][0].transcript);
            recognition.stop();
            setIsListening(false);
        }
    },[]);

    const startListening = () => {
        setText('');
        setIsListening(true);
        recognition.start();
    };

    const stopListening = () => {
        setIsListening(false);
        recognition.stop();
    };

    return {
        text,
        isListening,
        startListening,
        stopListening,
        hasRecognitionSupport: !!recognition
    };
};

export default useSpeechRecognition