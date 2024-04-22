import "./index.css";
import {useState} from "react";
import Form from "../../baseComponents/form";
import Textarea from "../../baseComponents/textarea";
import { validateHyperlink } from "../../../../tool";
import { addAnswer } from "../../../../services/answerService";

const NewAnswer = ({ qid, handleAnswer, user, csrfToken  }) => {
    const [text, setText] = useState("");
    const [textErr, setTextErr] = useState("");
    const postAnswer = async () => {
        let isValid = true;

        if (!text) {
            setTextErr("Answer text cannot be empty");
            isValid = false;
        }

        // Hyperlink validation
        if (!NewAnswer.validateHyperlink(text)) {
            setTextErr("Invalid hyperlink format.");
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        const answer = {
            text: text,
            ans_by: user.username,
            ans_date_time: new Date(),
        };

        const res = await NewAnswer.addAnswer(qid, answer, csrfToken);
        if (res && res._id) {
            handleAnswer();
            setText("");
        }
    };
    return (
        <Form>
            <Textarea
                title={"Answer Text"}
                id={"answerTextInput"}
                val={text}
                setState={setText}
                err={textErr}
            />
            <div className="btn_indicator_container">
                <button
                    className="form_postBtn"
                    onClick={() => {
                        postAnswer();
                    }}
                >
                    <div>Post Answer</div>
                </button>
                <div className="mandatory_indicator">
                    * indicates mandatory fields
                </div>
            </div>
        </Form>
    );
};

NewAnswer.validateHyperlink = validateHyperlink;
NewAnswer.addAnswer = addAnswer;

export default NewAnswer;
