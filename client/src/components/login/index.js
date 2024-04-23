import "./index.css";
import React, { useState } from 'react';
import {login, fetchCsrfToken} from "../../services/authService";
import { validateEmailAddress } from "../../tool"
import LoginForm from "./loginForm";

const Login = ({ loginUser, setQuestionPage, setSignUpPage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailErr, setEmailErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");

    const validateEmail = () => {
        if (!email) {
            setEmailErr("Email address cannot be empty");
            return false;
        } else if (!validateEmailAddress(email)) {
            setEmailErr("Invalid email format.");
            setEmail('');
            return false;
        }
        setEmailErr("");
        return true;
    }

    const validatePassword = () => {
        if (!password) {
            setPasswordErr("Password cannot be empty");
            return false;
        } else if (password.length < 8) {
            setPasswordErr("Password is too short (min 8 characters)");
            setPassword('');
            return false;
        } else if (password.length > 20) {
            setPasswordErr("Password is too long (max is 20 characters)");
            setPassword('');
            return false;
        }
        setPasswordErr("");
        return true;
    };
    const handleLogin = async () => {
        let isValid = true;

        isValid = validateEmail() && isValid;
        isValid = validatePassword() && isValid;

        if (!isValid) {
            return;
        }

        try {
            const csrfToken = await Login.fetchCsrfToken();
            const res = await Login.login(email, password, csrfToken);

            if (res.success) {
                loginUser(res.user, csrfToken);
            } else if (res.message === "email") {
                setEmailErr("Email does not exist");
                setEmail("");
                setPassword("");
            } else if (res.message === "password") {
                setPasswordErr("Password does not match");
                setPassword("")
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    return (
        <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            emailError={emailErr}
            passwordError={passwordErr}
            handleLogin={handleLogin}
            setQuestionPage={setQuestionPage}
            setSignUpPage={setSignUpPage}
        />
    );
};

Login.login = login;
Login.fetchCsrfToken = fetchCsrfToken;
export default Login;
