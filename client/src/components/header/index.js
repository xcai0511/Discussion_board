import "./index.css";
import { useState } from "react";

const Header = ({ search, setQuestionPage }) => {
    const [val, setVal] = useState(search);
    return (
        <div id="header" className="header">
            <div></div>
            <div className="title">Fake Stack Overflow</div>
            <input
                id="searchBar"
                className="form-control"
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
                <button className="btn btn-outline-primary btn-sm">Login</button>
                <button className="btn btn-primary btn-sm">Sign Up</button>
            </div>
        </div>
    );
};

export default Header;
