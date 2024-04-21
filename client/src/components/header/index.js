import "./index.css";
import {useState} from "react";
import {logout} from "../../services/authService";
import SearchBar from "./searchBar";
import UserInfo from "./userInfo";

const Header = ({ 
    search, 
    setQuestionPage, 
    setLoginPage, 
    setSignUpPage, 
    loggedIn, 
    user, 
    handleLogout, 
    setProfilePage, 
    csrfToken 
}) => {

    const [val, setVal] = useState(search);

    const handleProfile = () => {
        setProfilePage();
    };

    const handleLogoutClick = async () => {
        try {
            const response = await logout(csrfToken);
            if (response.success) {
                handleLogout();
            }
        } catch (e) {
            console.error('Error logging out:', e);
        }
    }

    const handleSearchEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setQuestionPage(e.target.value, 'Search Results');
        }
    };

    return (
        <div id="header" className="header">
            <div></div>
            <div className="title">Fake Stack Overflow</div>
            <SearchBar
                value={val}
                onChange={(e) => setVal(e.target.value)}
                onEnter={handleSearchEnter}
            />
            {loggedIn ? (
                <UserInfo
                    user={user}
                    onProfileClick={handleProfile}
                    onLogoutClick={handleLogoutClick}
                />
            ) : (
                <div className="header_buttons">
                    <button className="login_button" onClick={setLoginPage}><div>Login</div></button>
                    <button className="signup_button" onClick={setSignUpPage}><div>Sign Up</div></button>
                </div>
            )}
        </div>
    );
};

Header.logout = logout;
export default Header;
