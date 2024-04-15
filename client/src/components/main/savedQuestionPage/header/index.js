import "./index.css";

const SavedQuestionHeader = ({
    title_text,
    qcnt,
    setQuestionOrder,
}) => {
    return (
        <div>
            <div className="space_between right_padding">
                <div className="bold_title">{title_text}</div>
            </div>
            <div>
                <div className="space_between right_padding">
                    <div id="question_count">{qcnt} saved questions</div>
                </div>
            </div>
        </div>
    );
};

export default SavedQuestionHeader;