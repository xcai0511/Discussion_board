import React, { useState } from 'react';

const UserProfile = ({ username, contactEmail, onSavePassword, loggedIn }) => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
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
    <div>
      <h2>User Profile</h2>
      {loggedIn ? (
          <>
            <p>Username: {username}</p>
            <p>Contact Email: {contactEmail}</p>
            <button onClick={() => setShowChangePassword(true)}>Change Password</button>
            {showChangePassword && (
                <div>
                  <h3>Change Password</h3>
                  <input
                      type="password"
                      placeholder="Current Password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <input
                      type="password"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                  />
                  {passwordMatchError && <p style={{ color: 'red' }}>Current password does not match</p>}
                  <button onClick={handleSavePassword}>Save Password</button>
                </div>
            )}
          </>
      ) : (
          <div> Please login to see saved posts </div>
      )}

    </div>
  );
};

export default UserProfile;
