import "./index.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const VotingButtons = ({ vote, handleVote, score }) => {
    return(
        <>
            <button
                id="upvote_button"
                className={`vote_button ${vote === "upvote" ? "voted" : ""}`}
                onClick={() => handleVote("upvote")}
            >
                <FontAwesomeIcon icon="fa-solid fa-caret-up" transform="grow-10" />
            </button>
            <div className="question_score">
                <h2>{score}</h2>
            </div>
            <button
                id="downvote_button"
                className={`vote_button ${vote === "downvote" ? "voted" : ""}`}
                onClick={() => handleVote("downvote")}
            >
                <FontAwesomeIcon icon="fa-solid fa-caret-down" transform="grow-10" />
            </button>
        </>
    );

};

export const BookmarkButton = ({ isBookmarked, handleBookmarkClick }) => {
    return(
        <button className="bookmark_button" onClick={handleBookmarkClick}>
            <FontAwesomeIcon icon="fa-solid fa-bookmark" transform="grow-10"
                             color={isBookmarked ? "rgb(252, 172, 142)" : "black"}/>
        </button>
    );

};

// export default {VotingButtons, BookmarkButton};