import "./index.css";
import {useEffect, useState} from "react";
import { addUser } from "../../services/userService";
import { validateEmailAddress } from "../../tool"
import {fetchCsrfToken} from "../../services/authService";
import SignUpForm from "./signUpForm";

const SignUp = ({ signUpUser, setQuestionPage, setLoginPage }) => {
    const [usrn, setUsrn] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    const [usrnErr, setUsrnErr] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [passwordVerifyErr, setPasswordVerifyErr] = useState("");
    const [csrfToken, setCsrfToken] = useState('');

    const validateUsername = () => {
        if (!usrn) {
            setUsrnErr("Username cannot be empty");
            return false;
        } else if (usrn.length > 20) {
            setUsrnErr("Username cannot be more than 20 characters")
            return false;
        }
        setUsrnErr("");
        return true;
    }

    const validateEmail = () => {
        if (!email) {
            setEmailErr("Email address cannot be empty");
            return false;
        } else if (!validateEmailAddress(email)) {
            setEmailErr("Invalid email format.");
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
            return false;
        } else if (password.length > 20) {
            setPasswordErr("Password is too long (max is 20 characters)");
            return false;
        }
        setPasswordErr("");
        return true;
    };

    const validatePasswordMatch = () => {
        if (password !== passwordVerify) {
            setPasswordVerifyErr("Password does not match");
            return false;
        }
        setPasswordVerifyErr("");
        return true;
    };

    const handleSignUp = async () => {
        let isValid = true;

        isValid = validateUsername() && isValid;
        isValid = validateEmail() && isValid;
        isValid = validatePassword() && isValid;
        isValid = validatePasswordMatch() && isValid;

        if (!isValid) {
            return;
        }
    
        try {
            const newUser = {
                username: usrn,
                contactemail: email,
                password: password,
                saved_questions: []
            };
    
            const res = await addUser(newUser, csrfToken);
            if (res && res._id) {
                alert("Sign up success!");
                signUpUser();
            } else {
                setEmailErr("Account exists, please try again")
            }
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };

    useEffect(() => {
        const initAuth = async () => {
            const token = await fetchCsrfToken();
            setCsrfToken(token);
        };
        initAuth();
    }, []);

    return (
        <SignUpForm
            usrn={usrn}
            setUsrn={setUsrn}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            passwordVerify={passwordVerify}
            setPasswordVerify={setPasswordVerify}
            usrnErr={usrnErr}
            emailErr={emailErr}
            passwordErr={passwordErr}
            passwordVerifyErr={passwordVerifyErr}
            handleSignUp={handleSignUp}
            setQuestionPage={setQuestionPage}
            setLoginPage={setLoginPage}
        />
    );
};

export default SignUp;
