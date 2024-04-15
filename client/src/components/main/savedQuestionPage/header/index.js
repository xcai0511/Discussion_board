import "./index.css";

const SavedQuestionHeader = ({
    title_text,
}) => {
    return (
        <div>
            <div className="space_between right_padding">
                <div className="bold_title">{title_text}</div>
            </div>
        </div>
    );
};

export default SavedQuestionHeader;