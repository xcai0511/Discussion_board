import "./index.css";
import { useState } from "react";
import { getMetaData } from "../../../../tool";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateQuestionWithTag } from "../../../../services/questionService";

const YourQuestion = ({ q, handleDeleteQuestion, csrfToken }) => {
    const [newTag, setNewTag] = useState("");
    const [showAddTagInput, setShowAddTagInput] = useState(false);
    const [tags, setTags] = useState(q.tags);
    const [tagErr, setTagErr] = useState("");

    // const validateTags = (tags) => {
    //     if (tags.length === 0) {
    //         setTagErr("Should have at least 1 tag");
    //         return false;
    //     } else if (tags.length > 5) {
    //         setTagErr("Cannot have more than 5 tags");
    //         return false;
    //     }

    //     for (let tag of tags) {
    //         if (tag.length > 20) {
    //             setTagErr("New tag length cannot be more than 20");
    //             return false;
    //         }
    //     }

    //     return true;
    // };

    // const checkExistingTags = async (newTags) => {
    //     try {
    //         const existingTags = await Promise.all(newTags.map(async (tag) => {
    //             const response = await updateQuestionWithTag(q._id, tag, csrfToken);
    //             return response.tags.some((existingTag) => existingTag.name.toLowerCase() === tag.toLowerCase());
    //         }));

    //         if (existingTags.some((exists) => exists)) {
    //             alert("One or more tags you are trying to add are already associated with this question");
    //             return true;
    //         }

    //         return false;
    //     } catch (error) {
    //         console.error("Error checking existing tags:", error);
    //         return true;
    //     }
    // };

    // TODO: Split into smaller functions
    const handleAddTag = async () => {
        try {
            // Reset tag error message
            setTagErr("");

            // Split the new tag string and filter out empty tags
            let newTags = newTag.split(" ").filter(tag => tag.trim() !== "");

            // Validate the number of tags
            if (newTags.length === 0) {
                setTagErr("Should have at least 1 tag");
                return;
            } else if (newTags.length > 5) {
                setTagErr("Cannot have more than 5 tags");
                return;
            }

            // Validate tag length
            for (let tag of newTags) {
                if (tag.length > 20) {
                    setTagErr("New tag length cannot be more than 20");
                    return;
                }
            }

            // Check if any of the new tags already exist in the list of tags associated with the question
            if (newTags.some(newTag => tags.some(tag => tag.name.toLowerCase() === newTag.toLowerCase()))) {
                alert("One or more tags you are trying to add are already associated with this question");
                return;
            }

            // Add each new tag to the question
            for (let tag of newTags) {
                const updatedQuestion = await updateQuestionWithTag(q._id, tag, csrfToken);
                console.log("Tag added successfully:", updatedQuestion);
                setTags(updatedQuestion.tags);
            }

            // Reset new tag input field
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
                    {tags.map((tag, idx) => {
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
                    {tagErr && <div className="tag_error">{tagErr}</div>}
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