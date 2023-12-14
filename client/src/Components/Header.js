import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeUser } from '../utils/userSlice';

const Header = ({ changeStatus }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);

    const handleSignOut = () =>{
        localStorage.setItem('isLoggedIn','false');
        localStorage.clear('token');
        changeStatus(false);
        dispatch(removeUser());
        navigate('/');
    }
    
    return (
        <div className='w-screen bg-gradient-to-br from-black z-30 flex justify-end'>
            
            {user && <div className='flex justify-center items-center'>
                <div className='hidden sm:flex items-center mx-4 bg-transparent text-white'>
                    Hello {user.displayName}
                </div>
                <button className='text-white bg-black p-4' value={'Sign out'} onClick={handleSignOut}>Sign out</button>
            </div>}
        </div>
    );
}

export default Header;