import {useState} from "react";
import Form from "../baseComponents/form";
import Input from "../baseComponents/input";
import Textarea from "../baseComponents/textarea";
import "./index.css";
import { validateHyperlink } from "../../../tool";

import { addQuestion } from "../../../services/questionService";

const NewQuestion = ({ handleQuestions, user, loggedIn, csrfToken }) => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [tag, setTag] = useState("");
    const [titleErr, setTitleErr] = useState("");
    const [textErr, setTextErr] = useState("");
    const [tagErr, setTagErr] = useState("");

    const validateTitle = () => {
        if (!title) {
            setTitleErr("Title cannot be empty");
            return false;
        } else if (title.length > 100) {
            setTitleErr("Title cannot be more than 100 characters");
            return false;
        }
        setTitleErr("");
        return true;
    };

    const validateText = () => {
        if (!text) {
            setTextErr("Question text cannot be empty");
            return false;
        } else if (!validateHyperlink(text)) {
            setTextErr("Invalid hyperlink format.");
            return false;
        }
        setTextErr("");
        return true;
    };

    const validateTags = (tags) => {
        if (tags.length === 0) {
            setTagErr("Should have at least 1 tag");
            return false;
        } else if (tags.length > 5) {
            setTagErr("Cannot have more than 5 tags");
            return false;
        } else {
            for (let tag of tags) {
                if (tag.length > 20) {
                    setTagErr("New tag length cannot be more than 20");
                    return false;
                }
            }
        }
        setTagErr("");
        return true;
    };

    const validateInputs = () => {
        let isValid = true;
    
        isValid = validateTitle() && isValid;
        isValid = validateText() && isValid;
    
        const tags = tag.split(" ").filter((tag) => tag.trim() !== "");
        if (!validateTags(tags)) {
            isValid = false;
        }
        
        return isValid;
    };

    const postQuestion = async () => {
        const isValid = validateInputs();

        if (!isValid) return;

        const tags = Array.from(new Set(tag.split(" ").map(tag => tag.trim()).filter(tag => tag !== "")));

        const question = {
            title: title,
            text: text,
            tags: tags,
            asked_by: user.username,
            ask_date_time: new Date(),
        };

        const res = await NewQuestion.addQuestion(question, csrfToken);
        if (res && res._id) {
            handleQuestions();
        }
    };

    return (
        <>
            {loggedIn ? (
                <>
                    <Form>
                        <Input
                            title={"Question Title"}
                            hint={"Limit title to 100 characters or less"}
                            id={"formTitleInput"}
                            val={title}
                            setState={setTitle}
                            err={titleErr}
                        />
                        <Textarea
                            title={"Question Text"}
                            hint={"Add details"}
                            id={"formTextInput"}
                            val={text}
                            setState={setText}
                            err={textErr}
                        />
                        <Input
                            title={"Tags"}
                            hint={"Add keywords separated by whitespace"}
                            id={"formTagInput"}
                            val={tag}
                            setState={setTag}
                            err={tagErr}
                        />
                        <div className="btn_indicator_container">
                            <button
                                className="form_postBtn"
                                onClick={() => {
                                    postQuestion();
                                }}
                            >
                                Post Question
                            </button>
                            <div className="mandatory_indicator">
                                * indicates mandatory fields
                            </div>
                        </div>
                    </Form>
                </>
            ) : (
                <div className="login_indicator">Please log in to ask questions</div>
            )}
        </>


    );
};

NewQuestion.addQuestion = addQuestion;

export default NewQuestion;
