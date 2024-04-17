import "./index.css";

const User = ({ u, clickUser }) => {
    return (
        <div
            className="userNode"
            onClick={() => {
                clickUser(u.username);
            }}
        >
            <div className="userImage">{u.profileImage}</div>
            <div className="userName">{u.username}</div>
        </div>
    );
};

export default User;