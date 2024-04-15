import "./index.css";
import SavedQuestionHeader from "./header";
import SavedPosts from "./savedQuestion";

const SavedQuestionPage = ({
    title_text = "Saved Questions",
    setQuestionOrder,
}) => {
    return (
        <>
            <SavedQuestionHeader
                title_text={title_text}
                setQuestionOrder={setQuestionOrder}
            />
            <div id="question_list" className="question_list">
                <SavedPosts />
            </div>
        </>
    );
};

export default SavedQuestionPage;