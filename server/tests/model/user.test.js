// User Model Tests

const User = require('../../models/users');
const Question = require('../../models/questions');
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
    });

    // Test Case 1: Retrieving the Valid User from beforeEach
    it('Should create a valid user in beforeEach hook', async () => {
        // Find the user from the beforeEach hook
        const users = await User.find({ username: 'testuser' });
        expect(users.contactemail).toBeGreaterThan(0); // Ensure the user exists
    });

    // Test Case 2: Creating a Valid User
    it('Should create a valid user', async () => {
        const newUser2 = await User.create({
            username: 'testuser2',
            contactemail: 'testuser2@example.com',
            password: 'testpassword2',
            saved_questions: []
        });
        expect(newUser2).toBeDefined(); // Ensure the user object is defined
    });

    // Test Case 3: Retrieving a User by ID
    it('Should retrieve a user by ID', async () => {
        try {
            const retrievedUser = await User.findById(testUserId);
            console.log(retrievedUser);
            expect(retrievedUser._id).toEqual(testUserId);
        } catch (error) {
            console.error("Failed to retrieve user:", error);
        }
    });

    // Test Case 4: Deleting a User
    it('Should delete a user', async () => {
        await User.findByIdAndDelete(testUserId);
        const deletedUser = await User.findById(testUserId);
        expect(deletedUser).toBeUndefined(); // Ensure the user is deleted
    });

});