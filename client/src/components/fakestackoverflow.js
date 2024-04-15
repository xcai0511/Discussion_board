import React from "react";
import { useState } from "react";
import Header from "./header";
import Login from "./login";
import SignUp from "./signup";
import Main from "./main";

export default function FakeStackOverflow() {
    const [search, setSearch] = useState("");
    const [mainTitle, setMainTitle] = useState("All Questions");
    const [page, setPage] = useState("home");

    const setQuestionPage = (search = "", title = "All Questions") => {
        setSearch(search);
        setMainTitle(title);
        setPage("home");
    };

    const setLoginPage = () => {
        setPage("login");
    }

    const setSignUpPage = () => {
        setPage("signup");
    }

    let content;
    switch(page) {
        case "login":
            content = <Login loginUser={() => console.log("Login successful")} />;
            break;
        case "signup":
            content = <SignUp signUpUser={() => console.log("Sign up successful")} />;
            break;
        case "home":
        default:
            content =
                <>
                    <Main
                        title={mainTitle}
                        search={search}
                        setQuestionPage={setQuestionPage}
                    />
                </>
            break;
    }

    return (
        <>
            <Header search={search} setQuestionPage={setQuestionPage} setLoginPage={setLoginPage} setSignUpPage={setSignUpPage}/>
            {content}
        </>
    );
}