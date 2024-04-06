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
        //console.log(newAnswer);
        expect(newAnswer.text).toEqual('This is the text for a test answer');
        expect(newAnswer.ans_by).toEqual('test_admin')// Ensure a new answer is created
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

    // Test Case 5: Retrieve an Answer by ID
    it('Should retrieve an answer by ID', async () => {
        // Create a test answer
        const testAnswer =
            {
                _id: '5ebadc45a99bde77b2efb20e',
                text: 'Test answer text',
                ans_by: 'test_admin'
            };
        mockingoose(Answer).toReturn(testAnswer, 'findOne');

        const retrievedAnswer = await Answer.findById('5ebadc45a99bde77b2efb20e');
        expect(retrievedAnswer._id.toString()).toEqual('5ebadc45a99bde77b2efb20e'); // Ensure the retrieved answer matches the test answer
    });

    // // Test Case 6: Update an Answer by ID
    // it('Should update an answer by ID', async () => {
    //     // Create test answer
    //     const testAnswer =
    //         {
    //             _id: 'testAnswerId',
    //             text: 'Test answer text',
    //             ans_by: 'test_admin'
    //         };
    //     mockingoose(Answer).toReturn(testAnswer, 'findOneAndUpdate');
    //
    //     const updatedAnswer = await Answer.findByIdAndUpdate('testAnswerId',
    //         {
    //             text: 'Updated answer text'
    //         },
    //         {
    //             new: true
    //         });
    //     expect(updatedAnswer.text).toEqual('Updated answer text'); // Ensure the answer text is updated
    // });

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
        expect(deletedAnswer).toBeUndefined(); // Ensure the answer is deleted
    });

});