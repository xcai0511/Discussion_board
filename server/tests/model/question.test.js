// Question Model Tests

const mockingoose = require('mockingoose');
const { default: mongoose } = require("mongoose");
const Question = require('../../models/questions');

describe('Question Model Tests', () => {

    // Before each test, reset mockingoose mocks
    beforeEach(() => {
        mockingoose.resetAll(); // Reset all mocks
    });

    // TODO: Test Case 1: Creating Multiple Valid Questions

    // TODO: Test Case 2: Creating Single Valid Question

    // TODO: Test Case 3: Creating a Question with Missing Required Field (title)

    // TODO: Test Case 4: Creating a Question with Missing Required Field (text)

    // TODO: Test Case 5: Creating a User with Invalid Data Type(s) (text)

    // TODO: Test Case 6: Retrieving a Question by ID

    // TODO: Test Case 7: Updating a Question

    // TODO: Test Case 8: Deleting a Question

});