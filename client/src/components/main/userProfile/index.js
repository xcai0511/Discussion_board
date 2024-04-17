import React, {useState, useEffect} from 'react';
import Form from '../baseComponents/form';
import Input from '../baseComponents/input';
import './index.css';
import {updatePassword, updateUserProfileImage} from "../../../services/userService";
import YourQuestion from './question';
import { getQuestionsByFilter, deleteQuestionById } from '../../../services/questionService';

const UserProfile = ({ user, loggedIn, csrfToken }) => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showProfileImageOptions, setShowProfileImageOptions] = useState(false);
  const [currPassword, setCurrPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [currPasswordError, setCurrPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [userQuestions, setUserQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProfileImage, setSelectedProfileImage] = useState('');

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
      const updateResponse = await updatePassword(user.username, currPassword, newPassword, csrfToken);
      if (updateResponse.success) {
        alert("Password updated successfully!");
        setShowChangePassword(false);
        setCurrPassword('');
        setNewPassword('');
      } else {
        setCurrPasswordError('Invalid current password');
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setNewPasswordError("An error occurred while updating the password. Please try again later.");
    }

  };

  const handleSaveProfileImage = async () => {
    try {
      console.log("handle save profile image button: ", selectedProfileImage);
        // Call the service method to update profile image
        const updateResponse = await updateUserProfileImage(user.username, selectedProfileImage, csrfToken);
        if (updateResponse.success) {
            alert("Profile image updated successfully!");
            setShowProfileImageOptions(false);
        } else {
            alert("Unable to update profile image.")
        }
    } catch (error) {
        console.error("Error updating profile image:", error);
    }
  };


  // Function to fetch user's questions
  const fetchUserQuestions = async () => {
    try {
      const questions = await getQuestionsByFilter('newest', ''); // Fetch all questions
      const userQuestions = questions.filter(question => question.asked_by === user.username); // Filter questions by logged-in user
      setUserQuestions(userQuestions);
      setLoading(false); // Set loading to false after fetching questions
    } catch (error) {
      console.error('Error fetching user questions:', error);
      setLoading(false); // Set loading to false if there's an error
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        // Call the service method to delete the question
        await deleteQuestionById(questionId, csrfToken);
        
        // Remove the deleted question from the userQuestions state
        setUserQuestions(userQuestions.filter(question => question._id !== questionId));
        
        // Optional: Provide feedback to the user
        alert("Question deleted successfully!");
      } catch (error) {
        console.error("Error deleting question:", error);
        // Optional: Provide error feedback to the user
        alert("An error occurred while deleting the question. Please try again later.");
      }
    }
  };
  useEffect(() => {
    if (loggedIn) {
      fetchUserQuestions(); // Fetch user's questions when logged in
      setSelectedProfileImage(user.profileImage);
    }
  }, [loggedIn]);

  return (
    <div className="userProfile_container">
      <h2>User Profile</h2>
      {loggedIn ? (
          <>
            <img src={`images/${selectedProfileImage}`} alt="Profile Image" />
            <p>Username: {user.username}</p>
            <p>Contact Email: {user.contactemail}</p>
            <button onClick={() => setShowChangePassword(prevState => !prevState)}>
                {showChangePassword ? "Hide Change Password" : "Change Password"}
            </button>
            <button onClick={() => setShowProfileImageOptions(prevState => !prevState)}>
                {showProfileImageOptions ? "Hide Change Profile Picture" : "Change Profile Picture"}
            </button>
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
            {showProfileImageOptions && (
                <div>
                    <h3>Select New Profile Image</h3>
                    <div className="profile_image_options">
                        {Array.from({ length: 8 }, (_, i) => i + 1).map((index) => (
                            <img
                                key={index}
                                src={`images/user-avatar-${index}.png`}
                                alt={`Profile Image ${index}`}
                                onClick={() => setSelectedProfileImage(`user-avatar-${index}.png`)}
                                className={selectedProfileImage === `user-avatar-${index}.png` ? 'selected' : ''}
                            />
                        ))}
                    </div>
                    <button onClick={handleSaveProfileImage}>Save</button>
                </div>
            )}
            <div>
            <h2>Your Posts</h2>
              {loading ? (
                <p>Loading...</p>
              ) : userQuestions.length === 0 ? (
                <p>You haven&apos;t posted any questions yet.</p>
              ) : (
                userQuestions.map(question => (
                  <YourQuestion key={question._id} q={question} handleDeleteQuestion={() => handleDeleteQuestion(question._id)} />
                ))
              )}
            </div>
          </>
      ) : (
          <div className="login_msg_profile"> Please login to see your user profile </div>
      )}

    </div>
  );
};

export default UserProfile;
