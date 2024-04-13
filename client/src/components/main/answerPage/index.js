import { useEffect, useState } from "react";
import { getMetaData } from "../../../tool";
import Answer from "./answer";
import AnswerHeader from "./header";
import "./index.css";
import QuestionBody from "./questionBody";
import { getQuestionById } from "../../../services/questionService";
import NewAnswer from "./newAnswer";

// Component for the Answers page
const AnswerPage = ({ qid, handleNewQuestion }) => {
    const [question, setQuestion] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            let res = await getQuestionById(qid);
            setQuestion(res || {});
        };
        fetchData().catch((e) => console.log(e));
    }, [qid]);

    const handleNewAnswer = async (qid) => {
        try {
            const updatedQuestion = await getQuestionById(qid);
            setQuestion(updatedQuestion || {});
        } catch (error) {
            console.error("Error fetching updated question:", error);
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
            {/* <button
                className="bluebtn ansButton"
                onClick={() => {
                    handleNewAnswer();
                }}
            >
                Answer Question
            </button> */}
            <NewAnswer qid={qid} handleAnswer={() => handleNewAnswer(qid)} />
        </>
    );
};

export default AnswerPage;
