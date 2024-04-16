import { useEffect, useState } from "react";
import { getMetaData } from "../../../tool";
import Answer from "./answer";
import AnswerHeader from "./header";
import "./index.css";
import QuestionBody from "./questionBody";
import { getQuestionById } from "../../../services/questionService";
import { saveQuestionToUser } from "../../../services/userService";
import NewAnswer from "./newAnswer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchCsrfToken } from "../../../services/authService";

// Component for the Answers page
const AnswerPage = ({ qid, handleNewQuestion, loggedIn, username }) => {
    const [csrfToken, setCsrfToken] = useState('');
    const [question, setQuestion] = useState({});
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [vote, setVote] = useState(null);

    const handleNewAnswer = async (qid) => {
        try {
            const updatedQuestion = await getQuestionById(qid);
            setQuestion(updatedQuestion || {});
        } catch (error) {
            console.error("Error fetching updated question:", error);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            let res = await getQuestionById(qid);
            setQuestion(res || {});
        };
        fetchData().catch((e) => console.log(e));
    }, [qid]);

    useEffect(() => {
        const initAuth = async () => {
            const token = await fetchCsrfToken();
            setCsrfToken(token);
        };
        initAuth();
    });

    const handleBookmarkClick = async () => {
        setIsBookmarked(!isBookmarked);
        try {
            const token = await fetchCsrfToken(); // Fetch CSRF token
            const res = await saveQuestionToUser(username, isBookmarked, token, qid); // Pass qid to the function
            console.log(res);
        } catch (error) {
            console.error("Error saving question:", error);
        }
    };

    const handleVote = (type) => {
        if (vote === type) {
            // Clear vote if the same button is clicked again
            setVote(null);
        } else {
            setVote(type);
        }
    };

    return (
        <>
            <AnswerHeader
                ansCount={
                    question && question.answers && question.answers.length
                }
                title={question && question.title}
                handleNewQuestion={handleNewQuestion}
            />
            <div className="left_main">
                <button
                    id="upvote_button"
                    className={`vote_button ${vote === "upvote" ? "voted" : ""}`}
                    onClick={() => handleVote("upvote")}
                >
                    <FontAwesomeIcon
                        icon="fa-solid fa-caret-up"
                        transform="grow-10"
                    />
                </button>
                <div className="question_score">
                    <h2>{question.score}</h2>
                </div>
                <button
                    id="downvote_button"
                    className={`vote_button ${vote === "downvote" ? "voted" : ""}`}
                    onClick={() => handleVote("downvote")}
                >
                    <FontAwesomeIcon
                        icon="fa-solid fa-caret-down"
                        transform="grow-10"
                    />
                </button>
                <div>
                    <button className="bookmark_button" onClick={() => handleBookmarkClick(csrfToken)}>
                        <FontAwesomeIcon icon="fa-solid fa-bookmark" transform="grow-10" color={isBookmarked ? "rgb(252, 172, 142)" : "black"} />
                    </button>
                </div>
            </div>
            <QuestionBody
                views={question && question.views}
                text={question && question.text}
                askby={question && question.asked_by}
                meta={question && getMetaData(new Date(question.ask_date_time))}
            />
            {question &&
                question.answers &&
                question.answers.map((a, idx) => (
                    <Answer
                        key={idx}
                        text={a.text}
                        ansBy={a.ans_by}
                        meta={getMetaData(new Date(a.ans_date_time))}
                    />
                ))}
            {loggedIn ? (
                <NewAnswer qid={qid} handleAnswer={() => handleNewAnswer(qid)} username={username}/>
            ) : (
                <div>Please log in to add comments</div>
            )}

        </>
    );
};

export default AnswerPage;
