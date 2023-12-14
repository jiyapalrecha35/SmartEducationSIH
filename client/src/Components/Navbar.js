import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useDispatch } from 'react-redux';
import { removeUser } from '../utils/userSlice';

const Navbar = ({ isLoggedIn, changeStatus}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSignOut = () =>{
      localStorage.setItem('isLoggedIn','false');
      localStorage.clear('token');
      changeStatus(false);
      dispatch(removeUser());
      navigate('/');
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary no-scrollbar">
                <div className="container-fluid">
                    <ul className="navbar-menu">
                    <Link to="/" className="navbar-logo">
                        <h3>TechTitans</h3>
                    </Link>
                       
                        <li className="navbar-item">
                            <Link to="/quiz">Quiz</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/assistant">Assistant</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/books">Library</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/homework">AI Homework Solver</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/mental-health">Mental Health Assessment</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/resources">Explore Learning Resources</Link>
                        </li>
                        
                        <li className="navbar-item">
                            <Link to="/forum">Discussion Forum</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/profile">View Profile</Link>
                        </li>
                        {isLoggedIn ? <button 
                            className="auth-button"
                            onClick={handleSignOut}
                        >Sign out</button> : <Link to="/login" className="navbar-auth-link">
                            <button className="auth-button">Sign In</button>
                        </Link>}
                    </ul>
                    
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
