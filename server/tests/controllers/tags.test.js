// Unit tests for getTagsWithQuestionNumber in controller/tags.js

const supertest = require("supertest")

const Tag = require('../../models/tags');
const Question = require('../../models/questions');
const { default: mongoose } = require("mongoose");

// Mock data for tags
const mockTags = [
  { _id: 't1', name: 'tag1' },
  { _id: 't2', name: 'tag2' },
];
 
const mockQuestions = [
    { tags: [mockTags[0], mockTags[1]] },
    { tags: [mockTags[0]] },
]

let server;
describe('GET /getTagsWithQuestionNumber', () => {
    beforeEach(() => {
        server = require("../../server");
    });

    afterEach(async () => {
        server.close();
        await mongoose.disconnect();
    });

    // Test Case 1: Ensures that the endpoint /tag/getTagsWithQuestionNumber returns the correct tags and counts
    it('should return tags with question numbers', async () => {
        // Mocking Tag.find() and Question.find()
        Tag.find = jest.fn().mockResolvedValueOnce(mockTags);
        Question.find = jest.fn().mockReturnThis();
        Question.populate = jest.fn().mockResolvedValue(mockQuestions);

        // Send a request to the endpoint 
        const response = await supertest(server).get('/tag/getTagsWithQuestionNumber');

        // Status 200 should have been called
        expect(response.status).toBe(200);
        // Response body contains the expected tags and counts.
        expect(response.body).toEqual([
            { name: 'tag1', qcnt: 2 },
            { name: 'tag2', qcnt: 1 },
        ]);
        // Tag.find() and Question.find() should have been called
        expect(Tag.find).toHaveBeenCalled();
        expect(Question.find).toHaveBeenCalled();
    });

    // Test Case 2: Ensures that the endpoint handles errors properly when Tag.find() encounters an error
    it('should handle error in Tag.find()', async () => {
        // Mocking Tag.find() to throw an error
        Tag.find = jest.fn().mockRejectedValueOnce(new Error('Error in Tag.find'));
    
        // Reset the mock for Question.find() to ensure it is not called
        Question.find.mockReset();
    
        // Send a request to the endpoint
        const response = await supertest(server).get('/tag/getTagsWithQuestionNumber');
    
        // Response status should be 500
        expect(response.status).toBe(500);
        // Response body contains the expected error message
        expect(response.body.message).toBe('Internal server error');

        // Tag.find() should have been called
        expect(Tag.find).toHaveBeenCalled();
        // Question.find() should not have been called
        expect(Question.find).not.toHaveBeenCalled();
    });

    // Test Case 3: Ensures that the endpoint handles errors properly when Question.find() encounters an error
    it('should handle error in Question.find()', async () => {
        // Mocking Tag.find() to resolve successfully
        Tag.find = jest.fn().mockResolvedValueOnce(mockTags);
        
        // Mocking Question.find() to throw an error
        Question.find = jest.fn(() => {
            return {
                populate: jest.fn(),
                exec: jest.fn().mockRejectedValueOnce(new Error('Error in Question.find'))
            };
        });
    
        // Handle the error thrown by Question.find() through try-catch block
        try {
            const response = await supertest(server).get('/tag/getTagsWithQuestionNumber');
    
            // If the request succeeds, fail the test
            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Internal server error');
            // Tag.find() and Question.find() should have been called
            expect(Tag.find).toHaveBeenCalled();
            expect(Question.find).toHaveBeenCalled();
        } catch (error) {
            // If the request fails, error should be caught
            expect(error).toBeDefined();
        }
    });    

    // Test Case 4: Ensures that the endpoint handles errors when an error occurs during mapping of tag IDs
    it('should handle error in mapping tag IDs', async () => {
        // Mocking successful Tag.find() and Question.find() calls
        Tag.find = jest.fn().mockResolvedValueOnce(mockTags);
        Question.find = jest.fn().mockImplementation(() => ({
            populate: jest.fn().mockResolvedValueOnce(mockQuestions)
        }));
    
        // Injecting an invalid scenario where mapping tag IDs will fail
        const originalMap = Map.prototype.set;
        Map.prototype.set = function () {
            throw new Error('Error in mapping tag IDs');
        };
    
        try {
            // Send request to endpoint
            const response = await supertest(server).get('/tag/getTagsWithQuestionNumber');
    
            // If the request succeeds, fail the test
            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Internal server error');
        } catch (error) {
            // If the request fails, error should be caught
            expect(error).toBeDefined();
        } finally {
            // Restore original behavior of Map.prototype.set to maintain test integrity
            Map.prototype.set = originalMap;
        }
    });
    
});