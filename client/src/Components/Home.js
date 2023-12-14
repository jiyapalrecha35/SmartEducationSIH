import React from 'react';
import Back from './background.png'
import './Home.css'

const Home = () => {
    return (
        <div className="homepage-container">
            <div className="homepage-content">
                <div className="left-content">
                    <h1 className='font-bold'>Revolutionize learning with quizzes, AI homework solver, an all-knowing assistant, mental health assessments, a discussion forum, rich learning resources, and real-time authentication.</h1>
                </div>
                <div className="right-content">
                    <img src={Back} alt="Boy with Laptop" />
                </div>
            </div>
        </div>
    );
};

export default Home;
