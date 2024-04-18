import "./index.css";
import { useState } from "react";
import { getMetaData } from "../../../../tool";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateQuestionWithTag } from "../../../../services/questionService";

const YourQuestion = ({ q, handleDeleteQuestion, csrfToken }) => {
    const [newTag, setNewTag] = useState("");
    const [showAddTagInput, setShowAddTagInput] = useState(false);

    const handleAddTag = async () => {
        try {
            const updatedQuestion = await updateQuestionWithTag(q._id, newTag, csrfToken);
            console.log("Tag added successfully:", updatedQuestion);
            setNewTag("");
            setShowAddTagInput(false);
        } catch (error) {
            console.error("Error adding tag:", error);
        }
    };

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
                    <button className="addTag_button" onClick={() => setShowAddTagInput(!showAddTagInput)}>
                        {showAddTagInput ? "Cancel" : "Add Tags"}
                    </button>
                    {showAddTagInput && (
                        <>
                            <input
                                type="text"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                placeholder="Enter new tag"
                            />
                            <button onClick={handleAddTag}>Add</button>
                        </>
                    )}
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