import "./index.css";
import { useState } from "react";

const Header = ({ search, setQuestionPage, setLoginPage, setSignUpPage, loggedIn, userEmail, handleLogout, setProfilePage }) => {
    const [val, setVal] = useState(search);

    const handleProfile = () => {
        console.log("profile button clicked");
        setProfilePage();
    };

    return (
        <div id="header" className="header">
            <div></div>
            <div className="title">Fake Stack Overflow</div>
            <input
                id="searchBar"
                placeholder="Search..."
                type="text"
                value={val}
                onChange={(e) => {
                    setVal(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        setQuestionPage(e.target.value, "Search Results");
                    }
                }}
            />
            {loggedIn ? (
                <div className="user-info">
                    <button className="user_email" onClick={handleProfile}><div>{userEmail}</div></button>
                    <button className="logout_button" onClick={handleLogout}><div>Logout</div></button>
                </div>
            ) : (
                <div>
                    <button className="login_button" onClick={setLoginPage}><div>Login</div></button>
                    <button className="signup_button" onClick={setSignUpPage}><div>Sign Up</div></button>
                </div>
            )}
        </div>
    );
};

export default Header;
