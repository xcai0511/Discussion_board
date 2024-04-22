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
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [csrfToken, setCsrfToken] = useState('token');

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

    const setProfilePage = () => {
        setPage("profile");
    }

    const loginUser = (user, token) => {
        setCsrfToken(token);
        setUser(user);
        setLoggedIn(true);
        setPage("home")
    }

    const logoutUser = () => {
        setUser(null);
        setLoggedIn(false);
        setPage("login");
    }
    const handleLogout = async () => {
        setLoggedIn(false);
        setUser(null);
        setPage("login");
    };
    
    let content;
    switch(page) {
        case "login":
            content = <Login loginUser={loginUser} setQuestionPage={setQuestionPage} setSignUpPage={setSignUpPage}/>;
            break;
        case "signup":
            content = <SignUp signUpUser={logoutUser} setQuestionPage={setQuestionPage} setLoginPage={setLoginPage} />;
            break;
        case "home":
        default:
            content =
                <>
                    <Main
                        title={mainTitle}
                        search={search}
                        setQuestionPage={setQuestionPage}
                        loggedIn={loggedIn}
                        user={user}
                        handleProfile={setProfilePage}
                        page={page}
                        setPage={setPage}
                        csrfToken={csrfToken}
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
                user={user}
                handleLogout={handleLogout}
                setProfilePage={setProfilePage}
                csrfToken={csrfToken}
            />
            {content}
        </>
    );
}