import { useState } from "react";
import Form from "../../baseComponents/form";
import Input from "../../baseComponents/input";
import Textarea from "../../baseComponents/textarea";
import { validateHyperlink } from "../../../../tool";

const NewQuestionForm = ({ onSubmit, csrfToken }) => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [tag, setTag] = useState("");

    const [titleErr, setTitleErr] = useState("");
    const [textErr, setTextErr] = useState("");
    const [tagErr, setTagErr] = useState("");

    const validateInputs = () => {
        let isValid = true;

        if (!title) {
            setTitleErr("Title cannot be empty");
            isValid = false;
        } else if (title.length > 100) {
            setTitleErr("Title cannot be more than 100 characters");
            isValid = false;
        }

        if (!text) {
            setTextErr("Question text cannot be empty");
            isValid = false;
        }

        // Hyperlink validation
        if (!validateHyperlink(text)) {
            setTextErr("Invalid hyperlink format.");
            isValid = false;
        }

        let tags = tag.split(" ").filter((tag) => tag.trim() !== "");
        if (tags.length === 0) {
            setTagErr("Should have at least 1 tag");
            isValid = false;
        } else if (tags.length > 5) {
            setTagErr("Cannot have more than 5 tags");
            isValid = false;
        }

        for (let tag of tags) {
            if (tag.length > 20) {
                setTagErr("New tag length cannot be more than 20");
                isValid = false;
                break;
            }
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) return;

        const question = {
            title: title,
            text: text,
            tags: tag.split(" ").filter((tag) => tag.trim() !== ""),
            ask_date_time: new Date(),
        };

        try {
            await onSubmit(question, csrfToken);
            setTitle("");
            setText("");
            setTag("");
        } catch (error) {
            console.error("Error submitting question:", error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
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
                <button className="form_postBtn" type="submit" onClick={handleSubmit}>
                    Post Question
                </button>
                <div className="mandatory_indicator">* indicates mandatory fields</div>
            </div>
        </Form>
    );
};

export default NewQuestionForm;