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
    const [userEmail, setUserEmail] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

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

    const handleLogin = async (user) => {
        setUserEmail(user.contactemail);
        setLoggedIn(true);
    };

    const handleLogout = async () => {
        setUserEmail('');
        setLoggedIn(false);
    };

    let content;
    switch(page) {
        case "login":
            content = <Login loginUser={handleLogin}/>;
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
            <Header 
                search={search} 
                setQuestionPage={setQuestionPage} 
                setLoginPage={setLoginPage} 
                setSignUpPage={setSignUpPage}
                loggedIn={loggedIn} 
                userEmail={userEmail} 
                handleLogout={handleLogout}
            />
            {content}
        </>
    );
}