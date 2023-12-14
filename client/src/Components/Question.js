import React, { useEffect, useState } from 'react';
import QuestionCard from './QuestionCard';
import { useDispatch, useSelector } from 'react-redux';
import { addAnswer, clearAnswer, clearOption, modifyOption } from '../utils/examSlice';
import './Questions.css';
import Categories from './Categories';

const Questions = ({ index, changeSelected, text }) => {
    // console.log('Questions',index);
    const [ questions, setQuestions ] = useState([]);
    const [ currentIndex, setCurrentIndex] = useState(0);
    const [ ans, setAns ] = useState(null);
    
    const dispatch = useDispatch();
    const exam = useSelector(store => store.exam.answers);
    const email = useSelector(store => store.user.email);
    // console.log(email);
    useEffect(()=>{
        async function fetchData(){
            // console.log('fetching ',index);
            const data = await fetch(`http://localhost:8080/exam/${index}`);
            // console.log('fetched ',index);
            const json = await data.json();
            // console.log(data);
            setQuestions(json);
            // console.log(json);
        }
        fetchData();
    },[index]);

    // useEffect(()=>{
    //     console.log(exam[0]);
    // },[exam]);

    if(exam === undefined) return;

    const changeCurrentIndex = (index) =>{
        if(index < 0){
            // setCurrentIndex(questions.length-1)
        } else if(index >= questions.length){
            // setCurrentIndex(0);
        } else {
            setCurrentIndex(index);
        }
    }

    const selectChoice = (choice) =>{
        // console.log(choice);
        // const hashMap = new Map([
        //     [1,{
        //         questionID : '1',
        //         optedChoice : 0
        //     }]
        // ])
        // console.log(hashMap);
        dispatch(addAnswer({
            questionId : questions[currentIndex].questionID,
            answer : choice
        }));
        dispatch(modifyOption({
            question : currentIndex,
            answer : choice
        }))
    };

    const onSubmit = () =>{
        // console.log(exam[0]);
        const answersToBeSent = [];
        for(const e of exam) {
            // console.log(e[1]);
            answersToBeSent.push(e[1]);
        }
        console.log(answersToBeSent);
        // for()
        async function submit(){
            const response = await fetch(`http://localhost:8080/submitexam/${index}`,{
                method : 'POST',
                body : JSON.stringify({
                    email : email,
                    answers : answersToBeSent
                }),
                headers : {
                    'Content-Type' : 'application/json; charset=UTF-8'
                }
            });
            const json = await response.json();
            // console.log(response);
            setAns(json.correct);
            dispatch(clearAnswer());
            dispatch(clearOption());
            changeCurrentIndex(0);
            // console.log(json.correct);
        }
        submit();

        // console.log(response)
    }


    return (
        <>
            <Categories changeSelected={changeSelected}/>
            { questions.length && 
                <div className='custom-container'>
                    <div className='custom-text'>Exam : {text}</div>
                    <div className='custom-card'>
                        <QuestionCard 
                            key={questions[currentIndex].questionTitle}
                            questionTitle={questions[currentIndex].questionTitle} 
                            questionID={questions[currentIndex].questionTitle}
                            option1={questions[currentIndex].options[0]} 
                            option2={questions[currentIndex].options[1]} 
                            option3={questions[currentIndex].options[2]} 
                            option4={questions[currentIndex].options[3]}
                            index={currentIndex}
                            selectChoice={selectChoice}
                        />
                    </div>
                    <div className='custom-button-group'>
                        <button 
                            className='custom-button' 
                            onClick={()=>{
                                changeCurrentIndex(currentIndex-1);
                            }}
                        >
                            Previous
                        </button>
                        <button 
                            className='custom-button'
                            onClick={()=>{
                                onSubmit();
                            }}
                        >
                            Submit
                        </button>
                        <button 
                            className='custom-button'
                            onClick={()=>{
                                changeCurrentIndex(currentIndex+1);
                            }}
                        >
                            Next
                        </button>
                    </div>
                    <div className='text-white rounded-lg'>
                        {ans != null && 'Result is ' + ans*20 + '%'}
                    </div>
                </div>
            }
        </>
    )
}

export default Questions;