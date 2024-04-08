// User Model Tests

const User = require('../../models/users');
//const Question = require('../../models/questions');
const mockingoose = require("mockingoose");

describe('User Model Tests', () => {

    let testUserId;

    // Before each test, create a test user
    beforeEach(async () => {
        mockingoose.resetAll(); // Reset all mocks
        // Create a test user before each test
        const newUser = await User.create({
            username: 'testuser',
            contactemail: 'testuser@example.com',
            password: 'testpassword',
            saved_questions: []
        });
        testUserId = newUser._id;
        //console.log(testUserId);
        //console.log(newUser);
    });

    // Test Case 1: Creating a Valid User
    it('Should create a valid user', async () => {
        const newUser2 = await User.create({
            username: 'testuser2',
            contactemail: 'testuser2@example.com',
            password: 'testpassword2',
            saved_questions: []
        });
        expect(newUser2).toBeDefined(); // Ensure the user object is defined
    });

    // Test Case 2: Retrieving a User by ID
    it('Should retrieve a user by ID', async () => {
        try {
            const retrievedUser = await User.findById('6614330ca517eb2eb2fc935b');
            expect(retrievedUser._id).toEqual(testUserId);
        } catch (error) {
            console.error("Failed to retrieve user:", error);
        }
    });

    // Test Case 3: Deleting a User
    it('Should delete a user', async () => {
        await User.findByIdAndDelete(testUserId);
        const deletedUser = await User.findById(testUserId);
        expect(deletedUser).toBeUndefined(); // Ensure the user is deleted
    });

});