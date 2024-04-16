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

// To edit user
const editUser = async(uid, user) => {
    const data = {uid: uid, user: user};
    const res = await api.put(`${USER_API_URL}/editUser`, data)
    return res.data;
}

// To get user saved questions by email
const getSavedQuestions = async(email) => {
    const res = await api.get(`${USER_API_URL}/getSavedQuestions/${email}`);
    return res.data;
}

// To add/remove saved question from user
const saveQuestionToUser = async(username, isBookmarked, qid, csrfToken) => {
    const data = {isBookmarked: isBookmarked, qid: qid};
    const res = await api.put(`${USER_API_URL}/saveQuestionToUser/${username}`,{data}, {
        headers: {
            'X-CSRF-Token': csrfToken
        },
        withCredentials: true,
    } );
    return res.data;
}

export { addUser, getUserById, getUserByEmail, editUser, getSavedQuestions, saveQuestionToUser  };