import { REACT_APP_API_URL, api } from "./config";

const USER_API_URL = `${REACT_APP_API_URL}/user`;

// To add User
const addUser = async(user) => {
    const data = { user: user };
    const res = await api.post(`${USER_API_URL}/addUser`, data);

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

// To get user saved questions
const getSavedQuestions = async(uid) => {
    const res = await api.get(`${USER_API_URL}/getSavedQuestions/${uid}`);
    return res.data;
}

export { addUser, getUserById, getUserByEmail, editUser,getSavedQuestions  };