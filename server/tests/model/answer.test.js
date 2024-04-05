// Answer Model Tests

const mockingoose = require('mockingoose');
const { default: mongoose } = require("mongoose");
const Answer = require('../../models/answers');

describe('Answer Model Tests', () => {

    // Variable to hold the ID of the newly created test answer
    let answerId;

    // Before each test, reset mockingoose mocks
    beforeEach(() => {
        mockingoose.resetAll(); // Reset all mocks
    });

    // Test Case 1: Create a Valid Answer
    it('Should create a valid answer', async () => {
        const newAnswer = await Answer.create({
            text: 'This is the text for a test answer',
            ans_by: 'test_admin'
        });
        expect(newAnswer).toBeDefined();
    });

    // TODO: Test Case 2: Creating Multiple Valid Answers

    // TODO: Test Case 3: Creating a Question with Missing Required Field (text)

    // TODO: Test Case 4: Creating a Question with Missing Required Field (ans_by)

    // TODO: Test Case 5: Creating a User with Invalid Data Type(s) (text)

    // TODO: Test Case 6: Creating a User with Invalid Data Type(s) (ans_by)

    // TODO: Test Case 7: Retrieve an Answer by ID

    // TODO: Test Case 8: Update an Answer by ID

    // TODO: Test Case 9: Delete an Answer by ID

});