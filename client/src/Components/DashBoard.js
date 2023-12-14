import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import userImage from './image.png';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import './DashBoard.css';
import { useSelector } from 'react-redux';

const dummyUserData = {
    name: 'John Doe',
    profilePicture: userImage,
    quizScores: [
        { quizName: 'Quiz-1', score: 9 },
        { quizName: 'Quiz-2', score: 8 },
        { quizName: 'Quiz-3', score: 8 },
        { quizName: 'Quiz-4', score: 4 },
        { quizName: 'Quiz-5', score: 7 },
    ],
    quizCompletionRate: 75,
    daysActiveData: [
        '2024-01-01',
        '2024-02-01',
        '2024-03-01',
        '2024-04-01',
        '2024-05-01',
        '2024-06-01',
        '2024-07-01',
        '2023-08-01',
        '2023-09-01',
        '2023-10-01',
        '2023-11-01',
        '2023-12-01',
    ],

    lastActivity: '2023-09-20 14:30:00',
    school: 'KLETECH University',
    major: 'Computer Science',
    bio: 'A passionate learner on a journey to acquire knowledge and skills.',
    submissionsLastYear: 508,
    totalActiveDays: 58,
    maxStreak: 17,
};

function Dashboard() {
    const name = useSelector(store => store.user.displayName);
    const quizNames = dummyUserData.quizScores.map((quiz) => quiz.quizName);
    const quizScores = dummyUserData.quizScores.map((quiz) => quiz.score);

    const chartData = {
        labels: quizNames,
        datasets: [
            {
                label: 'Quiz Scores',
                backgroundColor: 'rgba(75, 192, 192, 0.4)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75, 192, 192, 0.6)',
                hoverBorderColor: 'rgba(75, 192, 192, 1)',
                data: quizScores,
            },
        ],
    };

    return (
        <div className="dashboard">
            <div className="profile">
                <img src={dummyUserData.profilePicture} alt={dummyUserData.name} />
                <h2>{name}</h2>
                <p>{dummyUserData.bio}</p>
            </div>
            <div className="stats">
                <h3>Quiz Statistics</h3>
                <ul>
                    {dummyUserData.quizScores.map((quiz, index) => (
                        <li key={index}>
                            {quiz.quizName}: {quiz.score}
                        </li>
                    ))}
                </ul>
                <h4>Quiz Completion Rate: {dummyUserData.quizCompletionRate}%</h4>
            </div>
            <div className="activity">
                <h3>Activity Information</h3>
                <p>Submissions in the Last Year: {dummyUserData.submissionsLastYear}</p>
                <p>Total Active Days: {dummyUserData.totalActiveDays}</p>
                <p>Max Streak: {dummyUserData.maxStreak}</p>
                <p>Last Activity: {dummyUserData.lastActivity}</p>
            </div>
            <div className="heatmap">
                <h3>Days Active Heatmap</h3>
                <CalendarHeatmap
                    className="react-calendar-heatmap"
                    startDate={new Date('2023-09-23')}
                    endDate={new Date('2024-09-23')}
                    values={dummyUserData.daysActiveData.map((date) => ({
                        date: new Date(date),
                    }))}
                    showMonthLabels={true}
                    gutterSize={4}
                    horizontal={true}
                />
                <style>
                    {`
                        .react-calendar-heatmap .react-calendar-heatmap-month-label {
                            font-size: 14px;
                            text-transform: uppercase;
                        }
                    `}
                </style>
            </div>
            <div className="education">
                <h3>Educational Background</h3>
                <p>School/University: {dummyUserData.school}</p>
                <p>Major/Field of Study: {dummyUserData.major}</p>
            </div>

            <h3>Quiz Scores Chart</h3>
            <Bar
                data={chartData}
                options={{
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 10,
                        },
                    },
                }}
            />
        </div>
    );

}

export default Dashboard;
