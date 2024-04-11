import "./index.css";
import { useState } from "react";
import SideBarNav from "./sideBarNav";
import QuestionPage from "./questionPage";
import TagPage from "./tagPage";

const Main = ({ search = "", title, setQuestionPage }) => {
    const [page, setPage] = useState("home");
    const [questionOrder, ] = useState("newest");
    let selected = "";
    let content = null;

    const handleQuestions = () => {
        setQuestionPage();
        setPage("home");
    };

    const handleTags = () => {
        setPage("tag");
    };

    const handleSavedPosts = () => {
        setPage("savedPosts")
    }

    const getQuestionPage = (order = "newest", search = "") => {
        return (
            <QuestionPage
                title_text={title}
                order={order}
                search={search}
                // setQuestionOrder={setQuestionOrder}
                // clickTag={clickTag}
                // handleAnswer={handleAnswer}
                // handleNewQuestion={handleNewQuestion}
            />
        );
    };
    
    switch (page) {
        case "home": {
            selected = "q";
            content = getQuestionPage(questionOrder.toLowerCase(), search);
            break;
        }
        case "tag": {
            selected = "t";
            content = (
                <TagPage
                    // clickTag={clickTag}
                    // handleNewQuestion={handleNewQuestion}
                />
            );
            break;
        }
        case "savedPosts": {
            selected = "s";
            break;
        }
        // case "answer": {
        //     selected = "";
        //     content = (
        //         <AnswerPage
        //             qid={qid}
        //             handleNewQuestion={handleNewQuestion}
        //             handleNewAnswer={handleNewAnswer}
        //         />
        //     );
        //     break;
        // }
        // case "newQuestion": {
        //     selected = "";
        //     content = <NewQuestion handleQuestions={handleQuestions} />;
        //     break;
        // }
        // case "newAnswer": {
        //     selected = "";
        //     content = <NewAnswer qid={qid} handleAnswer={handleAnswer} />;
        //     break;
        // }
        default:
            selected = "q";
            // content = getQuestionPage();
            break;
    }

    return (
        <div id="main" className="main">
            <SideBarNav
                selected={selected}
                handleQuestions={handleQuestions}
                handleTags={handleTags}
                handleSavedPosts={handleSavedPosts}
            />
            <div id="right_main" className="right_main">
                {content}
            </div>
        </div>
    );
};

export default Main;
