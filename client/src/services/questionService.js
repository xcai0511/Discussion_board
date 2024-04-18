import { REACT_APP_API_URL, api } from "./config";

const QUESTION_API_URL = `${REACT_APP_API_URL}/question`;

// To get Questions by Filter
const getQuestionsByFilter = async (order = "newest", search = "") => {
    const res = await api.get(
        `${QUESTION_API_URL}/getQuestion?order=${order}&search=${search}`
    );

    return res.data;
};

// To get Questions by id
const getQuestionById = async (qid) => {
    const res = await api.get(`${QUESTION_API_URL}/getQuestionById/${qid}`);

    return res.data;
};

// To add Questions
const addQuestion = async (q, csrfToken) => {
    const res = await api.post(`${QUESTION_API_URL}/addQuestion`, q, {
        headers: {
            "X-CSRF-Token": csrfToken
        }
    });

    return res.data;
};

// To delete Question by ID
const deleteQuestionById = async (qid, csrfToken) => {
    const res = await api.delete(`${QUESTION_API_URL}/deleteQuestionById/${qid}`, {
        headers: {
            "X-CSRF-Token": csrfToken
        }
    });

    return res.data;
};

const upvoteQuestion = async (questionId, userId) => {
    const res = await api.put(`${QUESTION_API_URL}/upvoteQuestion/${questionId}`, { userId }, {
        headers: {
            "X-CSRF-Token": csrfToken
        }
    });

    return res.data;
};

const downvoteQuestion = async (questionId, userId) => {
    const res = await api.put(`${QUESTION_API_URL}/downvoteQuestion/${questionId}`, { userId }, {
        headers: {
            "X-CSRF-Token": csrfToken
        }
    });

    return res.data;
};

const removeVote = async (questionId, userId) => {
    const res = await api.put(`${QUESTION_API_URL}/removeVote/${questionId}`, { userId }, {
        headers: {
            "X-CSRF-Token": csrfToken
        }
    });

    return res.data;
};

const switchVote = async (questionId, userId) => {
    const res = await api.put(`${QUESTION_API_URL}/switchVote/${questionId}`, { userId }, {
        headers: {
            "X-CSRF-Token": csrfToken
        }
    });

    return res.data;
};

export { 
    getQuestionsByFilter, 
    getQuestionById, 
    addQuestion, 
    deleteQuestionById, 
    upvoteQuestion, 
    downvoteQuestion,
    removeVote,
    switchVote,
 };