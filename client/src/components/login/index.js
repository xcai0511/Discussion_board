import "./index.css";
import { useState } from "react";
import Form from "../main/baseComponents/form";
import Input from "../main/baseComponents/input";
import { getUserByEmail } from "../../services/userService";

const Login = ({ loginUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const handleLogin = async () => {
        let isValid = true;

        if (!email) {
            setEmailErr("Username cannot be empty");
            isValid = false;
        }

        if (!password) {
            setPasswordErr("Password cannot be empty");
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        try {
            // Make API call to get user by email
            const res = await getUserByEmail(email);
            if (res && res.password === password) {
                // If password matches, login successful
                setPasswordErr("");
                loginUser();
                console.log("User successfully logged in," + email);

                // Clear all fields
                setEmail("");
                setPassword("");
            } else {
                // If password doesn't match or user not found, display error
                setPasswordErr("Your credentials do not match our database. Please try again.");
            }
        } catch (error) {
            console.error("Error occurred while logging in:", error);
            setPasswordErr("An error occurred while logging in. Please try again later.");
        }
    };
    return (
        <Form>
            <Input
                title={"Email Address"}
                id={"loginUsernameInput"}
                val={email}
                setState={setEmail}
                err={emailErr}
            />
            <Input
                title={"Password"}
                id={"loginPasswordInput"}
                val={password}
                setState={setPassword}
                err={passwordErr}
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
        </Form>
    );
};

export default Login;
