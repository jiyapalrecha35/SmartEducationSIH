import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UnProtected from './UnProtected';
import Login from './Login';
import Profile from './Profile';
import Protected from './Protected';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import Chat from './Chat';
import Navbar from './Navbar';
import Prediction from './Prediction'
import MentalHA from './MentalHA'
import DashBoard from './DashBoard'
import Home from './Home'
import HomeWork from './HomeWork'
import BookRepository from './BookRepo';
import ChatBot from './ChatBot';
import Question from './Question';


const Body = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true' ? true : false);
    const dispatch = useDispatch();
    const changeStatus = (status) => {
        setIsLoggedIn(status);
    }
    // console.log('Body');

    const [ selected , setSelected ] = useState('1');
    const [ selectedText , setSelectedText ] = useState('General Knowledge');

    const changeSelected = (index,text) =>{
        setSelected(index);
        setSelectedText(text);
        // console.log(index,selected);
    }

    useEffect(() => {
        async function verify() {
            const response = await fetch('http://localhost:8080/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'token': localStorage.getItem('token')
                }
            })
            // console.log(response.status);
            if (response.status === 200) {
                // <Navigate replace to='/browse'/>
                const json = await response.json();
                // console.log(json);
                dispatch(addUser({
                    email: json.email,
                    displayName: json.name
                }));
            }
            if(response.status === 403 || response.status === 401){
                localStorage.setItem('isLoggedIn','false');
                localStorage.clear('token');
                changeStatus(false);
                dispatch(removeUser());
            }
        }
        if (isLoggedIn) {
            verify();
        }
    }, [])

    return (
        <Router>
            <div className='overflow-scroll no-scrollbar'>
                <Navbar isLoggedIn={isLoggedIn} changeStatus={changeStatus}/>
                <Routes>
                    {/* <Route path='/' element={
                    <UnProtected isLoggedIn={isLoggedIn}>
                        <Login changeStatus={changeStatus}/>
                    </UnProtected>
                }/> */}
                    {/* <Route path='/profile' element={
                    <Protected isLoggedIn={isLoggedIn}>
                        <Profile changeStatus={changeStatus}/>
                    </Protected>
                }/> */}
                    <Route path='/forum' element={
                        <Protected isLoggedIn={isLoggedIn} next='forum'>
                            <Chat text={selectedText} index={selected} changeSelected={changeSelected}/>
                        </Protected>
                    } />
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={
                        <Protected isLoggedIn={isLoggedIn} next='profile'>
                            <DashBoard />
                        </Protected>
                    }/>
                    <Route path="/quiz" element={
                        <Protected isLoggedIn={isLoggedIn} next='quiz'>
                            <Question index={selected} text={selectedText} changeSelected={changeSelected}/>
                        </Protected>
                    } />
                    <Route path="/homework" element={
                        <Protected isLoggedIn={isLoggedIn} next='homework'>
                            <HomeWork/>
                        </Protected>
                    }/>
                    <Route path="/mental-health" element={
                        <Protected isLoggedIn={isLoggedIn} next='mental-health'>
                            <MentalHA/>
                        </Protected>
                    } />
                    <Route path="/assistant" element={
                        <Protected isLoggedIn={isLoggedIn} next='assistant'>
                            <Prediction/>
                        </Protected>
                    }/>
                    <Route path="/resources" element={
                        <Protected isLoggedIn={isLoggedIn} next='resources'>
                            <ChatBot/>
                        </Protected>
                    }/>
                    <Route path="/books" element={
                        <Protected isLoggedIn={isLoggedIn} next='books'>
                            <BookRepository/>
                        </Protected>
                    } />
                    <Route path='/login' element={
                        <UnProtected isLoggedIn={isLoggedIn}>
                            <Login changeStatus={changeStatus}/>
                        </UnProtected>
                    }/>
                </Routes>
            </div>

        </Router>
    );
}

export default Body;