// unit tests for functions in controller/question.js


const supertest = require("supertest")
const { default: mongoose } = require("mongoose");

const Question = require('../../models/questions');
const { addTag, getQuestionsByOrder, filterQuestionsBySearch } = require('../../utils/question');

// Mocking the models
jest.mock("../../models/questions");
jest.mock('../../utils/question', () => ({
  addTag: jest.fn(),
  getQuestionsByOrder: jest.fn(),
  filterQuestionsBySearch: jest.fn(),
}));

let server;

const tag1 = {
  _id: '507f191e810c19729de860ea',
  name: 'tag1'
};
const tag2 = {
  _id: '65e9a5c2b26199dbcc3e6dc8',
  name: 'tag2'
};

const ans1 = {
  _id: '65e9b58910afe6e94fc6e6dc',
  text: 'Answer 1 Text',
  ans_by: 'answer1_user',
  
}

const ans2 = {
  _id: '65e9b58910afe6e94fc6e6dd',
  text: 'Answer 2 Text',
  ans_by: 'answer2_user',
  
}

const mockQuestions = [
  {
      _id: '65e9b58910afe6e94fc6e6dc',
      title: 'Question 1 Title',
      text: 'Question 1 Text',
      tags: [tag1],
      answers: [ans1],
      views: 21
  },
  {
      _id: '65e9b5a995b6c7045a30d823',
      title: 'Question 2 Title',
      text: 'Question 2 Text',
      tags: [tag2],
      answers: [ans2],
      views: 99
  }
]

describe('GET /getQuestion', () => {

  beforeEach(() => {
    server = require("../../server");
  })

  afterEach(async() => {
    server.close();
    await mongoose.disconnect()
  });

  // Test Case 1: Ensures that the /getQuestion endpoint returns questions filtered by certain criteria
  it('should return questions by filter', async () => {
    // Mock request query parameters
    const mockReqQuery = {
      order: 'someOrder',
      search: 'someSearch',
    };
   
    getQuestionsByOrder.mockResolvedValueOnce(mockQuestions);
    filterQuestionsBySearch.mockReturnValueOnce(mockQuestions);
    // Making the request
    const response = await supertest(server)
      .get('/question/getQuestion')
      .query(mockReqQuery);

    // Asserting the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockQuestions);
  });
});

describe('GET /getQuestionById/:qid', () => {

  beforeEach(() => {
    server = require("../../server");
  })

  afterEach(async() => {
    server.close();
    await mongoose.disconnect()
  });

  // Test Case 2: Verifies that /getQuestionById/:qid endpoint returns a specific question by ID and increments view count by 1
  it('should return a question by id and increment its views by 1', async () => {

    // Mock request parameters
    const mockReqParams = {
      qid: '65e9b5a995b6c7045a30d823',
    };

    const mockPopulatedQuestion = {
        answers: [mockQuestions.filter(q => q._id == mockReqParams.qid)[0]['answers']], // Mock answers
        views: mockQuestions[1].views + 1
    };
    
    // Provide mock question data
    Question.findOneAndUpdate = jest.fn().mockImplementation(() => ({ populate: jest.fn().mockResolvedValueOnce(mockPopulatedQuestion)}));
   
    // Making the request
    const response = await supertest(server)
      .get(`/question/getQuestionById/${mockReqParams.qid}`);

    // Asserting the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockPopulatedQuestion);
  });
});

describe('POST /addQuestion', () => {

  beforeEach(() => {
    server = require("../../server");
  })

  afterEach(async() => {
    server.close();
    await mongoose.disconnect()
  });

  // Test Case 3: Ensures a new question is added
  it('should add a new question', async () => {

    // Mock request body
    const mockTags = [tag1, tag2]; 

    const mockQuestion = {
      _id: '65e9b58910afe6e94fc6e6fe',
      title: 'Question 3 Title',
      text: 'Question 3 Text',
      tags: [tag1, tag2],
      answers: [ans1],
    }

    addTag.mockResolvedValueOnce(mockTags);
    Question.create.mockResolvedValueOnce(mockQuestion);

    // Making the request
    const response = await supertest(server)
      .post('/question/addQuestion')
      .send(mockQuestion);

    // Asserting the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockQuestion);

  });

  // Test Case 4: Verifies that the server handles errors when retrieving questions by filter criteria
  it('should handle error when retrieving questions by filter', async () => {
    // Mock request query parameters
    const mockReqQuery = {
      order: 'someOrder',
      search: 'someSearch',
    };

    // Mock error when retrieving questions by order
    getQuestionsByOrder.mockRejectedValueOnce(new Error('Error retrieving questions'));

    // Making the request
    const response = await supertest(server)
      .get('/question/getQuestion')
      .query(mockReqQuery);

    // Asserting the response
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Error retrieving questions' });
  });

  // Test Case 5: Ensures that the server handles errors when attempting to add a new question
  it('should handle error when adding a new question', async () => {
    // Mock request body
    const mockQuestion = {
      title: 'Question 3 Title',
      text: 'Question 3 Text',
      tags: ['tag1', 'tag2'],
      asked_by: 'user123',
      ask_date_time: new Date(),
    };

    // Mock error when adding a new question
    addTag.mockRejectedValueOnce(new Error('Error adding tags'));

    // Making the request
    const response = await supertest(server)
      .post('/question/addQuestion')
      .send(mockQuestion);

    // Asserting the response
    expect(response.status).toBe(400);
  });
});