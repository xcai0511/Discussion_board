import "./index.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const VotingButton = ({ type, vote, handleVote }) => (
    <button
        id={`${type}vote_button`}
        className={`vote_button ${vote === type ? "voted" : ""}`}
        onClick={() => handleVote(type)}
    >
        <FontAwesomeIcon icon={`fa-solid fa-caret-${type === "up" ? "up" : "down"}`} transform="grow-10" />
    </button>
);

const BookmarkButton = ({ isBookmarked, handleBookmarkClick }) => (
    <button className="bookmark_button" onClick={handleBookmarkClick}>
        <FontAwesomeIcon icon="fa-solid fa-bookmark" transform="grow-10" color={isBookmarked ? "rgb(252, 172, 142)" : "black"} />
    </button>
);

export { VotingButton, BookmarkButton };