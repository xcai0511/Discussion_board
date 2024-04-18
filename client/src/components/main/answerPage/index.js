import { useEffect, useState } from "react";
import { getMetaData } from "../../../tool";
import Answer from "./answer";
import AnswerHeader from "./header";
import "./index.css";
import QuestionBody from "./questionBody";
import { getQuestionById, upvoteQuestion, downvoteQuestion } from "../../../services/questionService";
import { saveQuestionToUser } from "../../../services/userService";
import NewAnswer from "./newAnswer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Component for the Answers page
const AnswerPage = ({ qid, handleNewQuestion, loggedIn, user, csrfToken }) => {
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

    const handleBookmarkClick = async () => {
        // If user is not logged in
        if (!loggedIn) {
            alert("Please log in to bookmark questions.");
            return;
        }

        const bookmarkStatus = !isBookmarked;
        setIsBookmarked(bookmarkStatus);
        try {
            const res = await saveQuestionToUser(user.username, bookmarkStatus, qid, csrfToken);
            console.log(res);
        } catch (error) {
            console.error("Error saving question:", error);
        }
    };

    const handleVote = (type) => {
        if (!loggedIn) {
            alert("Please log in to vote.");
            return;
        }
        console.log("clicking: ", type);
        if (vote === type) {
            console.log("clicking: ", type);
            // Clear vote if the same button is clicked again
            setVote(null);
        } else {
            setVote(type);
        }

        if (type === "upvote") {
            handleUpvote();
        } else {
            handleDownvote();
        }
    };

    const handleUpvote = async () => {
        try {
            const res = await upvoteQuestion(qid, user._id, csrfToken);
            console.log(res);
        } catch (e) {
            console.error("Error upvoting question:", e);
        }
    }

    const handleDownvote = async () => {
        try {
            const res = await downvoteQuestion(qid, user._id, csrfToken);
            console.log(res);
        } catch (e) {
            console.error("Error downvoting question:", e);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            let res = await getQuestionById(qid);
            setQuestion(res || {});

            // Check if the current question ID exists in the user's saved_questions array
            if (loggedIn && user.saved_questions.includes(qid)) {
                setIsBookmarked(true);
            }
        };
        fetchData().catch((e) => console.log(e));
    }, [qid, loggedIn, user]);
    return (
        <>
            <AnswerHeader
                ansCount={question && question.answers && question.answers.length}
                title={question && question.title}
                handleNewQuestion={handleNewQuestion}
            />
            <div className="left_main">
                <button
                    id="upvote_button"
                    className={`vote_button ${vote === "upvote" ? "voted" : ""}`}
                    onClick={() => handleVote("upvote")}
                >
                    <FontAwesomeIcon icon="fa-solid fa-caret-up" transform="grow-10" />
                </button>
                <div className="question_score">
                    <h2>{question.score}</h2>
                </div>
                <button
                    id="downvote_button"
                    className={`vote_button ${vote === "downvote" ? "voted" : ""}`}
                    onClick={() => handleVote("downvote")}
                >
                    <FontAwesomeIcon icon="fa-solid fa-caret-down" transform="grow-10" />
                </button>
                <div>
                    <button className="bookmark_button" onClick={() => handleBookmarkClick()}>
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
                <NewAnswer qid={qid} handleAnswer={() => handleNewAnswer(qid)} user={user} csrfToken={csrfToken}/>
            ) : (
                <div>Please log in to add comments</div>
            )}

        </>
    );
};

export default AnswerPage;
