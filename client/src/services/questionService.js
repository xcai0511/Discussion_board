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

const upvoteQuestion = async (qid, uid, csrfToken) => {
    const data = {uid: uid};
    const res = await api.put(`${QUESTION_API_URL}/upvote/${qid}`, data, {
        headers: {
            "x-csrf-Token": csrfToken
        }
    });
    return res.data;
}

// To update the question with the new tag
const updateQuestionWithTag = async (qid, newTag, csrfToken) => {
    const data = { qid: qid, newTag: newTag };
    const res = await api.put(`${QUESTION_API_URL}/updateQuestionWithTag`, data, {
        headers: {
            "X-CSRF-Token": csrfToken
        }
    });
    return res.data;
};

const downvoteQuestion = async (qid, uid, csrfToken) => {
    const data = {uid: uid};
    const res = await api.put(`${QUESTION_API_URL}/downvote/${qid}`, data, {
        headers: {
            "x-csrf-Token": csrfToken
        }
    });
    return res.data;
}

export { 
    getQuestionsByFilter, 
    getQuestionById, 
    addQuestion, 
    deleteQuestionById, 
    upvoteQuestion,
    updateQuestionWithTag,
    downvoteQuestion
 };
