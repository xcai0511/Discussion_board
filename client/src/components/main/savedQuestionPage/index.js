import "./index.css";
import SavedQuestionHeader from "./header";
import Question from "../questionPage/question";

import { getQuestionsByFilter } from "../../../services/questionService";
import { useEffect, useState } from "react";

const SavedQuestion = ({
    title_text = "Saved Questions",
    order,
    search,
    setQuestionOrder,
    clickTag,
    handleAnswer,
}) => {
    const [qlist, setQlist] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            let res = await getQuestionsByFilter(order, search);
            setQlist(res || []);
        };
        fetchData().catch((e) => console.log(e));
    }, [order, search]);
    return (
        <>
            <SavedQuestionHeader
                title_text={title_text}
                qcnt={qlist.length}
                setQuestionOrder={setQuestionOrder}
            />

            // TODO: Change so it retrieves saved question list instead
            <div id="question_list" className="question_list">
                {qlist.map((q, idx) => (
                    <Question
                        q={q}
                        key={idx}
                        clickTag={clickTag}
                        handleAnswer={handleAnswer}
                    />
                ))}
            </div>
        </>
    );
};

export default SavedQuestion;