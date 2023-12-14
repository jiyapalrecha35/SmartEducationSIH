import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import './Navbar.css';
import { useDispatch } from 'react-redux';
import { removeUser } from '../utils/userSlice';

const Categories = ({ changeSelected }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [room, setRoom] = useState(null);

    const menuItems = [
        { id: '1', text: 'General knowledge' },
        { id: '2', text: 'Aptitude' },
        { id: '3', text: 'Sports' },
        { id: '4', text: 'Computer and IT' },
        { id: '5', text: 'English' },
        { id: '6', text: 'Finance' },
        { id: '7', text: 'General Science' }
    ];
    
    return (
        <div className='mt-5 pl-1 flex justify-center items-center overflow-x-scroll no-scrollbar'>
            <nav className="navbar-expand-lg bg-body-tertiary text-white flex justify-center items-center">
                <div className="container-fluid">
                    <ul className="navbar-menu">
                        {menuItems.map(item => (
                            <li className="navbar-item hover:cursor-pointer"
                                onClick={() => { changeSelected(item.id, item.text); }}
                                key={item.id}
                                style={{
                                    background: 'linear-gradient(135deg, #48BB78, #4299E1)',
                                    color: 'transparent',
                                    WebkitBackgroundClip: 'text',
                                    backgroundClip: 'text',
                                    fontSize:'20px',
                                    fontWeight:'bold'
                                }}
                            >
                                {item.text}
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Categories;
