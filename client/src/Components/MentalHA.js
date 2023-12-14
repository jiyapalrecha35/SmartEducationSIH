import React, { useState } from 'react';
import axios from 'axios';
import './MentalHealthAssessment.css';

const MentalHealthAssessment = () => {
    const [userResponses, setUserResponses] = useState({
        stressLevel: '',
        mood: '',
        socialInteraction: '',
        physicalActivity: '',
        wellBeing: '',
        recentChanges: '',
        copingMechanisms: '',
        lifeSatisfaction: '',
        supportSystem: '',
        futureGoals: '',
    });

    const [recommendations, setRecommendations] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserResponses({
            ...userResponses,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const apiKey = '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';
            const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: `Assess the user's mental health and provide recommendations based on their responses:\n
                    Stress Level: ${userResponses.stressLevel}\n
                    Mood: ${userResponses.mood}\n
                    Social Interaction: ${userResponses.socialInteraction}\n
                    Physical Activity: ${userResponses.physicalActivity}\n
                    Well-Being: ${userResponses.wellBeing}\n
                    Recent Changes: ${userResponses.recentChanges}\n
                    Coping Mechanisms: ${userResponses.copingMechanisms}\n
                    Life Satisfaction: ${userResponses.lifeSatisfaction}\n
                    Support System: ${userResponses.supportSystem}\n
                    Future Goals: ${userResponses.futureGoals}\n`,
                    max_tokens: 250,
                }),
            });

            const data = await response.json();
            const responseData = data.choices[0]?.text;
            setRecommendations(responseData);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container'>
            <h2 className='assessment-title'>Mental Health Assessment</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <div>
                        <label className='label-text'>Are you finding it difficult to concentrate or focus on tasks?</label>
                        <select className='select-field' name="lifeSatisfaction" value={userResponses.lifeSatisfaction} onChange={handleInputChange}>
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div>
                        <label className='label-text'>How would you rate your mood today?</label>
                        <input
                            className='input-field'
                            type="number"
                            name="mood"
                            value={userResponses.mood}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className='label-text'>How often do you engage in social interactions?</label>
                        <select className='select-field' name="socialInteraction" value={userResponses.socialInteraction} onChange={handleInputChange}>
                            <option value="">Select</option>
                            <option value="1">Rarely</option>
                            <option value="2">Sometimes</option>
                            <option value="3">Frequently</option>
                        </select>
                    </div>
                    <div>
                        <label className='label-text'>How often do you engage in physical activities?</label>
                        <select className='select-field' name="physicalActivity" value={userResponses.physicalActivity} onChange={handleInputChange}>
                            <option value="">Select</option>
                            <option value="1">Rarely</option>
                            <option value="2">Sometimes</option>
                            <option value="3">Frequently</option>
                        </select>
                    </div>
                    <div>
                        <label className='label-text'>On a scale of 1 to 10, how satisfied are you with your overall well-being?</label>
                        <input
                            className='input-field'
                            type="number"
                            name="wellBeing"
                            value={userResponses.wellBeing}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className='label-text'>Have there been any significant changes in your life recently (e.g., school, work, family)?</label>
                        <textarea
                            className='textarea-field'
                            name="recentChanges"
                            value={userResponses.recentChanges}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className='label-text'>How do you usually cope with stress or difficult situations?</label>
                        <textarea
                            className='textarea-field'
                            name="copingMechanisms"
                            value={userResponses.copingMechanisms}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className='label-text'>Are you satisfied with the direction your life is taking?</label>
                        <select className='select-field' name="lifeSatisfaction" value={userResponses.lifeSatisfaction} onChange={handleInputChange}>
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div>
                        <label className='label-text'>Who can you turn to for emotional support when you need it?</label>
                        <textarea
                            className='textarea-field'
                            name="supportSystem"
                            value={userResponses.supportSystem}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className='label-text'>Are there specific goals or aspirations you are working toward?</label>
                        <textarea
                            className='textarea-field'
                            name="futureGoals"
                            value={userResponses.futureGoals}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <button type="submit" className='submit-button' disabled={loading}>
                    {loading ? 'Loading...' : 'Submit'}
                </button>
            </form>

            {recommendations && (
                <div className='recommendations'>
                    <h3 className='recommendations-title'>Recommendations:</h3>
                    <p className='recommendations-text'>{recommendations}</p>
                </div>
            )}
        </div>
    );
};

export default MentalHealthAssessment;
