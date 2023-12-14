import React, { useRef, useState } from 'react';
import { checkValidData } from '../utils/validate';
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

const Login = ({ changeStatus }) => {
    const [ isSignInForm, setIsSignInForm ] = useState(true);
    const [ errorMessage, setErrorMessage ] = useState(null);
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef (null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const next = useSearchParams()[0].get('next');

    const oAuthGoogle = () => {
        // console.log('Google oauth');

    }

    const handleFormTypeChange = () => {
        // console.log('Form type changed');
        setIsSignInForm(!isSignInForm);
    }

    const handleButtonClick = () => {
        // console.log('button clicked');
        const response = checkValidData(email.current.value ,password.current.value);
        setErrorMessage(response);
        if(response) {
            return;
        }
        if(!isSignInForm) {
            // Sign up logic
            async function signUp(){
                const response = await fetch('http://localhost:8080/signup',{
                    method : 'POST',
                    body : JSON.stringify({
                        username : name.current.value,
                        email : email.current.value,
                        password : password.current.value
                    }),
                    headers : {
                        'Content-Type' : 'application/json; charset=UTF-8'
                    }
                })
                if(response.status === 200){
                    const json = await response.json();
                    // console.log(json);
                    localStorage.setItem('name',json.displayName);
                    const token = response.headers.get('token');
                    localStorage.setItem('token',token);
                    dispatch(addUser({
                        email : json.email,
                        displayName : json.displayName
                    }));
                    changeStatus(true);
                    localStorage.setItem('isLoggedIn','true')
                    next ? navigate(`/${next}`) : navigate('/profile');
                } else if(response.status === 400){
                    const message = await response.json();
                    setErrorMessage(message);
                }
            }
            signUp();
        } else {
            // Sign in logic
            async function signIn(){
                const response = await fetch('http://localhost:8080/login',{
                    method : 'POST',
                    body : JSON.stringify({
                        email : email.current.value,
                        password : password.current.value
                    }),
                    headers : {
                        'Content-Type' : 'application/json; charset=UTF-8'
                    }
                })
                if(response.status === 200){
                    const token = response.headers.get('token');
                    const json = await response.json();
                    // console.log(json);
                    // console.log(json.displayName);
                    localStorage.setItem('token',token);
                    dispatch(addUser({
                        email : json.email,
                        displayName : json.displayName
                    }));
                    changeStatus(true);
                    localStorage.setItem('isLoggedIn','true')
                    next ? navigate(`/${next}`) : navigate('/profile');
                } else if(response.status === 400 || response.status === 401) {
                    const message = await response.json();
                    setErrorMessage(message);
                }
            }
            signIn();
        }
    }

    return (
        <div className='h-screen w-screen bg-black'>
            <form className='bg-opacity-80 bg-slate-300 lg:w-2/6 md:w-3/6 sm:w-4/6 w-3/4 absolute my-36 left-0 right-0 mx-auto p-6 text-white rounded-md' onSubmit={(event) => {
                event.preventDefault();
            }}>
                <h1 className=' font-bold absolute px-7 text-black'>{isSignInForm ? 'Sign in' : 'Sign up'}</h1>
                <div className='flex flex-col items-center px-8 pt-8'>
                    {!isSignInForm && <input ref={name} type='text' placeholder='Full name' className='py-2 px-3 m-2 rounded-sm w-full bg-slate-500 bg-opacity-95 text-white'></input>}
                    <input ref={email} type='text' placeholder='Email address' className='py-2 px-3 m-2 rounded-sm w-full bg-slate-500 bg-opacity-95 text-white'></input>
                    <input ref={password} type='password' placeholder='Password' className='py-2 px-3 m-2 rounded-sm w-full bg-slate-500 text-white'></input>
                    <p className={`text-red-700 ${errorMessage && 'p-2 my-2'} rounded-sm font-black text-lg`}>{errorMessage}</p>
                    {/* <button onClick={oAuthGoogle}>Google</button> */}
                    <button className='py-3 mx-4 my-6 px-3 bg-slate-700 rounded-sm font-bold w-full' onClick={handleButtonClick}>{isSignInForm ? 'Sign in' : 'Sign up'}</button>
                </div> 
                <p className='hover:cursor-pointer text-center text-black font-semibold' onClick={handleFormTypeChange}>{isSignInForm ? 'New to Website? Sign up now' : 'Already registered? Sign in'}</p>
            </form>
        </div>
    );
}

export default Login;