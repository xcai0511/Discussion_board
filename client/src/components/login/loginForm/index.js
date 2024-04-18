import React from 'react';
import Input from '../../main/baseComponents/input';
import Form from '../../main/baseComponents/form';
import "./index.css";

const LoginForm = ({ 
    email, 
    setEmail, 
    password, 
    setPassword, 
    errors, 
    handleLogin, 
    setQuestionPage, 
    setSignUpPage 
}) => {

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleLogin();
        }
    };

    return (
        <Form>
            <div className="back-button-container">
                <a href="#" onClick={() => setQuestionPage()}>Back</a>
            </div>
            <Input
                title="Email Address"
                id="loginUsernameInput"
                val={email}
                setState={setEmail}
                err={errors.email}
            />
            <Input
                title="Password"
                id="loginPasswordInput"
                val={password}
                setState={setPassword}
                err={errors.password}
                onKeyDown={handleEnter}
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
                <h5>Don&apos;t have an account?</h5><button onClick={setSignUpPage}>Sign Up</button>
            </div>
        </Form>
    );
};

export default LoginForm;
