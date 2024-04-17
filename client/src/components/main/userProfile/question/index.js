import "./index.css";
import { getMetaData } from "../../../../tool";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const YourQuestion = ({ q, handleDeleteQuestion }) => {
    return (
        <div className="question right_padding">
            <div className="postStats">
                <div>{q.answers.length || 0} answers</div>
                <div>{q.votes} votes</div>
                <div>{q.views} views</div>
            </div>
            <div className="question_mid">
                <div className="postTitle">{q.title}</div>
                <div className="question_tags">
                    {q.tags.map((tag, idx) => {
                        return (
                            <button
                                key={idx}
                                className="question_tag_button">
                                {tag.name}
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className="lastActivity">
                <div className="question_author">You</div>
                <div>&nbsp;</div>
                <div className="question_meta">
                    asked {getMetaData(new Date(q.ask_date_time))}
                </div>
            </div>
            <div className="delete_button_container">
                <button onClick={() => handleDeleteQuestion()}>
                    <FontAwesomeIcon icon="fa-regular fa-trash-can" transform="grow-20"/>
                </button>
            </div>
        </div>
    );
};

export default YourQuestion;