import "./index.css";
import React, { useState } from 'react';
import Form from "../main/baseComponents/form";
import Input from "../main/baseComponents/input";
//import { getUserByEmail } from "../../services/userService";
import {login, fetchCsrfToken} from "../../services/authService";

const Login = ({ loginUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    //const [csrfToken, setCsrfToken] = useState('');

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
            console.log("trying to log in with ==>", email, password, res);
            if (res.success) {
                setLoggedIn(true);
                setUser(res.user);
                loginUser(res.user, csrfToken);
                console.log("log in success");
            } else {
                setErrors({ ...errors, form: 'Invalid credentials' });
            }
        } catch (error) {
            console.error("Error during login:", error);
            setErrors({ ...errors, form: 'An error occurred while logging in. Please try again later.' });
        }
    };

    // const handleLogout = async () => {
    //     try {
    //         await logout(csrfToken);
    //         setLoggedIn(false);
    //         setUser(null);
    //     } catch (error) {
    //         console.error('Error logging out:', error);
    //     }
    // };
    //
    // useEffect(() => {
    //     const initAuth = async () => {
    //         const token = await fetchCsrfToken();
    //         setCsrfToken(token);
    //     };
    //     initAuth();
    // }, []);

    return (
        <div>
            {loggedIn ? (
                <div>
                    <p>Welcome, {user.contactemail}!</p>
                </div>
            ) : (
                <Form>
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
                </Form>
            )}
        </div>
    );
};

export default Login;
