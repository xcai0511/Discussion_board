import "./index.css";

const SideBarNav = ({ selected = "", handleQuestions, handleTags, handleSavedPosts, handleProfile }) => {
    return (
        <div id="sideBarNav" className="sideBarNav">
            <div
                id="menu_question"
                className={`menu_button ${
                    selected === "q" ? "menu_selected" : ""
                }`}
                onClick={() => {
                    handleQuestions();
                }}
            >
                Questions
            </div>
            <div
                id="menu_tag"
                className={`menu_button ${
                    selected === "t" ? "menu_selected" : ""
                }`}
                onClick={() => {
                    handleTags();
                }}
            >
                Tags
            </div>
            <div
                id="menu_savedPosts"
                className={`menu_button ${
                    selected === "s" ? "menu_selected" : ""
                }`}
                onClick={() => {
                    handleSavedPosts();
                }}
            >
                Saved Posts
            </div>
            <div
                id="menu_profile"
                className={`menu_button ${
                    selected === "p" ? "menu_selected" : ""
                }`}
                onClick={() => {
                    handleProfile();
                }}
            >
                Profile
            </div>
        </div>
    );
};

export default SideBarNav;
