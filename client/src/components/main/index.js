import "./index.css";
import { useState } from "react";
import SideBarNav from "./sideBarNav";
import QuestionPage from "./questionPage";
import TagPage from "./tagPage";
import AnswerPage from "./answerPage";
import NewQuestion from "./newQuestion";
import SavedQuestionPage from "./savedQuestionPage";
import UserProfile from "./userProfile";
import UsersPage from "./usersPage";

const Main = ({ search = "", title, setQuestionPage, loggedIn, userEmail, username, handleProfile, page, setPage, csrfToken }) => {
    //const [page, setPage] = useState("home");
    const [questionOrder, setQuestionOrder] = useState("newest");
    const [qid, setQid] = useState("");
    let selected = "";
    let content = null;

    const handleQuestions = () => {
        setQuestionPage();
        setPage("home");
    };

    const handleTags = () => {
        setPage("tag");
    };

    const handleAnswer = (qid) => {
        setQid(qid);
        setPage("answer");
    };

    const clickTag = (tname) => {
        setQuestionPage("[" + tname + "]", tname);
        setPage("home");
    };

    const handleNewQuestion = () => {
        setPage("newQuestion");
    };

    const handleNewAnswer = () => {
        // setPage("newAnswer");
    };

    const handleSavedPosts = () => {
        setPage("savedPosts");
    };

    const handleProfilePage = () => {
        handleProfile();
        setPage("profile");
    }

    const handleUsers = () => {
        setPage("users");
    }

    const clickUser = (uname) => {
        setQuestionPage("users:" + uname, uname);
        setPage("home");
    };

    const getQuestionPage = (order = "newest", search = "") => {
        return (
            <QuestionPage
                title_text={title}
                order={order}
                search={search}
                setQuestionOrder={setQuestionOrder}
                clickTag={clickTag}
                handleAnswer={handleAnswer}
                handleNewQuestion={handleNewQuestion}
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
                    clickTag={clickTag}
                    handleNewQuestion={handleNewQuestion}
                />
            );
            break;
        }
        case "answer": {
            selected = "";
            content = (
                <AnswerPage
                    qid={qid}
                    handleNewQuestion={handleNewQuestion}
                    handleNewAnswer={handleNewAnswer}
                    loggedIn={loggedIn}
                    username={username}
                    csrfToken={csrfToken}
                />
            );
            break;
        }
        case "newQuestion": {
            selected = "";
            content =
                <NewQuestion
                    handleQuestions={handleQuestions}
                    username={username}
                    loggedIn={loggedIn}
                    csrfToken={csrfToken}
                />;
            break;
        }
        case "savedPosts": {
            selected = "s";
            content = <SavedQuestionPage
                setQuestionOrder={setQuestionOrder}
                clickTag={clickTag}
                handleAnswer={handleAnswer}
                loggedIn={loggedIn}
                userEmail={userEmail} />;
            break;
        }
        case "users": {
            selected = "u";
            content = (
                <UsersPage
                    clickUser={clickUser}
                    handleNewQuestion={handleNewQuestion}
                />
            );
            break;
        }
        case "profile": {
            selected = "p";
            content = <UserProfile username={username} contactEmail={userEmail} loggedIn={loggedIn} csrfToken={csrfToken} />;
            break;
        }
        default:
            selected = "q";
            content = getQuestionPage();
            break;
    }

    return (
        <div id="main" className="main">
            <SideBarNav
                selected={selected}
                handleQuestions={handleQuestions}
                handleTags={handleTags}
                handleSavedPosts={handleSavedPosts}
                handleUsers={handleUsers}
                handleProfile={handleProfilePage}
            />
            <div id="right_main" className="right_main">
                {content}
            </div>

        </div>
    );
};

export default Main;