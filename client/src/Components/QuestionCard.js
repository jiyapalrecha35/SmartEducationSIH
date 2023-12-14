import React from 'react';
import { useSelector } from 'react-redux';

const QuestionCard = ({ option1, option2, option3, option4, questionTitle, index, selectChoice, questionID }) => {
    const exam = useSelector(store => store.exam.options);
    if (exam === undefined) return;
    // console.log(exam);

    return (
        // <div className='w-full h-screen flex justify-center items-center bg-slate-200'>
        <div className='text-white' 
        style={{ backgroundColor: '#333', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '1rem', width: '80%', maxWidth: '50%', borderRadius: '0.25rem', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)' }}>
            <div style={{ margin: '0.5rem 0', fontSize: '1.25rem' }}>
                <h1 style={{
                    backgroundImage: 'linear-gradient(to right, #0072ff, #00c6ff)',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    fontWeight: 'bold',
                }}>
                    {questionTitle}
                </h1>

            </div>
            <div style={{ marginLeft: '2px' }}>
                <form style={{ fontSize: '1rem' }}>
                    <div>
                        <input type='radio' value='1' name='Question1' checked={exam[index] === 0} onChange={() => { selectChoice(0) }}></input> {option1}
                    </div>
                    <div>
                        <input type='radio' value='2' name='Question1' checked={exam[index] === 1} onChange={() => { selectChoice(1) }}></input> {option2}
                    </div>
                    <div>
                        <input type='radio' value='3' name='Question1' checked={exam[index] === 2} onChange={() => { selectChoice(2) }}></input> {option3}
                    </div>
                    <div>
                        <input type='radio' value='4' name='Question1' checked={exam[index] === 3} onChange={() => { selectChoice(3) }}></input> {option4}
                    </div>
                </form>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }}>
                Selected Choice : {exam[index] === -1 ? 'None' : exam[index] + 1}
            </div>
        </div>
    )
}

export default QuestionCard;