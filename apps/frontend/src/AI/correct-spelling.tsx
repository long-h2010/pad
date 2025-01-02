import Groq from 'groq-sdk';

const groq = new Groq({
    apiKey: import.meta.env.VITE_APP_GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
});

async function CorrectSpelling(text: string) {
    const completion = await groq.chat.completions
        .create({
            messages: [
                {
                    role: 'system',
                    content: `You are an assistant that specializes in correcting spelling and grammar in Vietnamese.
                    Always return only the corrected version of the provided text without any additional comments.`,
                },
                {
                    role: 'user',
                    content: 'Correct spelling and grammar in this Vietnamese text: ' + text,
                },
            ],
            model: 'gemma2-9b-it',
            temperature: 0.2,
            top_p: 1,
            stream: false,
        })
        .then((chatCompletion) => {
            return chatCompletion.choices[0]?.message?.content || '';
        });

    return completion;  
}

export default CorrectSpelling
