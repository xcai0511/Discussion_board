import "./index.css";
import React, { useState, useEffect } from 'react';
import Form from "../main/baseComponents/form";
import Input from "../main/baseComponents/input";
import {login, checkLoginStatus, fetchCsrfToken} from "../../services/authService";

const Login = ({ loginUser, setQuestionPage, setSignUpPage  }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [csrfToken, setCsrfToken] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            setErrors({
                email: email ? '' : 'Email cannot be empty',
                password: password ? '' : 'Password cannot be empty',
            });
            return;
        }

        try {
            const res = await login(email, password, csrfToken);
            console.log("trying to log in with ==>", email, password, res);
            if (res.success) {
                setLoggedIn(true);
                setUser(res.user);
                loginUser(res.user);
                console.log("log in success");
            } else {
                setErrors({ ...errors, form: 'Invalid credentials' });
            }
        } catch (error) {
            console.error("Error during login:", error);
            setErrors({ ...errors, form: 'An error occurred while logging in. Please try again later.' });
        }
    };

    useEffect(() => {
        const initAuth = async () => {
            const token = await fetchCsrfToken();
            setCsrfToken(token);
            const status = await checkLoginStatus(token);
            setLoggedIn(status.loggedIn);
            if (status.loggedIn) {
                setUser(status.user);
                loginUser(status.user);
            }
        };
        initAuth();
    }, []);

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
