import { useEffect, useState } from "react";
import "./index.css";
import User from "./user";
import { getAllUsers } from "../../../services/userService";

const UsersPage = ({ clickUser, handleNewQuestion}) => {
    const [ulist, setUlist] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            let res = await UsersPage.getAllUsers();
            setUlist(res || []);
        };

        fetchData().catch((e) => console.log(e));
    }, []);

    return (
        <>
            <div className="space_between right_padding">
                <div className="bold_title">{ulist.length} Users</div>
                <div className="bold_title">All Users</div>
                <button
                    className="bluebtn"
                    onClick={() => {
                        handleNewQuestion();
                    }}
                >
                    Ask a Question
                </button>
            </div>
            <div className="users_list right_padding">
                {ulist.map((u, idx) => (
                    <User key={idx} u={u} clickUser={clickUser} />
                ))}
            </div>
        </>
    );
};

UsersPage.getAllUsers = getAllUsers;
export default UsersPage;