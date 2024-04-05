// User Model Tests

const User = require('../../models/users');
const Question = require('../../models/questions');

describe('User Model Tests', () => {

    let testUserId;

    // Before each test, create a test user
    beforeEach(async () => {
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
        expect(users.length).toBeGreaterThan(0); // Ensure the user exists
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

    // Test Case 3: Creating a User with Invalid Data Type
    it('Should throw an error when creating a user with invalid data type', async () => {
        await expect(User.create(
            {
                username: 123, // Username should be a string, not an integer
                contactemail: 'test@example.com',
                password: 'password123',
                saved_questions: []
            })).rejects.toThrow(); // Adding a user with invalid data type should throw an error
    });

    // Test Case 4: Retrieving a User by ID
    it('Should retrieve a user by ID', async () => {
        const retrievedUser = await User.findById(testUserId);
        expect(retrievedUser._id).toEqual(testUserId); // Ensure the retrieved user matches the one saved
    });

    // Test Case 5: Updating a User
    it('Should update a user', async () => {
        await User.findByIdAndUpdate(testUserId, { username: 'updated_user' });
        const updatedUser = await User.findById(testUserId);
        expect(updatedUser.username).toEqual('updated_user'); // Ensure the username is updated
    });

    // Test Case 6: Deleting a User
    it('Should delete a user', async () => {
        await User.findByIdAndDelete(testUserId);
        const deletedUser = await User.findById(testUserId);
        expect(deletedUser).toBeNull(); // Ensure the user is deleted
    });

    // Test Case 7: Retrieving Question IDs from Saved Questions
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