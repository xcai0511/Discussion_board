import React from "react";
import Form from "../../main/baseComponents/form";
import Input from "../../main/baseComponents/input";
import "./index.css";

const SignUpForm = ({ 
    usrn, setUsrn, 
    email, setEmail, 
    password, setPassword, 
    passwordVerify, setPasswordVerify, 
    usrnErr, emailErr, 
    passwordErr, passwordVerifyErr, 
    handleSignUp, setQuestionPage, 
    setLoginPage 
}) => {

    return (
        <Form>
            <div className="back_button_container">
                <a href="#" onClick={() => setQuestionPage()}>Back</a>
            </div>
            <Input
                title="Username"
                id="signUpUsernameInput"
                val={usrn}
                setState={setUsrn}
                err={usrnErr}
            />
            <Input
                title="Email Address"
                id="signUpEmailInput"
                val={email}
                setState={setEmail}
                err={emailErr}
            />
            <Input
                title="Password"
                id="signUpPasswordInput"
                val={password}
                setState={setPassword}
                err={passwordErr}
            />
            <Input
                title="Confirm Password"
                id="signUpPasswordVerifyInput"
                val={passwordVerify}
                setState={setPasswordVerify}
                err={passwordVerifyErr}
            />
            <div className="btn_indicator_container">
                <button className="form_postBtn" onClick={handleSignUp}>Sign Up</button>
                <div className="mandatory_indicator">* indicates mandatory fields</div>
            </div>
            <div className="link_to_login">
                <h5>Already have an account?</h5><button onClick={setLoginPage}>Login</button>
            </div>
        </Form>
    );
};

export default SignUpForm;