// Question Model Tests

const mockingoose = require('mockingoose');
const Question = require('../../models/questions');
const e = require("express");

describe('Question Model Tests', () => {

    // Before each test, reset mockingoose mocks
    beforeEach(() => {
        mockingoose.resetAll(); // Reset all mocks
    });

    // Test Case 1: Creating Multiple Valid Questions
    it('Should create multiple valid questions', async () => {
        const newQuestions = await Question.create([
            {
                title: 'Question 1',
                text: 'Question 1 text',
                tags: [],
                asked_by: 'askedUserId1',
                views: 0,
                answers: []
            },
            {
                title: 'Question 2',
                text: 'Question 2 text',
                tags: [],
                asked_by: 'askedUserId2',
                views: 0,
                answers: []
            }
        ]);
        expect(newQuestions.length).toEqual(2); // Ensure two questions are created
    });

    // Test Case 2: Creating Single Valid Question
    it('Should create a single valid question', async () => {
        const newQuestion = await Question.create(
            {
                title: 'Question',
                text: 'Question text',
                tags: [],
                asked_by: 'askedUserId',
                views: 0,
                answers: []
            });
        expect(newQuestion.title).toEqual('Question');
        expect(newQuestion.text).toEqual('Question text');
    });

    // Test Case 3: Retrieving a Question by ID
    it('Should retrieve a question by ID', async () => {
        // Create a test question
        const testQuestion =
            {
                _id: '66109aab2844a576c7fe373d',
                title: 'Test Question',
                text: 'Test question text',
                tags: [],
                asked_by: 'askedUserId',
                views: 0,
                answers: []
            };
        mockingoose(Question).toReturn(testQuestion, 'findOne');

        const retrievedQuestion = await Question.findById('66109aab2844a576c7fe373d');
        expect(retrievedQuestion._id.toString()).toEqual('66109aab2844a576c7fe373d'); // Ensure the retrieved question matches the test question
    });

    // Test Case 4: Deleting a Question
    it('Should delete a question', async () => {
        // Create a test question
        const testQuestion =
            {
                _id: 'testQuestionId',
                title: 'Test Question',
                text: 'Test question text',
                tags: [],
                asked_by: 'askedUserId',
                views: 0,
                answers: []
            };
        mockingoose(Question).toReturn(testQuestion, 'findOneAndDelete');

        await Question.findByIdAndDelete('testQuestionId');
        const deletedQuestion = await Question.findById('testQuestionId');
        expect(deletedQuestion).toBeUndefined(); // Ensure the question is deleted
    });

});