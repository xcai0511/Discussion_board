// Jest tests for client > src > services > userService.js

import { addUser, getUserById, getUserByEmail, editUser, getSavedQuestions } from '../../../client/src/services/userService.js';
import User from '../../../server/models/users.js';

jest.mock('../../../server/models/users.js');

describe('userService', () => {
    // After each test, clear all mocks
    afterEach(() => {
        jest.clearAllMocks();
    });

    // Tests for addUser function in userService.js
    describe('addUser', () => {
        // Test Case 1: Adding New User
        it('Should add a new user', async () => {
            // Mock user
            const user = {
                username: 'JohnDoe',
                contactemail: 'john@example.com',
                password: 'password',
                saved_questions: []
            };
            const mockResponse = { _id: '65e9b58910afe6e94fc6e6dc', ...user };
            User.create.mockResolvedValueOnce(mockResponse);

            // Call the addUser function
            const response = await addUser(user);

            expect(response).toEqual(mockResponse);
            expect(User.create).toHaveBeenCalledWith(user);
        });

        // Test Case 2: Handling Missing User Data
        it('Should handle missing user data', async () => {
            // Call the function without providing user data and expect it to throw an error
            await expect(addUser()).rejects.toThrow('Missing user data');
        });
    });

    // Tests for getUserById function in userService.js
    describe('getUserById', () => {
        // Test Case 3: Retrieving User By ID
        it('Should retrieve user by ID', async () => {
            // Mock user
            const uid = '65e9b58910afe6e94fc6e6dc';
            const mockResponse = { 
                _id: uid, 
                username: 'JohnDoe', 
                contactemail: 'john@example.com', 
                password: 'password', 
                saved_questions: [] 
            };
            User.findById.mockResolvedValueOnce(mockResponse);

            // Call the getUserById function
            const response = await getUserById(uid);

            expect(response).toEqual(mockResponse);
            expect(User.findById).toHaveBeenCalledWith(uid);
        });

        // Test Case 4: Handling Invalid ID
        it('Should handle invalid ID', async () => {
            // Mock rejection with error
            User.findById.mockRejectedValueOnce(new Error('Invalid user ID'));

            // Call the function with an invalid id and expect it to throw an error
            await expect(getUserById('invalid_id')).rejects.toThrow('Invalid user ID');
        });
    });

    // Tests for getUserByEmail function in userService.js
    describe('getUserByEmail', () => {
        // Test Case 5: Retrieving User By Email
        it('Should retrieve user by email', async () => {
            // Mock user
            const email = 'john@example.com';
            const mockResponse = { 
                _id: '65e9b58910afe6e94fc6e6dc', 
                username: 'JohnDoe', 
                contactemail: email, 
                password: 'password', 
                saved_questions: [] 
            };
            User.findOne.mockResolvedValueOnce(mockResponse);

            // Call the getUserByEmail function
            const response = await getUserByEmail(email);

            expect(response).toEqual(mockResponse);
            expect(User.findOne).toHaveBeenCalledWith({ contactemail: email });
        });

        // Test Case 6: Handling Missing Email
        it('Should handle missing email', async () => {
            // Call the function without providing email and expect it to throw an error
            await expect(getUserByEmail()).rejects.toThrow('Missing email');
        });
    });

    // Tests for editUser function in userService.js
    describe('editUser', () => {
        // Test Case 7: Editing User Information
        it('Should edit user information', async () => {
            // Mock user ID
            const uid = '65e9b58910afe6e94fc6e6dc';
            // Mock existing user
            const existingUserData = {
                username: 'JohnDoe',
                contactemail: 'john@example.com',
                password: 'password',
                saved_questions: []
            };
            // Mock updated user data
            const updatedUserData = {
                username: 'UpdatedJohnDoe',
                contactemail: 'john@example.com',
                password: 'updatedpassword',
                saved_questions: []
            };
            // Mock response for finding the user by ID
            const mockUser = { _id: uid, ...existingUserData };
            // Mock response after updating user information
            const mockUpdatedUser = { _id: uid, ...updatedUserData };
            
            // User.findById method for existing user data
            User.findById.mockResolvedValueOnce(mockUser);
            // User.findByIdAndUpdate method for updating user data
            User.findByIdAndUpdate.mockResolvedValueOnce(mockUpdatedUser);

            // Call the editUser function with the user ID and updated user data
            const response = await editUser(uid, updatedUserData);

            expect(response).toEqual(mockUpdatedUser);
            expect(User.findByIdAndUpdate).toHaveBeenCalledWith(uid, { $set: updatedUserData }, { new: true });
        });
    });


    // Tests for getSavedQuestions function in userService.js
    describe('getSavedQuestions', () => {
        // Test Case 8: Retrieving Saved Questions for User
        it('Should retrieve saved questions for user', async () => {
            // Mock user ID
            const uid = '65e9b58910afe6e94fc6e6dc';

            // Mock saved questions data
            const mockSavedQuestions = [
                { _id: '65e9b58910afe6e94fc6e6fe', title: 'Test Question 1', text: 'Test text 1' },
                { _id: '65e9b58910afe6e94fc6e6ff', title: 'Test Question 2', text: 'Test text 2' }
            ];
            User.findById.mockResolvedValueOnce({ saved_questions: mockSavedQuestions });

            // Call the getSavedQuestions function
            const response = await getSavedQuestions(uid);

            expect(response).toEqual(mockSavedQuestions);
            expect(User.findById).toHaveBeenCalledWith(uid, 'saved_questions');
        });
    });
});
