import "./index.css";

const User = ({ u, clickUser }) => {
    return (
        <div
            className="userNode"
            onClick={() => {
                clickUser(u.username);
            }}
        >
            <img src={`images/${u.profileImage}`} className="userImage"/>
            <div className="userName">{u.username}</div>
        </div>
    );
};

export default User;