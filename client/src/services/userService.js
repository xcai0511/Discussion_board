import { REACT_APP_API_URL, api } from "./config";

const USER_API_URL = `${REACT_APP_API_URL}/user`;

// To add User (for sign up)
const addUser = async(user, csrfToken) => {
    const data = { user: user };
    const res = await api.post(`${USER_API_URL}/addUser`, data, {
        headers: {
            "X-CSRF-Token": csrfToken
        }
    });

    return res.data;
}

// To get User by ID
const getUserById = async (uid) => {
    const res = await api.get(`${USER_API_URL}/getUserById/${uid}`);

    return res.data;
};

// To get User by email
const getUserByEmail = async (email) => {
    const res = await api.get(`${USER_API_URL}/getUserByEmail/${email}`);

    return res.data;
};

// To retrieve all users
const getAllUsers = async () => {
    const res = await api.get(`${USER_API_URL}/getAllUsers`);

    return res.data;
}

// To edit user
const editUser = async(uid, user) => {
    const data = {uid: uid, user: user};
    const res = await api.put(`${USER_API_URL}/editUser`, data)
    return res.data;
}

// To get user saved questions by email
const getSavedQuestions = async(email, csrfToken) => {
    const res = await api.get(`${USER_API_URL}/getSavedQuestions/${email}`, {
        headers: {
            "X-CSRF-Token": csrfToken
        }});
    return res.data;
}

const updatePassword = async(username, oldPassword, newPassword, csrfToken) => {
    const data = {username: username, oldPassword: oldPassword, newPassword: newPassword};
    const res = await api.put(`${USER_API_URL}/updatePassword`, data, {
        headers: {
            "x-csrf-token": csrfToken
        }});
    return res.data;
}

// To add/remove saved question from user
const saveQuestionToUser = async(username, isBookmarked, qid, csrfToken) => {
    const data = {isBookmarked: isBookmarked, qid: qid};
    const res = await api.put(`${USER_API_URL}/saveQuestionToUser/${username}`,{data}, {
        headers: {
            'x-csrf-token': csrfToken
        },
        withCredentials: true,
    } );
    return res.data;
}

// To update user profile image
const updateUserProfileImage = async (username, profileImage, csrfToken) => {
    const data = {username: username, profileImage: profileImage};
    const res = await api.put(`${USER_API_URL}/updateProfileImage`, data, {
        headers: {
            "x-csrf-token": csrfToken
        }});
    return res.data;
};

export { addUser, getUserById, getUserByEmail, getAllUsers, editUser, getSavedQuestions, saveQuestionToUser, updatePassword, updateUserProfileImage  };
