import React, { useState } from 'react';
import Form from '../baseComponents/form';
import Input from '../baseComponents/input';
import './index.css';

const UserProfile = ({ username, contactEmail, onSavePassword, loggedIn }) => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currPassword, setCurrPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const handleSavePassword = () => {
    
    // Check if the current password matches the password stored in the backend
    // If it matches, call onSavePassword with the new password
    // Otherwise, set passwordMatchError to true
    setPasswordMatchError(false); // Reset passwordMatchError

    // Simulated backend check (replace with actual API call)
    const isPasswordMatch = true; // Simulate password match
    if (isPasswordMatch) {
      onSavePassword(newPassword);
      setShowChangePassword(false); // Hide the change password container
    } else {
      setPasswordMatchError(true);
    }
  };

  return (
    <div className="userProfile_container">
      <h2>User Profile</h2>
      {loggedIn ? (
          <>
            <p>Username: {username}</p>
            <p>Contact Email: {contactEmail}</p>
            <button onClick={() => setShowChangePassword(true)}>Change Password</button>
            {showChangePassword && (
                <div>
                  <Form>
                    <h3>Change Password</h3>
                    <Input
                        title={"Current Password"}
                        id={"currPasswordInput"}
                        val={currPassword}
                        setState={setCurrPassword}
                        err={passwordMatchError}
                    />
                    <Input
                        title={"New Password"}
                        id={"newPasswordInput"}
                        val={newPassword}
                        setState={setNewPassword}
                        err={passwordMatchError}
                    />
                    <div className="btn_indicator_container">
                        <button
                            className="form_postBtn"
                            onClick={() => {
                              handleSavePassword();
                            }}
                        >
                            <div>Change Password</div>
                        </button>
                        <div className="mandatory_indicator">
                            * indicates mandatory fields
                        </div>
                    </div>
                  </Form>
                </div>
            )}
          </>
      ) : (
          <div className="login_msg_profile"> Please login to see your user profile </div>
      )}

    </div>
  );
};

export default UserProfile;
