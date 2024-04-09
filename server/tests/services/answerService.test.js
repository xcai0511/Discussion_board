// Jest tests for client > src > services > answerService.js

const mockingoose = require('mockingoose');
const Answer = require('../../../server/models/answers');
const Question = require('../../../server/models/questions');
const { addAnswer, editAnswer } = require('../../../client/src/services/answerService.js');

jest.mock('../../../server/models/answers');
jest.mock('../../../server/models/questions');

describe('answerService', () => {
    // Before each test, reset mockingoose mocks
    beforeEach(() => {
        mockingoose.resetAll(); // Reset all mocks
    });

    // Tests for addAnswer function in answerService.js
    describe('addAnswer', () => {
        // Test Case 1: Adding New Answer
        it('Should add a new answer', async () => {
            // Mock question data
            const mockQuestion = {
                _id: '507f191e810c19729de860ea',
                title: 'Test Question',
                text: 'Test text',
                tags: [],
                asked_by: 'testuser',
                ask_date_time: new Date(),
                views: 0,
                answers: []
            };
            Question.findById.mockResolvedValueOnce(mockQuestion);

            // Mock answer
            const qid = '507f191e810c19729de860ea';
            const ans = 'Test answer';
            const ans_by = 'John Doe';
            const ans_date_time = new Date()
            const mockResponse = { _id: '65e9b58910afe6e94fc6e6dc', qid, text: ans, ans_by, ans_date_time };
            Answer.create.mockResolvedValueOnce(mockResponse);

            const response = await addAnswer(qid, ans);

            expect(response).toEqual(mockResponse);
            expect(Answer.create).toHaveBeenCalledWith({ qid, text: ans, ans_by, ans_date_time });
        });

        // Test Case 2: Handling Missing QID and Answer Text
        it('Should handle missing QID and answer text', async () => {
            // Call the function without providing QID and answer text and expect it to throw an error
            await expect(addAnswer()).rejects.toThrow('Missing question ID and answer text');
        });
    });

    // Tests for editAnswer function in answerService.js
    describe('editAnswer', () => {
        // Test Case 3: Editing Existing Answer
        it('Should edit an existing answer', async () => {
            // Mock question data
            const mockQuestion = {
                _id: '507f191e810c19729de860ea',
                title: 'Test Question',
                text: 'Test text',
                tags: [],
                asked_by: 'testuser',
                ask_date_time: new Date(),
                views: 0,
                answers: []
            };
            Question.findById.mockResolvedValueOnce(mockQuestion);

            // Mock answer
            const qid = '65e9a5c2b26199dbcc3e6dc8';
            const ans = 'Edited answer';
            const ans_by = 'John Doe';
            const ans_date_time = new Date()
            const mockResponse = { _id: '65e9b58910afe6e94fc6e6dc', qid, text: ans, ans_by, ans_date_time };
            Answer.findByIdAndUpdate.mockResolvedValueOnce(mockResponse);

            const response = await editAnswer(qid, ans);

            expect(response).toEqual(mockResponse);
            expect(Answer.findByIdAndUpdate).toHaveBeenCalledWith(qid, { $set: { ans } }, { new: true });
        });

        // Test Case 4: Handling Missing QID and Answer Text
        it('Should handle missing QID and answer text', async () => {
            // Call the function without providing QID and answer text and expect it to throw an error
            await expect(editAnswer()).rejects.toThrow('Missing question ID and answer text');
        });
    });
});