// Unit tests for addAnswer in contoller/answer.js

const supertest = require("supertest")
const mongoose = require("mongoose");
mongoose.connection.setMaxListeners(20);

const Answer = require("../../models/answers");
const Question = require("../../models/questions");

// Mock the Answer model
jest.mock("../../models/answers");

let server;

describe("POST /addAnswer", () => {

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
    jest.clearAllMocks();
    server.close();
    mongoose.disconnect();
  });

  // Test Case 1: Should add a new answer
  it("should add a new answer to the question", async () => {
    // Mocking the request body
    const mockReqBody = {
      qid: "dummyQuestionId",
      ans: {
        text: "This is a test answer"
      }
    };

    const mockAnswer = {
      _id: "dummyAnswerId",
      text: "This is a test answer"
    }
    // Mock the create method of the Answer model
    Answer.create.mockResolvedValueOnce(mockAnswer);

    // Mocking the Question.findOneAndUpdate method
    Question.findOneAndUpdate = jest.fn().mockResolvedValueOnce({
      _id: "dummyQuestionId",
      answers: ["dummyAnswerId"]
    });

    // Making the request
    const response = await supertest(server)
      .post("/answer/addAnswer")
      .send(mockReqBody)
      .set('x-csrf-token', token)
      .set('Cookie', [`connect.sid=${connectSidValue}`]);

    // Asserting the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockAnswer);

    // Verifying that Answer.create method was called with the correct arguments
    expect(Answer.create).toHaveBeenCalledWith({
      text: "This is a test answer"
    });

    // Verifying that Question.findOneAndUpdate method was called with the correct arguments
    expect(Question.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: "dummyQuestionId" },
      { $push: { answers: { $each: ["dummyAnswerId"], $position: 0 } } },
      { new: true }
    );
  });

  // Test Case 2: Error handling when creating a new answer
  it("should handle error when creating a new answer", async () => {
    // Mocking the request body
    const mockReqBody = {
      qid: "dummyQuestionId",
      ans: {
        text: "This is a test answer",
        ans_by: "testUser",
        ans_date_time: new Date()
      }
    };

    // Mocking the Answer.create method to throw an error
    Answer.create.mockRejectedValueOnce(new Error("Error creating answer"));

    // Making the request
    const response = await supertest(server)
      .post("/answer/addAnswer")
      .send(mockReqBody)
      .set('x-csrf-token', token)
      .set('Cookie', [`connect.sid=${connectSidValue}`]);

    // Asserting the response
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "error adding answer" });
  });

  // Test Case 3: Handling error when updating the question
  it("should handle error when updating the question", async () => {
    // Mocking the request body
    const mockReqBody = {
      qid: "dummyQuestionId",
      ans: {
        text: "This is a test answer",
        ans_by: "testUser",
        ans_date_time: new Date()
      }
    };

    // Mocking the Answer.create method to return a mock answer
    Answer.create.mockResolvedValueOnce({ _id: "dummyAnswerId" });

    // Mocking the Question.findOneAndUpdate method to throw an error
    Question.findOneAndUpdate.mockRejectedValueOnce(
      new Error("Error updating question")
    );

    // Making the request
    const response = await supertest(server)
      .post("/answer/addAnswer")
      .send(mockReqBody)
      .set('x-csrf-token', token)
      .set('Cookie', [`connect.sid=${connectSidValue}`]);

    // Asserting the response
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "error adding answer" });
  });
});