// Tag Model Tests

const mockingoose = require('mockingoose');
const Tag = require('../../models/tags');

describe('Tag Model Tests', () => {

    // Before each test, reset mockingoose mocks
    beforeEach(() => {
        mockingoose.resetAll(); // Reset all mocks
    });

    // Test Case 1: Creating Multiple Valid Tags
    it('Should create multiple valid tags', async () => {
        const newTags = await Tag.create([
            { name: 'javascript' },
            { name: 'react' }
        ]);
        expect(newTags.length).toEqual(2); // Ensure two tags are created
    });

    // Test Case 2: Creating Single Valid Tag
    it('Should create a single valid tag', async () => {
        const newTag = await Tag.create({ name: 'mongodb' });
        expect(newTag.name).toEqual('mongodb'); // Ensure the tag name matches
    });

    // Test Case 3: Creating Single Hyphenated Tag
    it('Should create a single hyphenated tag', async () => {
        const newTag = await Tag.create({ name: 'react-native' });
        expect(newTag.name).toEqual('react-native'); // Ensure the tag name matches
    });

    // Test Case 4: Creating Multiple Hyphenated Tags
    it('Should create multiple hyphenated tags', async () => {
        const newTags = await Tag.create([
            { name: 'react-native' },
            { name: 'vue-js' },
            { name: 'web-development' },
            { name: 'app-development' },
            { name: 'storage-solution' }
        ]);
        expect(newTags.length).toEqual(5); // Ensure two tags are created
    });

    // Test Case 5: Creating Single Word Tag and Hyphenated Tag
    it('Should create a single word tag and hyphenated tag', async () => {
        const newTags = await Tag.create([
            { name: 'mongodb' },
            { name: 'react-native' }
        ]);
        expect(newTags.length).toEqual(2); // Ensure two tags are created
    });

    // Test Case 7: Catch error -- invalid data type (name)
    it('Should throw an error when creating a tag with invalid data type (name)', async () => {
        await expect(Tag.create({ name: 123 })).rejects.toThrow(); // Providing name as an integer should throw an error
    });

    // Test Case 8: Retrieving a Tag by ID
    it('Should retrieve a tag by ID', async () => {
        const newTag = await Tag.create({ name: 'test-tag' }); // Create a new tag
        const retrievedTag = await Tag.findById(newTag._id); // Retrieve the newly created tag by ID
        expect(retrievedTag._id).toEqual(newTag._id); // Ensure the retrieved tag matches the created tag
    });

    // Test Case 9: Updating a Tag
    it('Should update a tag', async () => {
        const newTag = await Tag.create({ name: 'test-tag' }); // Create a new tag
        const updatedTagName = 'updated-test-tag'; // Update the name of the newly created tag
        await Tag.findByIdAndUpdate(newTag._id, { name: updatedTagName });
        const updatedTag = await Tag.findById(newTag._id); // Retrieve the updated tag
        expect(updatedTag.name).toEqual(updatedTagName); // Ensure the name of the updated tag matches the updated name
    });

    // Test Case 10: Deleting a Tag
    it('Should delete a tag', async () => {
        const newTag = await Tag.create({name: 'test-tag'}); // Create a new tag
        await Tag.findByIdAndDelete(newTag._id); // Attempt to delete the tag
        const deletedTag = await Tag.findById(newTag._id); // Attempt to retrieve the tag after deletion
        expect(deletedTag).toBeNull(); // Ensure the tag is deleted
    });

});