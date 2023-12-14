import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Micicon from './mic.png';
import './Pred.css';

const apiKey = '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';

function App() {
  const [inputText, setInputText] = useState('');
  const [predictedText, setPredictedText] = useState('');
  const [listening, setListening] = useState(false);
  const [searching, setSearching] = useState(false);

  let recognition;

  useEffect(() => {
    if (listening) {
      startListening();
    } else {
      stopListening();
    }
  }, [listening]);

  const startListening = () => {
    recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      console.log('Listening started');
    };

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join('');

      setInputText(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    recognition.onend = () => {
      console.log('Listening ended');
      if (!searching) {
        handleTextPrediction();
      }
    };

    recognition.start();
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  const handleTextPrediction = async () => {
    try {
      setSearching(true);

      const response = await axios.post(
        'https://api.openai.com/v1/engines/text-davinci-002/completions',
        {
          prompt: `${inputText}`,
          max_tokens: 500,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
        }
      );

      const predictedText = response.data.choices[0].text;
      setPredictedText(predictedText);

      const speechSynthesis = window.speechSynthesis;
      const speechUtterance = new SpeechSynthesisUtterance(predictedText);
      speechSynthesis.speak(speechUtterance);

      setSearching(false);
    } catch (error) {
      console.error('Error predicting text:', error);
    }
  };

  return (
    <div className='box'>
    <div className="Assistantcontain">
      <h1 className="header">Smart Assistance for Disabled Individuals</h1>
      <div className="search">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Ask your question..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button className="micButton" onClick={startListening}>
            {listening ? (
              <img
                src="stop-mic-icon.png"
                alt="Stop Microphone"
                className="mic-icon"
              />
            ) : (
              <img
                src={Micicon} style={{height:'30px',width:'30px'}}
                alt="Microphone"
                className="mic-icon"
              />
            )}
          </button>
          <button className="submitButton" onClick={handleTextPrediction}>
            Search
          </button>
        </div>
        <h2 className="subtitle">Assistance Content</h2>
        <div className="predicted-text">{predictedText}</div>
      </div>
    </div>
    </div>
  );
}

export default App;
