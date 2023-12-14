import React, { useState } from 'react';
import './Chatbot.css';

const apiKey = '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';

const Chatbot = () => {
  const [query, setQuery] = useState('');
  const [recommendedChannels, setRecommendedChannels] = useState([]);
  const [showResponse, setShowResponse] = useState(false);
  const [responseType, setResponseType] = useState('default');

  const fetchData = async () => {
    try {
      if (query.trim() === '') {
        setRecommendedChannels([]);
        setShowResponse(false);
        setResponseType('default');
        return;
      }

      const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `I want the best 5 YouTube channels along with clickable links as another object parameter, 3 paid courses, and 3 free courses names for ${query}`,
          max_tokens: 400,
        }),
      });

      const data = await response.json();
      console.log(data);
      const responseData = data.choices[0].text;

      const lines = responseData.split('\n');
      const sections = {
        'YouTube Channels': [],
        'Paid Courses': [],
        'Free Courses': [],
      };
      let currentSection = null;

      for (const line of lines) {
        if (line.includes('YouTube Channels')) {
          currentSection = 'YouTube Channels';
        } else if (line.includes('Paid Courses')) {
          currentSection = 'Paid Courses';
        } else if (line.includes('Free Courses')) {
          currentSection = 'Free Courses';
        } else if (currentSection) {
          sections[currentSection].push(line.trim());
        }
      }

      setRecommendedChannels(sections);
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
      setRecommendedChannels([]);
      setShowResponse(false);
      setResponseType('default');
    }
  };

  return (
    <div className='box'>
    <div className="chatbot-container">
      <h1 className='header'>Explore Learning Resources</h1>
      <div className="input-container">
        <input type="text" value={query} onChange={handleInputChange} placeholder="Enter the subject for technology for which you want resource..." />
        <button className="button" onClick={handleSubmit}>Submit</button>
      </div>

      {showResponse && query.trim() !== '' && (
        <div className="response">
          {Object.entries(recommendedChannels).map(([sectionTitle, items]) => (
            <div key={sectionTitle} className="section">
              <h1 className='sectionTitle'>{sectionTitle}</h1>
              <ul className="list">
                {items.map((item, index) => (
                  <li key={index}>
                    <strong>{item}</strong>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default Chatbot;
