import React from 'react';
import './index.css';

const UserInfo = ({ user, onProfileClick, onLogoutClick }) => {
    return (
        <div className="user-info">
            <button className="user_email" onClick={onProfileClick}>
                <div>{user.contactemail}</div>
            </button>
            <button className="logout_button" onClick={onLogoutClick}>
                <div>Logout</div>
            </button>
        </div>
    );
};

export default UserInfo;