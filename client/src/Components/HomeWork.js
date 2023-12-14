import React, { useState } from 'react';
import './Chatbot.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';


const apiKey = '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';

const HomeworkChatbot = () => {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');
    const [showResponse, setShowResponse] = useState(false);

    const fetchData = async () => {
        try {
            if (query.trim() === '') {
                setResponse('');
                setShowResponse(false);
                return;
            }

            const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions',
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        prompt: `Solve the following homework problem: ${query}`,
                        max_tokens: 500,
                    }),
                }
            );


            const data = await response.json();
            const responseData = data.choices[0].text;
            console.log(response);
            setResponse(responseData);
            setShowResponse(true);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSubmit = () => {
        fetchData();
    };

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        setQuery(inputValue);

        if (inputValue.trim() === '') {
            setResponse('');
            setShowResponse(false);
        }
    };

    return (
        <div className="box">
        <div className="chatbot-container">
            <h1 className='header'>Homework Problem Solver</h1>
            <div className="input-container">
                <input type="text" value={query} onChange={handleInputChange} placeholder="Type your homework problem..." />
                <button onClick={handleSubmit}>Submit</button>
            </div>

            {showResponse && query.trim() !== '' && (
                <div className="response">
                    <p>Response:</p>
                    <SyntaxHighlighter language="cpp" style={solarizedlight}>
                        {response}
                    </SyntaxHighlighter>
                </div>
            )}

        </div>
        </div>
    );
};

export default HomeworkChatbot;
