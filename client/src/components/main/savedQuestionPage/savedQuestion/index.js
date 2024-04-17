import React, { useState, useEffect } from 'react';
import { getSavedQuestions } from "../../../../services/userService";
import Question from '../../questionPage/question/index';

const SavedPosts = ({ clickTag, handleAnswer, user, csrfToken }) => {
    const [savedQuestions, setSavedQuestions] = useState([]);

    useEffect(() => {
        const fetchSavedQuestions = async () => {

            let res = await getSavedQuestions(user.contactemail, csrfToken);
            setSavedQuestions(res || []);
        };

        fetchSavedQuestions().catch((e) => console.log(e));
    }, []);

    return (
        <div>
            {savedQuestions && savedQuestions.length > 0 ? (
                savedQuestions.map(question => (
                    <Question key={question._id} q={question} clickTag={clickTag} handleAnswer={handleAnswer} />
                ))
            ) : (
                <p>No saved questions found.</p>
            )}
        </div>
    );
};

export default SavedPosts;
