import React, { useState, useEffect } from 'react';
import { getSavedQuestions } from "../../../../services/userService";
import Question from '../../questionPage/question/index';

const SavedPosts = ({ clickTag, handleAnswer }) => {
    const [savedQuestions, setSavedQuestions] = useState([]);

    useEffect(() => {
        const fetchSavedQuestions = async () => {
            // let userId = await getUserById;
            let userId = '661d1bd23b3185af303733a4'; // TODO: Retrieve User ID from logged in user
            let res = await getSavedQuestions(userId);
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
