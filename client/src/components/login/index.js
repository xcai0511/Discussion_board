import "./index.css";
import React, { useState } from 'react';
import Form from "../main/baseComponents/form";
import Input from "../main/baseComponents/input";
import {login, fetchCsrfToken} from "../../services/authService";

const Login = ({ loginUser, setQuestionPage, setSignUpPage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

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
            console.log("LOGGING IN with token: ", csrfToken);
            const res = await login(email, password, csrfToken);
            console.log("trying to log in with ==>", email, password);
            console.log(res);

            if (res.success) {
                setLoggedIn(true);
                setUser(res.user);
                loginUser(res.user, csrfToken);
                console.log("log in success");
            } else if (res.message === "email") {
                //alert("Email does not exist");
                setErrors({email: "Email does not exist"});
            } else if (res.message === "password") {
                setErrors({password: "Password does not match"});
            }
        } catch (error) {
            console.error("Error during login:", error);
            setErrors({ ...errors, form: error.message || 'An error occurred while logging in. Please try again later.' });
        }
    };

    return (
        <div>
            {loggedIn ? (
                <div>
                    <p>Welcome, {user.contactemail}!</p>
                </div>
            ) : (
                <Form>
                    <div className="back_button">
                        <a href="#" onClick={() => setQuestionPage()}>Back</a>
                    </div>
                    <Input
                        title={"Email Address"}
                        id={"loginUsernameInput"}
                        val={email}
                        setState={setEmail}
                        err={errors.email}
                    />
                    <Input
                        title={"Password"}
                        id={"loginPasswordInput"}
                        val={password}
                        setState={setPassword}
                        err={errors.password}
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
                    <div className="link_to_signup">
                        <h5>Don&apos;t have an account?</h5><button onClick={setSignUpPage}>Sign Up</button>
                    </div>
                </Form>
            )}
        </div>
    );
};

export default Login;
