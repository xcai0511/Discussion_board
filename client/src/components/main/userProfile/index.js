import React, {useState} from 'react';
import Form from '../baseComponents/form';
import Input from '../baseComponents/input';
import './index.css';
import {updatePassword} from "../../../services/userService"
//import {fetchCsrfToken} from "../../../services/authService"

const UserProfile = ({ username, contactEmail, loggedIn, csrfToken }) => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currPassword, setCurrPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [currPasswordError, setCurrPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  //const [csrfToken, setCsrfToken] = useState('');

  const handleSavePassword = async () => {
    let isValid = true;
    if (!currPassword) {
      setCurrPasswordError("Current password cannot be empty");
      isValid = false;
    }
    if (!newPassword) {
      setNewPasswordError("New password cannot be empty");
      isValid = false;
    } else if (newPassword.length < 8) {
      setNewPasswordError("Password is too short (minimum is 8 characters)")
      isValid = false;
    } else if (newPassword.length > 20) {
      setNewPasswordError("Password is too long (maximum is 20 characters)")
      isValid = false;
    }
    if (!isValid) {
      return;
    }
    try {
      const updateResponse = await updatePassword(username, currPassword, newPassword, csrfToken);
      if (updateResponse.success) {
        alert("Password updated successfully!");
      } else {
        setCurrPasswordError('Invalid current password');
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setNewPasswordError("An error occurred while updating the password. Please try again later.");
    }

  };
  // useEffect(() => {
  //   const initAuth = async () => {
  //     const token = await fetchCsrfToken();
  //     setCsrfToken(token);
  //   };
  //   initAuth();
  // })

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
                        err={currPasswordError}
                    />
                    <Input
                        title={"New Password"}
                        id={"newPasswordInput"}
                        val={newPassword}
                        setState={setNewPassword}
                        err={newPasswordError}
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
