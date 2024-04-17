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

const getQuestionsByOrder = async (order) => {
    try {
        let questions;
        switch (order) {
            case 'newest':
                questions = await Question.find().populate('tags');
                questions.sort((a, b) => {
                    if (!a.ask_date_time) {return 1;}
                    if (!b.ask_date_time) {return -1;}
                    return b.ask_date_time - a.ask_date_time;
                })
                break;
            case 'active':
                questions = await Question.find().populate('tags').populate('answers');
                questions.forEach(question => {
                    if (question.answers && question.answers.length > 0) {
                        question.answers.sort((a, b) => {
                            if (!a.ans_date_time) {return 1;}
                            if (!b.ans_date_time) {return -1;}
                            return b.ans_date_time - a.ans_date_time;
                        })
                        question.answers = question.answers.slice(0, 1);
                    }
                });
                questions.sort((a, b) => {
                    const aHasAnswers = a.answers.length > 0;
                    const bHasAnswers = b.answers.length > 0;
                    if (aHasAnswers && !bHasAnswers) {return -1;}
                    if (!aHasAnswers && bHasAnswers) {return 1;}
                    let aLatestDate = aHasAnswers ? new Date(a.answers[0].ans_date_time) : new Date(a.ask_date_time);
                    let bLatestDate = bHasAnswers ? new Date(b.answers[0].ans_date_time) : new Date(b.ask_date_time);

                    let comparisonResult = bLatestDate - aLatestDate;
                    if (comparisonResult === 0) {
                        let aAskDate = new Date(a.ask_date_time);
                        let bAskDate = new Date(b.ask_date_time);
                        return bAskDate - aAskDate;
                    }

                    return comparisonResult;
                });
                break;
            case 'unanswered':
                questions = await Question.find().populate('tags');
                questions = questions.filter(question => question.answers.length === 0);
                questions.sort((a, b) => {
                    if (!a.ask_date_time) {return 1;}
                    if (!b.ask_date_time) {return -1;}
                    return b.ask_date_time - a.ask_date_time;
                })
                break;
            default:
                questions = await Question.find().populate('tags');
                questions.sort((a, b) => {
                    if (!a.ask_date_time) {return 1;}
                    if (!b.ask_date_time) {return -1;}
                    return b.ask_date_time - a.ask_date_time;
                })
                break;
        }
        return questions;
    } catch (e) {
        console.log(e);
    }
}

const filterQuestionsBySearch = (qlist, search) => {
    if (!search) {
        return qlist;
    }
    const searchTerms = search.toLowerCase().match(/\[\s*([^\]]+)\s*\]|\S+/g);
    const filteredQuestions = qlist.filter(question => {
        const tagMatch = searchTerms.some(term => {
            if (term.startsWith("[") && term.endsWith("]")) {
                const tagName = term.substring(1, term.length - 1);
                return question.tags.some(tag => tag.name.toLowerCase() === tagName.toLowerCase());
            }
            return false;
        });
        const titleMatch = searchTerms.some(term => {
            if (!(term.startsWith("[") && term.endsWith("]"))) {
                return question.title.toLowerCase().includes(term);
            }
            return false;
        })
        const textMatch = searchTerms.some(term => {
            if (!(term.startsWith("[") && term.endsWith("]"))) {
                return question.text.toLowerCase().includes(term);
            }
            return false;
        })
        const authorMatch = searchTerms.some(term => {
            if (term.startsWith("user:")) {
                const authorId = term.substring(5); // Extract author ID from the term
                return question.asked_by.toLowerCase() === authorId.toLowerCase();
            }
            return false;
        })
        const ansCountMatch = searchTerms.some(term => {
            if (term.startsWith("answers:")) {
                const answerCount = parseInt(term.substring(8));
                return question.answers.length === answerCount;
            }
            return false;
        })
        const scoreMatch = searchTerms.some(term => {
            if (term.startsWith("score:")) {
                const scoreValue = parseInt(term.substring(6));
                return question.score >= scoreValue;
            }
        })

        return tagMatch || titleMatch || textMatch || authorMatch || ansCountMatch || scoreMatch;
    })
    return filteredQuestions;
}

module.exports = { addTag, getQuestionsByOrder, filterQuestionsBySearch };