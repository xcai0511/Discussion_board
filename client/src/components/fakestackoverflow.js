import React from "react";
import { useState } from "react";
import Header from "./header";
import Login from "./login";
import SignUp from "./signup";
import Main from "./main";
//import { checkLoginStatus, fetchCsrfToken } from "../services/authService"

export default function FakeStackOverflow() {
    const [search, setSearch] = useState("");
    const [mainTitle, setMainTitle] = useState("All Questions");
    const [page, setPage] = useState("home");
    const [userEmail, setUserEmail] = useState('');
    const [username, setUsername] = useState('');
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
        console.log("CSRF TOKEN passed after loggin in: ", csrfToken);
        console.log("TOKEN passed after loggin in: ", token);
        setUser(user);
        setUserEmail(user.contactemail);
        setUsername(user.username);
        setLoggedIn(true);
        setPage("home")
    }

    const logoutUser = () => {
        setUser(null);
        setUserEmail("");
        setLoggedIn(false);
        setPage("login");
    }
    const handleLogout = async () => {
        setLoggedIn(false);
        setUser(null);
        setUserEmail('');
        setUsername('');
        setPage("login");
    };
    let content;
    switch(page) {
        case "login":
            content = <Login loginUser={loginUser}/>;
            console.log("USER: ", user);
            break;
        case "signup":
            content = <SignUp signUpUser={logoutUser} />;
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
                        userEmail={userEmail}
                        username={username}
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
                userEmail={userEmail} 
                handleLogout={handleLogout}
                setProfilePage={setProfilePage}
                csrfToken={csrfToken}
            />
            {content}
        </>
    );
}