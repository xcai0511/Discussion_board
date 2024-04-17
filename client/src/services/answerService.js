import { REACT_APP_API_URL, api } from "./config";

const ANSWER_API_URL = `${REACT_APP_API_URL}/answer`;

// To add answer
const addAnswer = async (qid, ans, csrfToken) => {
    const data = { qid: qid, ans: ans };
    const res = await api.post(`${ANSWER_API_URL}/addAnswer`, data, {
        headers: {
            "x-csrf-token": csrfToken
        }
    });

    return res.data;
};

// To edit answer
const editAnswer = async(qid, ans) => {
    const data = {qid: qid, ans: ans};
    const res = await api.put(`${ANSWER_API_URL}/editAnswer`, data)
    return res.data;
}

export { addAnswer, editAnswer };