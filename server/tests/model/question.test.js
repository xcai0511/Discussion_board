// Question Model Tests

const mockingoose = require('mockingoose');
const Question = require('../../models/questions');

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
        expect(newQuestion.length).toEqual(1); // Ensure the question is created
    });

    // Test Case 3: Creating a Question with Missing Required Field (title)
    it('Should throw an error when creating a question with missing required field (title)', async () => {
        await expect(Question.create(
            {
                text: 'Question text',
                tags: [],
                asked_by: 'askedUserId',
                views: 0,
                answers: []
            })).rejects.toThrow(); // Not including a title should throw an error
    });

    // Test Case 4: Creating a Question with Missing Required Field (text)
    it('Should throw an error when creating a question with missing required field (text)', async () => {
        await expect(Question.create(
            {
                title: 'Question',
                tags: [],
                asked_by: 'askedUserId',
                views: 0,
                answers: []
            })).rejects.toThrow(); // Not including text should throw an error
    });

    // Test Case 5: Creating a User with Invalid Data Type
    it('Should throw an error when creating a question with invalid data type', async () => {
        await expect(Question.create(
            {
                title: 'Question',
                text: 123, // Adding text as integer instead of string
                tags: [],
                asked_by: 'askedUserId',
                views: 0,
                answers: []
            })).rejects.toThrow(); // Adding an incorrect data type should throw an error
    });

    // Test Case 6: Retrieving a Question by ID
    it('Should retrieve a question by ID', async () => {
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
        mockingoose(Question).toReturn(testQuestion, 'findOne');

        const retrievedQuestion = await Question.findById('testQuestionId');
        expect(retrievedQuestion._id).toEqual('testQuestionId'); // Ensure the retrieved question matches the test question
    });

    // Test Case 7: Updating a Question
    it('Should update a question', async () => {
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
        mockingoose(Question).toReturn(testQuestion, 'findOneAndUpdate');

        const updatedQuestion = await Question.findByIdAndUpdate('testQuestionId',
            {
                title: 'Updated Question'
            },
            {
                new: true
            });
        expect(updatedQuestion.title).toEqual('Updated Question'); // Ensure the question title is updated
    });

    // Test Case 8: Deleting a Question
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
        expect(deletedQuestion).toBeNull(); // Ensure the question is deleted
    });

});