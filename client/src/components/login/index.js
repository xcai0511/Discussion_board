import "./index.css";
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Form from "../main/baseComponents/form";
import Input from "../main/baseComponents/input";
import { getUserByEmail } from "../../services/userService";

const Login = ({ loginUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState("")
    const [csrfToken, setCsrfToken] = useState('');

    const fetchCsrfToken = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:8000/auth/csrf-token', { withCredentials: true });
            setCsrfToken(response.data.csrfToken);
        } catch (error) {
            console.error('Error fetching CSRF token:', error);
        }
    }, []);

    const checkLoginStatus = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:8000/check-login', {
                headers: {
                    'X-CSRF-Token': csrfToken,
                },
                withCredentials: true,
            });
            console.log("check log in status response.data ==> ", response.data);
            const resLoggedIn = response.data.loggedIn;
            setLoggedIn(resLoggedIn);
            if(resLoggedIn)
                setUser(response.data.user.username);
        } catch (error) {
            console.error('Error checking login status:', error);
        }
    }, [csrfToken]);

    useEffect(() => {
        const fetchCsrfAndCheckLoginStatus = async () => {
            await fetchCsrfToken();
            await checkLoginStatus();
        };

        // Call the function only when the component mounts
        if (!csrfToken) {
            fetchCsrfAndCheckLoginStatus();
        }
    }, [csrfToken, fetchCsrfToken, checkLoginStatus]);

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8000/logout', null, {
                headers: {
                    'X-CSRF-Token': csrfToken,
                },
                withCredentials: true,
            });

            setLoggedIn(false);
            setUser("");
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

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
            const response = await axios.post('http://localhost:8001/login', { email, password }, {
                headers: {
                    'X-CSRF-Token': csrfToken,
                },
                withCredentials: true,
            });

            setLoggedIn(response.data.success);
            setUser(response.data.user.username);
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
