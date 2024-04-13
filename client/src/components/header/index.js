import "./index.css";
import { useState } from "react";

const Header = ({ search, setQuestionPage, loginUser }) => {
    const [val, setVal] = useState(search);
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
            <div>
                <button className="login_button" onClick={loginUser}><div>Login</div></button>
                <button className="signup_button"><div>Sign Up</div></button>
            </div>
        </div>
    );
};

export default Header;
