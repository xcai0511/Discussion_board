import "./index.css";
import React, { useState } from 'react';
import {login, fetchCsrfToken} from "../../services/authService";
//import LoginForm from "./loginForm";
import Input from '../main/baseComponents/input';
import Form from '../main/baseComponents/form';

const Login = ({ loginUser, setQuestionPage, setSignUpPage }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [user, setUser] = useState(null);

    const handleLogin = async () => {
        if (!email) setEmailError("Email cannot be empty");
        if (!password) setPasswordError("Password cannot be empty")

        try {
            const csrfToken = await fetchCsrfToken();
            const res = await login(email, password, csrfToken);

            if (res.success) {
                setLoggedIn(true);
                setUser(res.user);
                loginUser(res.user, csrfToken);
            } else if (res.message === "email") {
                setEmailError("Email does not exist");
                setEmail("");
                setPassword("");
            } else if (res.message === "password") {
                setPasswordError("Password does not match");
                setPassword("")
            }
        } catch (error) {
            console.error("Error during login:", error);
            //setErrors({ ...errors, form: error.message || 'An error occurred while logging in. Please try again later.' });
        }
    };

    return (
        <div>
            {loggedIn ? (
                <div>
                    <p>Welcome, {user.contactemail}!</p>
                </div>
            ) : (
                <Form>
                    <div className="back-button-container">
                        <a href="#" onClick={() => setQuestionPage()}>Back</a>
                    </div>
                    <Input
                        title={"Email Address"}
                        id={"loginUsernameInput"}
                        val={email}
                        setState={setEmail}
                        err={emailError}
                    />
                    <Input
                        title={"Password"}
                        id={"loginPasswordInput"}
                        val={password}
                        setState={setPassword}
                        err={passwordError}
                    />
                    <div className="btn_indicator_container">
                        <button
                            className="form_postBtn"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                        <div className="mandatory_indicator">
                            * indicates mandatory fields
                        </div>
                    </div>
                    <div className="link-to-signup">
                        <h5>Don&apos;t have an account?</h5><button onClick={setSignUpPage}>Sign Up</button>
                    </div>
                </Form>
            )}
        </div>
    );
};

export default Login;
