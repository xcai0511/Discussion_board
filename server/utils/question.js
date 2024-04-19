const Tag = require("../models/tags");
const Question = require("../models/questions");

const addTag = async (tname) => {
    try {
        let tag = await Tag.findOne({ name: tname });
        if (!tag) {
            let newTag = new Tag({name: tname});
            newTag = await newTag.save();
            return newTag._id.toString();
        }
        return tag._id.toString();
    } catch (e) {
        console.log("Error adding tag: ", e);
        return null;
    }
};

// Retrieving questions based on sort type
const getQuestionsByOrder = async (order) => {
    try {
        let questions;

        switch (order) {
            case 'newest':
                questions = await getQuestionsSortedByDate('ask_date_time');
                break;
            case 'active':
                questions = await getActiveQuestions();
                break;
            case 'unanswered':
                questions = await getUnansweredQuestions();
                break;
            default:
                questions = await getQuestionsSortedByDate('ask_date_time');
                break;
        }

        return questions;
    } catch (e) {
        console.log(e);
    }
};

const getQuestionsSortedByDate = async (dateField) => {
    let questions = await Question.find().populate('tags');
    questions.sort((a, b) => b[dateField] - a[dateField]);
    return questions;
};

const getActiveQuestions = async () => {
    let questions = await Question.find().populate('tags').populate('answers');

    questions.forEach(question => {
        if (question.answers && question.answers.length > 0) {
            question.answers.sort((a, b) => b.ans_date_time - a.ans_date_time);
            question.answers = question.answers.slice(0, 1);
        }
    });

    questions.sort((a, b) => {
        const aHasAnswers = a.answers.length > 0;
        const bHasAnswers = b.answers.length > 0;

        if (aHasAnswers && !bHasAnswers) return -1;
        if (!aHasAnswers && bHasAnswers) return 1;

        const aLatestDate = aHasAnswers ? new Date(a.answers[0].ans_date_time) : new Date(a.ask_date_time);
        const bLatestDate = bHasAnswers ? new Date(b.answers[0].ans_date_time) : new Date(b.ask_date_time);

        let comparisonResult = bLatestDate - aLatestDate;
        if (comparisonResult === 0) {
            let aAskDate = new Date(a.ask_date_time);
            let bAskDate = new Date(b.ask_date_time);
            return bAskDate - aAskDate;
        }

        return comparisonResult;
    });

    return questions;
};

const getUnansweredQuestions = async () => {
    let questions = await Question.find().populate('tags');
    questions = questions.filter(question => question.answers.length === 0);
    questions.sort((a, b) => b.ask_date_time - a.ask_date_time);
    return questions;
};

// Filtering questions based on search parameters
const filterQuestionsBySearch = (qlist, search) => {
    if (!search) {
        return qlist;
    }

    const searchTerms = search.toLowerCase().match(/\[\s*([^\]]+)\s*\]|\S+/g);
    const filteredQuestions = qlist.filter(question => {
        return searchTerms.some(term => {
            if (term.startsWith("[") && term.endsWith("]")) {
                const tagName = term.substring(1, term.length - 1);
                return filterByTag(question, tagName);
            } else if (term.startsWith("user:")) {
                const authorId = term.substring(5);
                return filterByAuthor(question, authorId);
            } else if (term.startsWith("answers:")) {
                const answerCount = parseInt(term.substring(8));
                return filterByAnswerCount(question, answerCount);
            } else if (term.startsWith("score:")) {
                const scoreValue = parseInt(term.substring(6));
                return filterByScore(question, scoreValue);
            } else {
                return filterByTitle(question, term) || filterByText(question, term);
            }
        });
    });

    return filteredQuestions;
};

const filterByTag = (question, tagName) => {
    return question.tags.some(tag => tag.name.toLowerCase() === tagName.toLowerCase());
};

const filterByTitle = (question, searchTerm) => {
    return question.title.toLowerCase().includes(searchTerm);
};

const filterByText = (question, searchTerm) => {
    return question.text.toLowerCase().includes(searchTerm);
};

const filterByAuthor = (question, authorId) => {
    return question.asked_by.toLowerCase() === authorId.toLowerCase();
};

const filterByAnswerCount = (question, answerCount) => {
    return question.answers.length === answerCount;
};

const filterByScore = (question, scoreValue) => {
    return question.score >= scoreValue;
};

module.exports = { addTag, getQuestionsByOrder, filterQuestionsBySearch };