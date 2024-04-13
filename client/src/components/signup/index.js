import "./index.css";
import { useState } from "react";
import Form from "../main/baseComponents/form";
import Input from "../main/baseComponents/input";

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

        const res = await handleSignUp();
        if (res && res._id) {
            signUpUser();
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
                    Login
                </button>
                <div className="mandatory_indicator">
                    * indicates mandatory fields
                </div>
            </div>
        </Form>
    );
};

export default SignUp;
