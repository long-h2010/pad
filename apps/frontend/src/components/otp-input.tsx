import { useRef, useState } from 'react';
import { makeStyles } from 'tss-react/mui';

type InputProps = {
    length?: number;
    onComplete: (pin: string) => void;
};

const useStyles = makeStyles()(() => {
    return {
        inputNumbers: {
            border: '1px solid #dedede',
            outline: 'none',
            padding: '10px',
            width: '12%',
            borderRadius: '5px',
            textAlign: 'center',
            color: 'black',
            fontWeight: 'bold',
        },
    };
});

const OTPInput = ({ length = 4, onComplete }: InputProps) => {
    const { classes } = useStyles();
    const inputRef = useRef<HTMLInputElement[]>(Array(length).fill(null));

    const [OTP, setOTP] = useState<string[]>(Array(length).fill(''));
    console.log(OTP);
    const handleCompleteOTP = () => {
        for (let i = 0; i < OTP.length; i++) {
            if (OTP[i] == '') {
                return false;
            }
        }
        return true;
    };
    
    const element = document.querySelectorAll('input');
    if (handleCompleteOTP()) {
        for (let i = 0; i < element.length; i++) {
            element[i].style.border = '1px solid green';
        }
    } else {
        for (let i = 0; i < element.length; i++) {
            element[i].style.border = '1px solid #dedede';
        }
    }

    const handleTextChange = (input: string, index: number) => {
        const newPin = [...OTP];
        newPin[index] = input;
        setOTP(newPin);

        if (input.length === 1 && index < length - 1) {
            inputRef.current[index + 1]?.focus();
        }

        if (input.length === 0 && index > 0) {
            inputRef.current[index - 1]?.focus();
        }

        if (newPin.every((digit) => digit !== '')) {
            onComplete(newPin.join(''));
        }
    };

    return (
        <div className={`grid grid-cols-4 gap-5`}>
            {Array.from({ length }, (_, index) => (
                <input
                    id='input'
                    key={index}
                    type='text'
                    maxLength={1}
                    value={OTP[index]}
                    onChange={(e) => handleTextChange(e.target.value, index)}
                    ref={(ref) => {
                        inputRef.current[index] = ref as HTMLInputElement;
                    }}
                    className={classes.inputNumbers}
                    style={{ marginRight: index === length - 1 ? '0' : '10px' }}
                />
            ))}
        </div>
    );
};

export default OTPInput
