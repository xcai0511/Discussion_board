import "./index.css";
import { useState } from "react";
import Form from "../main/baseComponents/form";
import Input from "../main/baseComponents/input";
import { addUser } from "../../services/userService";

const SignUp = ({ signUpUser }) => {
    const [usrn, setUsrn] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    const [usrnErr, setUsrnErr] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [passwordVerifyErr, setPasswordVerifyErr] = useState("");
    const handleSignUp = async () => {
        let isValid = true;

        if (!usrn) {
            setUsrnErr("Username cannot be empty");
            isValid = false;
        }

        if (!email) {
            setEmailErr("Email address cannot be empty")
        }

        if (!password) {
            setPasswordErr("Password cannot be empty");
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
            const res = await addUser(newUser);
            console.log(res);
            if (res && res._id) {
                console.log("Signing up user");
                signUpUser();
            } else {
                return; // TODO: Add error handling
            }
        } catch (error) {
            console.error("Error signing up:", error); // TODO: Add error handling
        }
    };

    return (
        <Form>
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
        </Form>
    );
};

export default SignUp;
