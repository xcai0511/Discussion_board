// Jest tests for client > src > services > tagService.js

const mockingoose = require('mockingoose');
const { getTagsWithQuestionNumber } = require('../../../client/src/services/tagService');
const Tag = require('../../../server/models/tags');

jest.mock('../../../server/models/tags');

describe('tagService', () => {
    // Before each test, reset mockingoose mocks
    beforeEach(() => {
        mockingoose.resetAll(); // Reset all mocks
    });

    // Tests for getTagsWithQuestionNumber function in tagService.js
    describe('getTagsWithQuestionNumber', () => {
        // Test Case 1: Retrieving Tags with Question Number
        it('Should retrieve tags with question number', async () => {
            // Mock tags
            const mockData = [
                { name: 'Tag1', qcnt: 5 },
                { name: 'Tag2', qcnt: 10 }
            ];
            Tag.aggregate.mockResolvedValueOnce(mockData);

            // Call the getTagsWithQuestionNumber function from tagService.js
            const tags = await getTagsWithQuestionNumber();

            expect(tags).toEqual(mockData);
            expect(Tag.aggregate).toHaveBeenCalledWith([
                { $lookup: { from: 'questions', localField: '_id', foreignField: 'tags', as: 'questions' } },
                { $project: { name: 1, qcnt: { $size: '$questions' } } }
            ]);
        });

        // Test Case 2: Handling Database Error
        it('Should handle database error', async () => {
            // Mock database error
            const errorMessage = 'Database error';
            Tag.aggregate.mockRejectedValueOnce(new Error(errorMessage));

            await expect(getTagsWithQuestionNumber()).rejects.toThrow(errorMessage);
        });
    });
});
