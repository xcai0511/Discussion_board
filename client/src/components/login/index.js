import "./index.css";
import { useState } from "react";
import Form from "../main/baseComponents/form";
import Input from "../main/baseComponents/input";
import Textarea from "../main/baseComponents/textarea";

const Login = ({ loginUser }) => {
    const [usrn, setUsrn] = useState("");
    const [password, setPassword] = useState("");
    const [usrnErr, setUsrnErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const handleLogin = async () => {
        let isValid = true;

        if (!usrn) {
            setUsrnErr("Username cannot be empty");
            isValid = false;
        }

        if (!password) {
            setPasswordErr("Password cannot be empty");
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        const res = await handleLogin();
        if (res && res._id) {
            loginUser();
        }
    };
    return (
        <Form>
            <Input
                title={"Username"}
                id={"loginUsernameInput"}
                val={usrn}
                setState={setUsrn}
                err={usrnErr}
            />
            <Textarea
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
