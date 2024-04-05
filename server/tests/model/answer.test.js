// Answer Model Tests

const mockingoose = require('mockingoose');
const Answer = require('../../models/answers');

describe('Answer Model Tests', () => {

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
        expect(newAnswer.length).toEqual(1); // Ensure a new answer is created
    });

    // Test Case 2: Creating Multiple Valid Answers
    it('Should create multiple valid answers', async () => {
        const newAnswers = await Answer.create([
            {
                text: 'Answer 1 text',
                ans_by: 'user1'
            },
            {
                text: 'Answer 2 text',
                ans_by: 'user2'
            }
        ]);
        expect(newAnswers.length).toEqual(2); // Ensure two answers are created
    });

    // Test Case 3: Creating a User with Invalid Data Type(s) (text)
    it('Should throw an error when creating an answer with invalid data type (text)', async () => {
        await expect(Answer.create(
            {
                text: 123, // Adding text as integer instead of string
                ans_by: 'test_admin'
            })).rejects.toThrow(); // Should throw an error
    });

    // Test Case 4: Creating a User with Invalid Data Type(s) (ans_by)
    it('Should throw an error when creating an answer with invalid data type (ans_by)', async () => {
        await expect(Answer.create(
            {
                text: 'Answer text',
                ans_by: 123 // Adding ans_by as integer instead of string
            })).rejects.toThrow(); // Should throw an error
    });

    // Test Case 5: Retrieve an Answer by ID
    it('Should retrieve an answer by ID', async () => {
        // Create a test answer
        const testAnswer =
            {
                _id: 'testAnswerId',
                text: 'Test answer text',
                ans_by: 'test_admin'
            };
        mockingoose(Answer).toReturn(testAnswer, 'findOne');

        const retrievedAnswer = await Answer.findById('testAnswerId');
        expect(retrievedAnswer._id).toEqual('testAnswerId'); // Ensure the retrieved answer matches the test answer
    });

    // Test Case 6: Update an Answer by ID
    it('Should update an answer by ID', async () => {
        // Create test answer
        const testAnswer =
            {
                _id: 'testAnswerId',
                text: 'Test answer text',
                ans_by: 'test_admin'
            };
        mockingoose(Answer).toReturn(testAnswer, 'findOneAndUpdate');

        const updatedAnswer = await Answer.findByIdAndUpdate('testAnswerId',
            {
                text: 'Updated answer text'
            },
            {
                new: true
            });
        expect(updatedAnswer.text).toEqual('Updated answer text'); // Ensure the answer text is updated
    });

    // Test Case 7: Delete an Answer by ID
    it('Should delete an answer by ID', async () => {
        // Create a test answer
        const testAnswer =
            {
                _id: 'testAnswerId',
                text: 'Test answer text',
                ans_by: 'test_admin'
            };
        mockingoose(Answer).toReturn(testAnswer, 'findOneAndDelete');

        await Answer.findByIdAndDelete('testAnswerId');
        const deletedAnswer = await Answer.findById('testAnswerId');
        expect(deletedAnswer).toBeNull(); // Ensure the answer is deleted
    });

});