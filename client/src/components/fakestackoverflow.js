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
    //const [csrfToken, setCsrfToken] = useState('');

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

    const loginUser = (user) => {
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
        // try {
        //     const result = await logout(csrfToken);
        //     if (result.success) {
        //         setLoggedIn(false);
        //         setUser(null);
        //         setUserEmail('');
        //         setUsername('');
        //         setPage("login");
        //     }
        // } catch (error) {
        //     console.error('Error logging out:', error);
        // }
        setLoggedIn(false);
        setUser(null);
        setUserEmail('');
        setUsername('');
        setPage("login");
    };

    // useEffect(() => {
    //     const initAuth = async () => {
    //         const token = await fetchCsrfToken();
    //         setCsrfToken(token);
    //         const status = await checkLoginStatus(token);
    //         setLoggedIn(status.loggedIn);
    //         if (status.loggedIn) {
    //             setUser(status.user);
    //         }
    //     };
    //     initAuth();
    // }, []);

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
            />
            {content}
        </>
    );
}