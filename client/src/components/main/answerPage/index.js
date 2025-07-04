import { useEffect, useState } from "react";
import { getMetaData } from "../../../tool";
import Answer from "./answer";
import AnswerHeader from "./header";
import "./index.css";
import QuestionBody from "./questionBody";
import { getQuestionById, upvoteQuestion, downvoteQuestion } from "../../../services/questionService";
import { getUserById, saveQuestionToUser } from "../../../services/userService";
import NewAnswer from "./newAnswer";
import { VotingButtons, BookmarkButton } from "./buttons/index";

const AnswerPage = ({ qid, handleNewQuestion, loggedIn, user, csrfToken }) => {
    const [question, setQuestion] = useState({});
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [vote, setVote] = useState(null);
    const [score, setScore] = useState("");

    const handleNewAnswer = async (qid) => {
        try {
            const updatedQuestion = await AnswerPage.getQuestionById(qid);
            setQuestion(updatedQuestion || {});
        } catch (error) {
            console.error("Error fetching updated question:", error);
        }
    };

    const handleBookmarkClick = async () => {
        if (!loggedIn) {
            alert("Please log in to bookmark questions.");
            return;
        }

        const bookmarkStatus = !isBookmarked;
        setIsBookmarked(bookmarkStatus);
        try {
            await AnswerPage.saveQuestionToUser(user.username, bookmarkStatus, qid, csrfToken);
        } catch (error) {
            console.error("Error saving question:", error);
        }
    };

    const handleVote = (type) => {
        if (!loggedIn) {
            alert("Please log in to vote.");
            return;
        }
        if (vote === type) {
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
            const res = await AnswerPage.upvoteQuestion(qid, user._id, csrfToken);
            setScore(res.updatedQuestion.score);
        } catch (e) {
            console.error("Error upvoting question:", e);
        }
    }

    const handleDownvote = async () => {
        try {
            const res = await AnswerPage.downvoteQuestion(qid, user._id, csrfToken);
            setScore(res.updatedQuestion.score);
        } catch (e) {
            console.error("Error downvoting question:", e);
        }
    }

    useEffect(() => {
        const fetchData = async () => {

            let res = await AnswerPage.getQuestionById(qid);
            setQuestion(res || {});
            setScore(res.score);

            if (!loggedIn) {
                return;
            }

            let currUser = await AnswerPage.getUserById(user._id);
            // Check if the current question ID exists in the user's saved_questions array
            if (currUser.saved_questions.includes(qid)) {
                setIsBookmarked(true);
            }
            // Check if the current question is already been voted by user
            if (currUser.upvoted_questions.includes(qid)) {
                setVote("upvote");
            }
            if (currUser.downvoted_questions.includes(qid)) {
                setVote("downvote");
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
            <div className="container">
                <div className="left_main actions">
                    <VotingButtons vote={vote} handleVote={handleVote} score={score} />
                    <div className="bookmark_button_wrapper">
                        <BookmarkButton isBookmarked={isBookmarked} handleBookmarkClick={handleBookmarkClick} />
                    </div>
                </div>
                <div className="body">
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
                </div>
            </div>

            {loggedIn ? (
                <NewAnswer qid={qid} handleAnswer={() => handleNewAnswer(qid)} user={user} csrfToken={csrfToken}/>
            ) : (
                <div className="log_in_msg">Please log in to add comments</div>
            )}

        </>
    );
};
AnswerPage.getQuestionById = getQuestionById;
AnswerPage.upvoteQuestion = upvoteQuestion;
AnswerPage.downvoteQuestion = downvoteQuestion;
AnswerPage.getUserById = getUserById;
AnswerPage.saveQuestionToUser = saveQuestionToUser
export default AnswerPage;
