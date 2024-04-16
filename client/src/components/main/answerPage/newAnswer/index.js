import "./index.css";
import { useState } from "react";
import Form from "../../baseComponents/form";
//import Input from "../../baseComponents/input";
import Textarea from "../../baseComponents/textarea";
import { validateHyperlink } from "../../../../tool";
import { addAnswer } from "../../../../services/answerService";

const NewAnswer = ({ qid, handleAnswer, username  }) => {
    //const [usrn, setUsrn] = useState("");
    const [text, setText] = useState("");
    const [textErr, setTextErr] = useState("");
    const postAnswer = async () => {
        let isValid = true;

        // if (!usrn) {
        //     setUsrnErr("Username cannot be empty");
        //     isValid = false;
        // }

        if (!text) {
            setTextErr("Answer text cannot be empty");
            isValid = false;
        }

        // Hyperlink validation
        if (!validateHyperlink(text)) {
            setTextErr("Invalid hyperlink format.");
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        const answer = {
            text: text,
            ans_by: username,
            ans_date_time: new Date(),
        };

        const res = await addAnswer(qid, answer);
        if (res && res._id) {
            handleAnswer ();
            //setUsrn("");
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

export default NewAnswer;
