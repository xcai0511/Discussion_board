import "./index.css";
import React, { useState } from 'react';
import {login, fetchCsrfToken} from "../../services/authService";
import LoginForm from "./loginForm";

const Login = ({ loginUser, setQuestionPage, setSignUpPage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });

    const handleLogin = async () => {
        if (!email || !password) {
            setErrors({
                email: email ? '' : 'Email cannot be empty',
                password: password ? '' : 'Password cannot be empty',
            });
            return;
        }

        try {
            const csrfToken = await fetchCsrfToken();
            const res = await login(email, password, csrfToken);

            if (res.success) {
                loginUser(res.user, csrfToken);
            } else if (res.message === "email") {
                setErrors({email: "Email does not exist"});
                setEmail("");
                setPassword("");
            } else if (res.message === "password") {
                setErrors({password: "Password does not match"});
                setPassword("")
            }
        } catch (error) {
            console.error("Error during login:", error);
            setErrors({ ...errors, form: error.message || 'An error occurred while logging in. Please try again later.' });
        }
    };

    return (
        <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            errors={errors}
            handleLogin={handleLogin}
            setQuestionPage={setQuestionPage}
            setSignUpPage={setSignUpPage}
        />
    );
};

export default Login;
