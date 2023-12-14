import React from 'react';
import Header from './Header';

const Profile = ({ changeStatus }) => {
  return (
    <div>
        <Header changeStatus={changeStatus}/>
        <div>Profile</div>
    </div>
    
  )
}

export default Profile;