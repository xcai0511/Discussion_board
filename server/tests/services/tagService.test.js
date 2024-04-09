// Jest tests for client > src > services > tagService.js

import { getTagsWithQuestionNumber } from '../../../client/src/services/tagService.js';
import Tag from '../../../server/models/tags.js';

jest.mock('../../../server/models/tags.js');

describe('tagService', () => {
    // After each test, clear all mocks
    afterEach(() => {
        jest.clearAllMocks();
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
