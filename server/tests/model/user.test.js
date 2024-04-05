// User Model Tests

const mockingoose = require('mockingoose');
const { default: mongoose } = require("mongoose");
const User = require('../../models/users');
const Question = require('../../models/questions');

describe('User Model Tests', () => {

    // Before each test, reset mockingoose mocks
    beforeEach(() => {
        mockingoose.resetAll(); // Reset all mocks
    });

    // TODO: Test Case 1: Creating a Valid User

    // TODO: Test Case 2: Creating a User with Missing Required Fields (username)

    // TODO: Test Case 3: Creating a User with Missing Required Fields (contactemail)

    // TODO: Test Case 4: Creating a User with Missing Required Fields (password)

    // TODO: Test Case 5: Creating a User with Invalid Data Type(s)

    // TODO: Test Case 6: Retrieving a User by ID

    // TODO: Test Case 7: Updating a User

    // TODO: Test Case 8: Deleting a User

    // Test Case 9: Retrieving Question IDs from Saved Questions
    it('Should retrieve question IDs from saved_questions field', async () => {
        // Test User
        const newUser = await User.create({
            username: 'testuser',
            contactemail: 'testuser@example.com',
            password: 'testpassword',
            saved_questions: []
        });

        // Test Question 1
        const testQuestion1 = await Question.create({
            title: 'Test Question 1',
            text: 'Test question 1 text',
            tags: [],
            asked_by: newUser._id,
            views: 0,
            answers: []
        });
        // Test Question 2
        const testQuestion2 = await Question.create({
            title: 'Test Question 2',
            text: 'Test question 2 text',
            tags: [],
            asked_by: newUser._id,
            views: 0,
            answers: []
        });

        // Update the user's saved_questions field with the IDs of the test questions
        await User.findByIdAndUpdate(newUser._id, { saved_questions: [testQuestion1._id, testQuestion2._id] });

        // Retrieve the user and check if the saved_questions field contains the correct question IDs
        const retrievedUser = await User.findById(newUser._id);
        expect(retrievedUser.saved_questions).toEqual(expect.arrayContaining([testQuestion1._id, testQuestion2._id]));
    });

});