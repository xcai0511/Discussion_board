import React from 'react';
import Input from '../../main/baseComponents/input';
import Form from '../../main/baseComponents/form';
import "./index.css";

const LoginForm = ({
                       email,
                       setEmail,
                       password,
                       setPassword,
                       emailError,
                       passwordError,
                       handleLogin,
                       setQuestionPage,
                       setSignUpPage
                   }) => {

    return (
        <Form>
            <div className="back-button-container" onClick={() => setQuestionPage()}>
                <a href="#">Back</a>
            </div>
            <Input
                title="Email Address"
                id="loginEmailInput"
                val={email}
                setState={setEmail}
                err={emailError}
            />
            <Input
                title="Password"
                id="loginPasswordInput"
                val={password}
                setState={setPassword}
                err={passwordError}
            />
            <div className="btn-indicator-container">
                <button
                    className="loginBtn"
                    onClick={handleLogin}
                >
                    Login
                </button>
                <div className="mandatory-field-text">
                    * indicates mandatory fields
                </div>
            </div>
            <div className="link-to-signup">
                <h5>Don&apos;t have an account?</h5>
                <button
                    className="signupBtn"
                    onClick={setSignUpPage}>Sign Up</button>
            </div>
        </Form>
    );
};

export default LoginForm;