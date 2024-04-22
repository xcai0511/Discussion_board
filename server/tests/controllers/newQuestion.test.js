const supertest = require("supertest")
const { default: mongoose } = require("mongoose");

const Question = require('../../models/questions');
const User = require('../../models/users');
const { addTag, getQuestionsByOrder, filterQuestionsBySearch } = require('../../utils/question');
const {verifyPassword} = require("../../utils/password");

jest.mock("../../models/questions");
jest.mock('../../utils/question', () => ({
  addTag: jest.fn(),
  getQuestionsByOrder: jest.fn(),
  filterQuestionsBySearch: jest.fn(),
}));
jest.mock("../../utils/password", () => ({
  verifyPassword: jest.fn()
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
      tags: [{name: 'tag1'}],
      answers: [{ans1}],
      views: 21
  },
  {
      _id: '65e9b5a995b6c7045a30d823',
      title: 'Question 2 Title',
      text: 'Question 2 Text',
      tags: [{name: 'tag2'}],
      answers: [{ans2}],
      views: 99
  }
]

describe('getQuestionsByFilter controller', () => {
  beforeEach(() => {
    server = require("../../server");
  });

  afterEach(() => {
    server.close();
    mongoose.disconnect();
  });
  it('should return questions by order', async () => {
    // Mock request query parameters
    const mockReqQuery = {
      order: 'someOrder',
    };

    // Mock expected response
    const expectedQuestions = mockQuestions;

    // Mock getQuestionsByOrder function to return expected questions
    getQuestionsByOrder.mockResolvedValueOnce(expectedQuestions);

    // Making the request
    const response = await supertest(server)
      .get('/question/getQuestion')
      .query(mockReqQuery);

    // Asserting the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedQuestions);
  });

  it('should return questions by search', async () => {
    // Mock request query parameters
    const mockReqQuery = {
      search: 'someSearch',
    };

    // Mock expected response
    const expectedQuestions = mockQuestions;

    // Mock filterQuestionsBySearch function to return expected questions
    Question.find = jest.fn().mockReturnThis();
    Question.populate = jest.fn().mockResolvedValueOnce(expectedQuestions);
    filterQuestionsBySearch.mockResolvedValueOnce(expectedQuestions);

    // Making the request
    const response = await supertest(server)
        .get('/question/getQuestion')
        .query(mockReqQuery);

    // Asserting the response
    //expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedQuestions);
  });

  it('should return questions by order and search', async () => {
    // Mock request query parameters
    const mockReqQuery = {
      order: 'someOrder',
      search: 'someSearch',
    };

    // Mock expected response
    const expectedQuestions = mockQuestions;

    // Mock getQuestionsByOrder function to return expected questions
    getQuestionsByOrder.mockResolvedValueOnce(expectedQuestions);

    // Mock filterQuestionsBySearch function to return expected questions
    filterQuestionsBySearch.mockResolvedValueOnce(expectedQuestions);

    // Making the request
    const response = await supertest(server)
      .get('/question/getQuestion')
      .query(mockReqQuery);

    // Asserting the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedQuestions);
  });

  it('should handle error when getting questions by filter', async () => {
    // Mock request query parameters
    const mockReqQuery = {
      order: 'someOrder',
      search: 'someSearch',
    };

    // Mock error
    const mockError = new Error('Mock error');

    // Mock getQuestionsByOrder function to throw an error
    getQuestionsByOrder.mockRejectedValueOnce(mockError);

    // Making the request
    const response = await supertest(server)
      .get('/question/getQuestion')
      .query(mockReqQuery);

    // Asserting the response
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: mockError.message });
  });
});

describe('getQuestionById controller', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('should return question by ID', async () => {
    // Mock request parameters
    const questionId = '65e9b58910afe6e94fc6e6dc';
    const mockRequest = { params: { qid: questionId } };

    // Mock expected response
    const expectedQuestion = mockQuestions.find(question => question._id === questionId);
    Question.findOneAndUpdate = jest.fn().mockReturnThis();
    Question.populate = jest.fn().mockResolvedValueOnce(expectedQuestion);

    // Making the request
    const response = await supertest(server)
      .get(`/question/getQuestionById/${questionId}`)
      .send(mockRequest);

    // Asserting the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedQuestion);
  });

  it('should return 404 if question is not found', async () => {
    // Mock request parameters
    const questionId = 'nonExistentId';
    // const mockRequest = { params: { qid: questionId } };

    Question.findOneAndUpdate = jest.fn().mockReturnThis();
    Question.populate = jest.fn().mockResolvedValueOnce(undefined);
    // Making the request
    const response = await supertest(server).get(`/question/getQuestionById/${questionId}`)

    // Asserting the response
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Question not found' });
  });

  it('should handle errors', async () => {
    // Mock request parameters
    const questionId = 'errorId';
    // Making the request
    const response = await supertest(server).get(`/question/getQuestionById/${questionId}`);
    // Asserting the response
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'error while getting question by id' });
  });
});

describe('addQuestion controller', () => {
  let connectSidValue = null;
  let respToken;
  let token;
  beforeEach(async () => {
    server = require("../../server");
    // Obtain CSRF token
    respToken = await supertest(server).get('/auth/csrf-token');
    token = respToken.body.csrfToken;
    respToken.headers['set-cookie'].forEach(cookie => {
      if (cookie.includes('connect.sid')) {
        connectSidValue = cookie.split('=')[1].split(';')[0];
      }
    });
  });

  afterEach(() => {
    server.close();
    mongoose.disconnect();
  });

  it('should add a new question', async () => {
    // Mock user data
    const mockUser = {
      _id: "6621d103fc9e6051353b70d8",
      username: 'testuser',
      contactemail: 'testuser@test.com',
      password: 'password',
      saved_questions: ['6621d103fc9f6051353b70d2', '6621d103fc9e6051353c70d0']
    };

    // Mock request body
    const requestBody = {
      title: 'Test Question',
      text: 'This is a test question',
      tags: [{name: 'test'}, {name: 'jest'}],
      asked_by: 'test_user',
      ask_date_time: new Date()
    };

    const addedQuestion = {
      title: 'Test Question',
      text: 'This is a test question',
      tags: ['tag1', 'tag2'],
      asked_by: 'test_user',
      ask_date_time: new Date()
    };

    // Mock tag creation
    addTag.mockResolvedValueOnce('tag1');
    addTag.mockResolvedValueOnce('tag2');

    const loginResponse = await supertest(server)
      .post('/auth/login')
      .send({ email: mockUser.contactemail, password: mockUser.password })
      .set('x-csrf-token', token)
      .set('Cookie', [`connect.sid=${connectSidValue}`]);

    // Ensure login was successful
    expect(loginResponse.status).toBe(200);

    Question.create = jest.fn().mockResolvedValueOnce(addedQuestion);
    // Making the request with CSRF token in headers
    const response = await supertest(server)
        .post('/question/addQuestion')
        .send(requestBody)
        .set('x-csrf-token', token)
        .set('Cookie', [`connect.sid=${connectSidValue}`]);
    console.log(response.body);

    // Asserting the response
    expect(response.status).toBe(200);
    expect(response.body.title).toBe(addedQuestion.title);
    expect(response.body.text).toBe(addedQuestion.text);
    expect(response.body.asked_by).toBe(addedQuestion.asked_by);
    expect(response.body.tags).toEqual(addedQuestion.tags);
  });

  it('should handle error when adding question', async () => {
    // Mock request body
    const requestBody = {
        title: 'Test Question',
        text: 'This is a test question',
        tags: ['test', 'jest'],
        asked_by: 'test_user',
        ask_date_time: new Date()
    };

    // Mock tag creation to throw an error
    addTag.mockRejectedValueOnce(new Error('Mock error'));

    // Making the request with CSRF token in headers
    const response = await supertest(server)
        .post('/question/addQuestion')
        .send(requestBody)
        .set('x-csrf-token', token)
        .set('Cookie', [`connect.sid=${connectSidValue}`]);

    // Asserting the response
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Error saving the question');
  });
});

describe('deleteQuestionById controller', () => {
  let connectSidValue = null;
  let respToken;
  let token;
  beforeEach(async () => {
    server = require("../../server");
    // Obtain CSRF token
    respToken = await supertest(server).get('/auth/csrf-token');
    token = respToken.body.csrfToken;
    respToken.headers['set-cookie'].forEach(cookie => {
      if (cookie.includes('connect.sid')) {
        connectSidValue = cookie.split('=')[1].split(';')[0];
      }
    });
  });

  afterEach(() => {
    server.close();
    mongoose.disconnect();
  });

  it('should delete a question by ID', async () => {
    // Mock user data
    const mockUser = {
      _id: "1",
      username: 'testuser',
      contactemail: 'testuser@test.com',
      password: 'password',
      saved_questions: ['6621d103fc9f6051353b70d2', '6621d103fc9e6051353c70d0']
    };

    // Login
    User.create = jest.fn().mockResolvedValueOnce(mockUser);
    User.findOne = jest.fn().mockResolvedValueOnce(mockUser);
    verifyPassword.mockResolvedValue(true);
    const loginResponse = await supertest(server)
      .post('/auth/login')
      .set('x-csrf-token', token)
      .send({ email: mockUser.contactemail, password: mockUser.password })
      .set('Cookie', [`connect.sid=${connectSidValue}`]);

    // Ensure login was successful
    expect(loginResponse.status).toBe(200);

    // Create a mock question
    const mockQuestion = {
      title: 'Test Question',
      text: 'This is a test question',
      tags: ['test', 'jest'],
      asked_by: mockUser.username,
      ask_date_time: new Date()
    };
    const resQuestion = {
      title: 'Test Question',
      text: 'This is a test question',
      tags: ['tag2', 'tag2'],
      asked_by: mockUser.username,
      ask_date_time: new Date()
    };

    // Add the mock question
    addTag.mockResolvedValueOnce('tag1');
    addTag.mockResolvedValueOnce('tag2');
    Question.create = jest.fn().mockResolvedValueOnce(resQuestion);
    const addQuestionResponse = await supertest(server)
      .post('/question/addQuestion')
      .send(mockQuestion)
      .set('x-csrf-token', token)
      .set('Cookie', [`connect.sid=${connectSidValue}`]);

    // Ensure question was added successfully
    expect(addQuestionResponse.status).toBe(200);

    // Extract the ID of the added question
    const questionId = addQuestionResponse.body._id;

    // Attempt to delete the question
    Question.findByIdAndDelete = jest.fn().mockResolvedValueOnce(resQuestion);
    const deleteQuestionResponse = await supertest(server)
      .delete(`/question/deleteQuestionById/${questionId}`)
      .set('x-csrf-token', token);

    // Ensure question was deleted successfully
    expect(deleteQuestionResponse.status).toBe(200);
    expect(deleteQuestionResponse.body.message).toBe('Question deleted successfully');
  });

  it('should return 404 if the question is not found', async () => {
    // Attempt to delete a question with non-existent ID
    Question.findByIdAndDelete = jest.fn().mockResolvedValueOnce(undefined);
    const deleteQuestionResponse = await supertest(server)
      .delete(`/question/deleteQuestionById/nonExistentId`)

    // Ensure 404 response for invalid ID
    expect(deleteQuestionResponse.status).toBe(404);
    expect(deleteQuestionResponse.body.message).toBe('Question not found');
  });
});

describe('updateQuestionWithTag controller', () => {
  let connectSidValue = null;
  let respToken;
  let token;
  beforeEach(async () => {
    server = require("../../server");
    // Obtain CSRF token
    respToken = await supertest(server).get('/auth/csrf-token');
    token = respToken.body.csrfToken;
    respToken.headers['set-cookie'].forEach(cookie => {
      if (cookie.includes('connect.sid')) {
        connectSidValue = cookie.split('=')[1].split(';')[0];
      }
    });
  });

  afterEach(() => {
    server.close();
    mongoose.disconnect();
  });

  it('should update a question with a new tag', async () => {
    // Mock user data
    const mockUser = {
      _id: "6621d103fc9e6051353b70d8",
      username: 'testuser',
      contactemail: 'testuser@test.com',
      password: 'password',
      saved_questions: ['6621d103fc9f6051353b70d2', '6621d103fc9e6051353c70d0']
    };

    // Login
    const loginResponse = await supertest(server)
      .post('/auth/login')
      .set('x-csrf-token', token)
      .send({ email: mockUser.contactemail, password: mockUser.password })
      .set('Cookie', [`connect.sid=${connectSidValue}`]);

    // Ensure login was successful
    expect(loginResponse.status).toBe(200);

    // Create a mock question
    const mockQuestion = {
      title: 'Test Question',
      text: 'This is a test question',
      tags: ['tag1'],
      asked_by: mockUser.username,
      ask_date_time: new Date()
    };

    const mockUpdatedQuestion = {
      title: 'Test Question',
      text: 'This is a test question',
      tags: ['tag1', 'newTagId'],
      asked_by: mockUser.username,
      ask_date_time: new Date()
    };

    // Add the mock question
    const addQuestionResponse = await supertest(server)
      .post('/question/addQuestion')
      .send(mockQuestion)
      .set('x-csrf-token', token)
      .set('Cookie', [`connect.sid=${connectSidValue}`]);

    // Ensure question was added successfully
    expect(addQuestionResponse.status).toBe(200);

    // Extract the ID of the added question
    const questionId = addQuestionResponse.body._id;

    // Mock request body for updating question with a new tag
    const requestBody = {
      qid: questionId,
      newTag: 'newTag'
    };

    // Mock addTag function to resolve with the new tag ID
    addTag.mockResolvedValueOnce('newTagId');
    Question.findByIdAndUpdate = jest.fn().mockReturnThis();
    Question.populate = jest.fn().mockResolvedValueOnce(mockUpdatedQuestion);

    // Making the request to update question with a new tag
    const updateQuestionWithTagResponse = await supertest(server)
      .put('/question/updateQuestionWithTag')
      .send(requestBody)
      .set('x-csrf-token', token)
      .set('Cookie', [`connect.sid=${connectSidValue}`]);

    // Ensure question was updated successfully with the new tag
    expect(updateQuestionWithTagResponse.status).toBe(200);
    expect(updateQuestionWithTagResponse.body.tags).toContain('newTagId');
  });

  it('should return 404 if the question to update is not found', async () => {
    // Mock request body for updating a non-existent question
    const requestBody = {
      qid: 'nonExistentId',
      newTag: 'newTag'
    };

    addTag.mockResolvedValueOnce('newTagId');
    Question.findByIdAndUpdate = jest.fn().mockReturnThis();
    Question.populate = jest.fn().mockResolvedValueOnce(undefined);
    // Making the request to update a non-existent question
    const updateQuestionWithTagResponse = await supertest(server)
      .put('/question/updateQuestionWithTag')
      .send(requestBody)
      .set('x-csrf-token', token)
      .set('Cookie', [`connect.sid=${connectSidValue}`]);

    // Ensure 404 response for non-existent question
    expect(updateQuestionWithTagResponse.status).toBe(404);
    expect(updateQuestionWithTagResponse.body.message).toBe('Question not found');
  });

  it('should handle errors', async () => {
    // Mock request body for updating a question with invalid data
    const requestBody = {
      qid: 'invalidId',
      newTag: 'newTag'
    };

    addTag.mockResolvedValueOnce('newTagId');
    Question.findByIdAndUpdate = jest.fn().mockResolvedValueOnce(undefined);
    Question.populate = jest.fn().mockResolvedValueOnce(undefined);

    // Making the request to update a question with invalid data
    const updateQuestionWithTagResponse = await supertest(server)
      .put('/question/updateQuestionWithTag')
      .send(requestBody)
      .set('x-csrf-token', token)
      .set('Cookie', [`connect.sid=${connectSidValue}`]);

    // Ensure 500 response for invalid data
    expect(updateQuestionWithTagResponse.status).toBe(500);
    expect(updateQuestionWithTagResponse.body.message).toBe('Internal server error');
  });
});

describe('upvoteQuestion controller', () => {
  let connectSidValue = null;
  let respToken;
  let token;
  beforeEach(async () => {
    server = require("../../server");
    // Obtain CSRF token
    respToken = await supertest(server).get('/auth/csrf-token');
    token = respToken.body.csrfToken;
    respToken.headers['set-cookie'].forEach(cookie => {
      if (cookie.includes('connect.sid')) {
        connectSidValue = cookie.split('=')[1].split(';')[0];
      }
    });
  });

  afterEach(() => {
    server.close();
    mongoose.disconnect();
  });

  it('should upvote a question and increment votes and score', async () => {
    // Mock user data
    const mockUser = {
      _id: 'mockUserId',
      username: 'user',
      contactemail: 'test@test.com',
      password: 'testpassword',
      upvoted_questions: [],
      downvoted_questions: [] };
    const updatedUser = {
      _id: 'mockUserId',
      username: 'user',
      contactemail: 'test@test.com',
      password: 'testpassword',
      upvoted_questions: ['mockQuestionId'],
      downvoted_questions: [] };

    User.findById = jest.fn().mockResolvedValueOnce(mockUser);

    // Mock question data
    const mockQuestion = { _id: 'mockQuestionId', votes: 0, score: 0 };
    const updatedQuestion = { _id: 'mockQuestionId', votes: 1, score: 1 };
    Question.create = jest.fn().mockResolvedValueOnce(mockQuestion);
    Question.findById = jest.fn().mockResolvedValueOnce(mockQuestion);

    // Mock upvote
    Question.save = jest.fn().mockResolvedValueOnce(updatedQuestion);
    User.save = jest.fn().mockResolvedValueOnce(updatedUser);

    // Make the request to upvote the question with CSRF token
    const response = await supertest(server)
      .post('/question/upvote/mockQuestionId')
      .send({ uid: 'mockUserId' })
      .set('x-csrf-token', token)
      .set('Cookie', [`connect.sid=${connectSidValue}`]);

    // Assert the response
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('upvote success');
    expect(response.body.updatedQuestion.votes).toBe(1);
    expect(response.body.updatedQuestion.score).toBe(1);
  });

  it('should remove an upvote and decrement votes and score', async () => {
    // Mock user data with upvoted question
    const mockUser = new User({ _id: 'mockUserId', upvoted_questions: ['mockQuestionId'], downvoted_questions: [] });
    await mockUser.save();

    // Mock question data
    const mockQuestion = new Question({ _id: 'mockQuestionId', votes: 1, score: 1 });
    await mockQuestion.save();

    // Make the request to remove the upvote with CSRF token
    const response = await supertest(server)
      .post('/upvoteQuestion/mockQuestionId')
      .send({ uid: 'mockUserId' })
      .set('x-csrf-token', token);

    // Assert the response
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('upvote removed');
    expect(response.body.updatedQuestion.votes).toBe(0);
    expect(response.body.updatedQuestion.score).toBe(0);
  });

  it('should return an error if user or question not found', async () => {
    let csrfToken;
    const csrfResponse = await supertest(server)
      .get('/auth/csrf-token');
    csrfToken = csrfResponse.body.csrfToken;
    
    // Make the request with invalid user and question IDs and CSRF token
    const response = await supertest(server)
      .post('/upvoteQuestion/nonExistentQuestionId')
      .send({ uid: 'nonExistentUserId' })
      .set('x-csrf-token', csrfToken);

    // Assert the response
    expect(response.status).toBe(200); // Assuming it returns a 200 status for simplicity
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('User or question not found');
  });
});

describe('downvoteQuestion controller', () => {
  let connectSidValue = null;
  let respToken;
  let token;
  beforeEach(async () => {
    server = require("../../server");
    // Obtain CSRF token
    respToken = await supertest(server).get('/auth/csrf-token');
    token = respToken.body.csrfToken;
    respToken.headers['set-cookie'].forEach(cookie => {
      if (cookie.includes('connect.sid')) {
        connectSidValue = cookie.split('=')[1].split(';')[0];
      }
    });
  });

  afterEach(() => {
    server.close();
    mongoose.disconnect();
  });
  it('should downvote a question and decrement votes and score', async () => {
    // Mock user data
    const mockUser = new User({ _id: 'mockUserId', upvoted_questions: [], downvoted_questions: [] });
    await mockUser.save();

    // Mock question data
    const mockQuestion = new Question({ _id: 'mockQuestionId', votes: 0, score: 0 });
    await mockQuestion.save();

    // Make the request to downvote the question with CSRF token
    const response = await supertest(server)
      .post('/downvoteQuestion/mockQuestionId')
      .send({ uid: 'mockUserId' })
      .set('x-csrf-token', token)
      .set('Cookie', [`connect.sid=${connectSidValue}`]);

    // Assert the response
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('downvote success');
    expect(response.body.updatedQuestion.votes).toBe(-1);
    expect(response.body.updatedQuestion.score).toBe(-1);
  });

  it('should remove a downvote and increment votes and score', async () => {
    // Mock user data with downvoted question
    const mockUser = new User({ _id: 'mockUserId', upvoted_questions: [], downvoted_questions: ['mockQuestionId'] });
    await mockUser.save();

    // Mock question data
    const mockQuestion = new Question({ _id: 'mockQuestionId', votes: -1, score: -1 });
    await mockQuestion.save();

    // Make the request to remove the downvote with CSRF token
    const response = await supertest(server)
      .post('/downvoteQuestion/mockQuestionId')
      .send({ uid: 'mockUserId' })
      .set('x-csrf-token', token);

    // Assert the response
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('downvote removed');
    expect(response.body.updatedQuestion.votes).toBe(0);
    expect(response.body.updatedQuestion.score).toBe(0);
  });

  it('should return an error if user or question not found', async () => {
    User.findById = jest.fn().mockResolvedValueOnce(undefined);
    Question.findById = jest.fn().mockResolvedValueOnce(undefined);
    // Make the request with invalid user and question IDs and CSRF token
    const response = await supertest(server)
      .put('/question/downvote/nonExistentQuestionId')
      .send({ uid: 'nonExistentUserId' })
      .set('x-csrf-token', token)
      .set('Cookie', [`connect.sid=${connectSidValue}`]);

    // Assert the response
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('User or question not found');
  });
});