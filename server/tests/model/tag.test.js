// Tag Model Tests

const mockingoose = require('mockingoose');
const { default: mongoose } = require("mongoose");
const Tag = require('../../models/tags');

describe('Tag Model Tests', () => {

    // Before each test, reset mockingoose mocks
    beforeEach(() => {
        mockingoose.resetAll(); // Reset all mocks
    });

    // TODO: Test Case 1: Creating Multiple Valid Tags

    // TODO: Test Case 2: Creating Single Valid Tag

    // TODO: Test Case 3: Creating Single Hyphenated Tag

    // TODO: Test Case 4: Creating Multiple Hyphenated Tags

    // TODO: Test Case 5: Creating Single Word Tag and Hyphenated Tag

    // TODO: Test Case 6: Creating a Tag with Missing Required Field (name)

    // TODO: Test Case 7: Catch error -- invalid data type (name)

    // TODO: Test Case 8: Retrieving a Tag by ID

    // TODO: Test Case 9: Updating a Tag

    // TODO: Test Case 10: Deleting a Tag

});