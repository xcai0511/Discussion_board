import React from 'react';
import "./index.css";

const ProfileImageOptions = ({ selectedProfileImage, setSelectedProfileImage, handleSaveProfileImage }) => {
    return (
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
    );
};

export default ProfileImageOptions;