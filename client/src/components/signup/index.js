import "./index.css";
import {useEffect, useState} from "react";
import Form from "../main/baseComponents/form";
import Input from "../main/baseComponents/input";
import { addUser } from "../../services/userService";
import { validateEmailAddress } from "../../tool"
import {checkLoginStatus, fetchCsrfToken} from "../../services/authService";

const SignUp = ({ signUpUser, setQuestionPage, setLoginPage }) => {
    const [usrn, setUsrn] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    const [usrnErr, setUsrnErr] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [passwordVerifyErr, setPasswordVerifyErr] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [csrfToken, setCsrfToken] = useState('');

    console.log(loggedIn);
    const handleSignUp = async () => {
        let isValid = true;

        if (!usrn) {
            setUsrnErr("Username cannot be empty");
            isValid = false;
        } else if (usrn.length > 20) {
            setUsrnErr("Usernama cannot be more than 20")
            isValid = false;
        }

        if (!email) {
            setEmailErr("Email address cannot be empty")
        }

        if (!password) {
            setPasswordErr("Password cannot be empty");
            isValid = false;
        } else if (password.length < 8) {
            setPasswordErr("Password is too short (minimum is 8 characters)");
            isValid = false;
        } else if (password.length > 20) {
            setPasswordErr("Password is too long (maximum is 20 characters");
            isValid = false;
        }

        if (!passwordVerify) {
            setPasswordVerifyErr("You must confirm your password");
            isValid = false;
        }

        if(password != passwordVerify) {
            setPasswordVerifyErr("Password does not match")
            isValid = false;
        }

        if (!validateEmailAddress(email)) {
            setEmailErr("Invalid email format.");
            isValid = false;
        }

        if (!isValid) {
            return;
        }
    
        try {
            const newUser = {
                username: usrn,
                contactemail: email,
                password: password,
                saved_questions: [] // Initialize as an empty array
            };

            console.log(newUser);
    
            // Make POST request to backend API to add new user
            const res = await addUser(newUser, csrfToken);
            if (res && res._id) {
                console.log("Signing up user");
                alert("Sign up success!");
                signUpUser();
            } else {
                setEmailErr("Account exists, please try again")
            }
        } catch (error) {
            console.error("Error signing up:", error); // TODO: Add error handling
        }
    };
    useEffect(() => {
        const initAuth = async () => {
            const token = await fetchCsrfToken();
            console.log('22',token)
            setCsrfToken(token);
            const status = await checkLoginStatus(token);
            console.log('11',status)
            setLoggedIn(status.loggedIn);
        };
        initAuth();
    }, []);


    return (
        <Form>
            <div className="back_button">
                <a href="#" onClick={() => setQuestionPage()}>Back</a>
            </div>
            <Input
                title={"Username"}
                id={"signUpUsernameInput"}
                val={usrn}
                setState={setUsrn}
                err={usrnErr}
            />
            <Input
                title={"Email Address"}
                id={"signUpEmailInput"}
                val={email}
                setState={setEmail}
                err={emailErr}
            />
            <Input
                title={"Password"}
                id={"signUpPasswordInput"}
                val={password}
                setState={setPassword}
                err={passwordErr}
            />
            <Input
                title={"Confirm Password"}
                id={"signUpPasswordVerifyInput"}
                val={passwordVerify}
                setState={setPasswordVerify}
                err={passwordVerifyErr}
            />
            <div className="btn_indicator_container">
                <button
                    className="form_postBtn"
                    onClick={handleSignUp}
                >
                    Sign Up
                </button>
                <div className="mandatory_indicator">
                    * indicates mandatory fields
                </div>
            </div>
            <div className="link_to_signup">
                <h5>Already have an account?</h5><button onClick={setLoginPage}>Login</button>
            </div>
        </Form>
    );
};

export default SignUp;
