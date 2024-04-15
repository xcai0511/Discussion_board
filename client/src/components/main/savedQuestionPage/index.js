import "./index.css";
import SavedQuestionHeader from "./header";
import SavedPosts from "./savedQuestion";

const SavedQuestionPage = ({
    title_text = "Saved Questions",
    setQuestionOrder,
    clickTag,
    handleAnswer,
    loggedIn,
    userEmail
}) => {
    return (
        <>
            {loggedIn ? (
                <>
                    <SavedQuestionHeader
                        title_text={title_text}
                        setQuestionOrder={setQuestionOrder}
                    />
                    <div id="question_list" className="question_list">
                        <SavedPosts
                            clickTag={clickTag}
                            handleAnswer={handleAnswer}
                            userEmail={userEmail}/>
                    </div>
                </>
            ) : (
                <div> Please login to see saved posts</div>
            )}
            {/*<SavedQuestionHeader*/}
            {/*    title_text={title_text}*/}
            {/*    setQuestionOrder={setQuestionOrder}*/}
            {/*/>*/}
            {/*<div id="question_list" className="question_list">*/}
            {/*    <SavedPosts*/}
            {/*        clickTag={clickTag}*/}
            {/*        handleAnswer={handleAnswer}*/}
            {/*        userEmail={userEmail}/>*/}
            {/*</div>*/}
        </>
    );
};

export default SavedQuestionPage;