// Jest tests for client > src > services > questionService.js

const Question = require('../../../server/models/questions');
const { getQuestionsByFilter, getQuestionById, addQuestion } = require('../../../client/src/services/questionService.js');

jest.mock("../../../server/models/questions");

describe('questionService', () => {
    // After each test, clear all mocks
    afterEach(() => {
        jest.clearAllMocks();
    });

    // Tests for getQuestionsByFilter function in questionService.js
    describe('getQuestionsByFilter', () => {
        // Test Case 1: Retrieve Questions by Filter
        it('Should fetch questions by filter', async () => {
            // Mock question
            const mockData = [
                { _id: '65e9b58910afe6e94fc6e6fe', 
                title: 'Test Question', 
                text: 'Test text', 
                tags: [], 
                asked_by: 'testuser', 
                ask_date_time: new Date(), 
                views: 0, 
                answers: [] 
            }
        ];
            Question.find.mockResolvedValueOnce(mockData);

            // Call the getQuestionsByFilter function with search filter
            const questions = await getQuestionsByFilter('newest', 'test');

            expect(questions).toEqual(mockData);
            expect(Question.find).toHaveBeenCalledWith({ 
                $text: { $search: 'test' } 
            }).sort({ ask_date_time: -1 });
        });

        // Test Case 2: Handling Empty Search Filter
        it('Should handle empty filter parameters', async () => {
            const mockData = [
                { 
                    _id: '65e9b5a995b6c7045a30d823', 
                    title: 'Test Question', 
                    text: 'Test text', 
                    tags: [], 
                    asked_by: 'testuser', 
                    ask_date_time: new Date(), 
                    views: 0, 
                    answers: [] 
                }
            ];
            Question.find.mockResolvedValueOnce(mockData);

            const questions = await getQuestionsByFilter();

            expect(questions).toEqual(mockData);
            expect(Question.find).toHaveBeenCalledWith({});
        });
    });

    // Tests for getQuestionById function in questionServices.js
    describe('getQuestionById', () => {
        // Test Case 3: Retrieving Question By ID
        it('Should retrieve question by id', async () => {
            const mockData = { 
                _id: '65e9b5a995b6c7045a30d823', 
                title: 'Test Question', 
                text: 'Test text', 
                tags: [], 
                asked_by: 'testuser', 
                ask_date_time: new Date(), 
                views: 0, 
                answers: [] 
            };
            Question.findById.mockResolvedValueOnce(mockData);

            const question = await getQuestionById('65e9b5a995b6c7045a30d823');

            expect(question).toEqual(mockData);
            expect(Question.findById).toHaveBeenCalledWith('65e9b5a995b6c7045a30d823');
        });

        // Test Case 4: Handling Invalid ID
        it('Should handle invalid ID', async () => {
            // Mock rejection with an error
            Question.findById.mockRejectedValueOnce(new Error('Invalid question ID'));

            // Call the function with an invalid id and expect it to throw an error
            await expect(getQuestionById('invalid_id')).rejects.toThrow('Invalid question ID');
        });
    });

    // Tests for addQuestion function from questionService.js
    describe('addQuestion', () => {
        // Test Case 5: Adding New Question
        it('Should add a new question', async () => {
            // Mock question
            const mockQuestion = { 
                title: 'New Question', 
                text: 'New text', 
                tags: [], 
                asked_by: 'User1', 
                ask_date_time: new Date(), 
                views: 0, 
                answers: [] 
            };
            const mockSavedQuestion = { _id: '65e9b58910afe6e94fc6e6dc', ...mockQuestion };
            Question.create.mockResolvedValueOnce(mockSavedQuestion);

            const response = await addQuestion(mockQuestion);

            expect(response).toEqual(mockSavedQuestion);
            expect(Question.create).toHaveBeenCalledWith(mockQuestion);
        });

        // Test Case 6: Handle Missing Question Data
        it('Should handle missing question data', async () => {
            // Call the function without providing question data and expect it to throw an error
            await expect(addQuestion()).rejects.toThrow('Missing question data');
        });
    });
});