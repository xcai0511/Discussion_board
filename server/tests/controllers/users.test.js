const supertest = require("supertest");
const mongoose = require("mongoose");
const User = require("../../models/users");
const { hashPassword, verifyPassword } = require("../../utils/password");

jest.mock("../../models/users");
jest.mock("../../utils/password");

let server;

beforeEach(() => {
  server = require("../../server");
});

afterEach(async () => {
  server.close();
  await mongoose.disconnect();
});

describe("addUser controller", () => {
  it("should add a new user", async () => {
    // Mock data for request body
    const mockReqBody = {
      user: {
        username: 'testuser',
        contactemail: 'testuser@test.com',
        password: 'password',
        saved_questions: []
      }
    };

    // Mock hashed password
    const mockHashedPassword = "hashedPassword";
    hashPassword.mockResolvedValueOnce(mockHashedPassword);

    // Mock findOne method of User model
    User.findOne.mockResolvedValueOnce(null);

    // Mock save method of User model
    const mockSavedUser = {
      _id: "6621d103fc9e6051353b70d8",
      ...mockReqBody.user
    };
    const mockUserInstance = {
      save: jest.fn().mockResolvedValueOnce(mockSavedUser)
    };
    User.mockReturnValueOnce(mockUserInstance);

    // Send request to the endpoint
    const response = await supertest(server)
      .post(`/user/addUser`)
      .send(mockReqBody);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockSavedUser);
    expect(hashPassword).toHaveBeenCalledWith(mockReqBody.user.password);
    expect(User.findOne).toHaveBeenCalledWith({ contactemail: mockReqBody.user.contactemail });
    expect(mockUserInstance.save).toHaveBeenCalled();
  });

  it("should return an error if user already exists", async () => {
    const mockReqBody = {
      user: {
        username: 'testuser',
        contactemail: 'testuser@test.com',
        password: 'password',
        saved_questions: []
      }
    };

    // Mock findOne method of User model to simulate existing user
    User.findOne.mockResolvedValueOnce({});

    // Send request to the endpoint
    const response = await supertest(server)
      .post(`/user/addUser`)
      .send(mockReqBody);

    expect(response.status).toBe(409);
    expect(response.body).toEqual({ message: 'Email already in use' });
    expect(User.findOne).toHaveBeenCalledWith({ contactemail: mockReqBody.user.contactemail });
  });

  it("should handle error when adding a new user", async () => {
    // Mock data for request body
    const mockReqBody = {
      user: {
        username: 'testuser',
        contactemail: 'testuser@test.com',
        password: 'password',
        saved_questions: []
      }
    };

    // Mock hashed password
    const mockHashedPassword = "hashedPassword";
    hashPassword.mockResolvedValueOnce(mockHashedPassword);

    // Mock findOne method of User model to return null
    User.findOne.mockResolvedValueOnce(null);

    // Mock save method of User model to throw an error
    const mockError = new Error("Error saving user");
    const mockUserInstance = {
      save: jest.fn().mockRejectedValueOnce(mockError)
    };
    User.mockReturnValueOnce(mockUserInstance);

    // Send request to the endpoint
    const response = await supertest(server)
      .post(`/user/addUser`)
      .send(mockReqBody);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Error adding user', error: mockError.toString() });
    expect(hashPassword).toHaveBeenCalledWith(mockReqBody.user.password);
    expect(User.findOne).toHaveBeenCalledWith({ contactemail: mockReqBody.user.contactemail });
    expect(mockUserInstance.save).toHaveBeenCalled();
    });
});

describe("getUserById controller", () => {
    it("should return user by ID if user exists", async () => {
        // Mock data for request
        const userId = '6621d103fc9e6051353b70d8';
        const mockUser = {
          _id: userId,
          username: 'testuser',
          contactemail: 'testuser@test.com',
          password: 'hashedPassword',
          saved_questions: []
        };
    
        // Mock findById method of User model to return user
        User.findById.mockResolvedValueOnce(mockUser);
    
        // Send request to the endpoint
        const response = await supertest(server)
          .get(`/user/getUserById/${userId}`);
    
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUser);
        expect(User.findById).toHaveBeenCalledWith(userId);
    });
    
    it("should return 'User not found' message if user does not exist", async () => {
        // Mock data for request
        const userId = 'nonexistentuserid';
    
        // Mock findById method of User model to return null
        User.findById.mockResolvedValueOnce(null);
    
        // Send request to the endpoint
        const response = await supertest(server)
            .get(`/user/getUserById/${userId}`);
    
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: 'User not found' });
        expect(User.findById).toHaveBeenCalledWith(userId);
    });
    
    it("should handle error when retrieving user by ID", async () => {
        // Mock data for request
        const userId = '6621d103fc9e6051353b70d8';

        // Mock findById method of User model to throw an error
        const mockError = new Error("Error retrieving user");
        User.findById.mockRejectedValueOnce(mockError);

        // Send request to the endpoint
        const response = await supertest(server)
            .get(`/user/getUserById/${userId}`);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: 'Internal server error', error: mockError.toString() });
        expect(User.findById).toHaveBeenCalledWith(userId);
    });
});

describe("getUserByEmail controller", () => {
    it("should return user by email if user exists", async () => {
        // Mock data for request
        const userEmail = 'testuser@test.com';
        const mockUser = {
          _id: "6621d103fc9e6051353b70d8",
          username: 'testuser',
          contactemail: userEmail,
          password: 'hashedPassword',
          saved_questions: []
        };
    
        // Mock findOne method of User model to return user
        User.findOne.mockResolvedValueOnce(mockUser);
    
        // Send request to the endpoint
        const response = await supertest(server)
          .get(`/user/getUserByEmail/${userEmail}`);
    
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUser);
        expect(User.findOne).toHaveBeenCalledWith({ contactemail: userEmail });
    });
    
    it("should return 'User not found' message if user does not exist", async () => {
        // Mock data for request
        const userEmail = 'nonexistentuser@test.com';

        // Mock findOne method of User model to return null
        User.findOne.mockResolvedValueOnce(null);

        // Send request to the endpoint
        const response = await supertest(server)
            .get(`/user/getUserByEmail/${userEmail}`);

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: 'User not found' });
        expect(User.findOne).toHaveBeenCalledWith({ contactemail: userEmail });
    });

    it("should handle error when retrieving user by email", async () => {
        // Mock data for request
        const userEmail = 'testuser@test.com';

        // Mock findOne method of User model to throw an error
        const mockError = new Error("Error retrieving user");
        User.findOne.mockRejectedValueOnce(mockError);

        // Send request to the endpoint
        const response = await supertest(server)
            .get(`/user/getUserByEmail/${userEmail}`);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: 'Internal server error', error: mockError.toString() });
        expect(User.findOne).toHaveBeenCalledWith({ contactemail: userEmail });
    });
});

describe("getAllUsers controller", () => {
    it("should return all users", async () => {
        const mockUsers = [
            { 
                username: 'testuser1', 
                contactemail: 'testuser1@test.com',
                password: 'password1',
                saved_questions: [] 
            },
            { 
                username: 'testuser2',
                contactemail: 'testuser2@test.com',
                password: 'password2',
                saved_questions: [] 
            },
            { 
                username: 'testuser3',
                contactemail: 'testuser3@test.com',
                password: 'password3',
                saved_questions: [] 
            },
        ]

        // Mock the User.find() method to return the mock users
        User.find.mockResolvedValueOnce(mockUsers);

        // Send request to the endpoint
        const response = await supertest(server)
            .get(`/user/getAllUsers`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUsers);
        expect(User.find).toHaveBeenCalled();
    });

    it("should handle error when retrieving all users", async () => {
        // Mock error
        const mockError = new Error("Error retrieving all users");

        // Mock the User.find() method to throw an error
        User.find.mockRejectedValueOnce(mockError);

        // Send request to the endpoint
        const response = await supertest(server)
            .get(`/user/getAllUsers`);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: 'Internal server error' });
        expect(User.find).toHaveBeenCalled();
    });
});

// TODO: Fix all tests with csrf protection -- returns error 500
describe("getSavedQuestions controller", () => {
    it("should return user's saved questions if user exists", async () => {
        // Get CSRF token
        const respToken = await supertest(server)
            .get('/auth/csrf-token');

        // Ensure the CSRF token was obtained successfully
        expect(respToken.status).toBe(200);
        const token = respToken.body.csrfToken;

        // Mock user data
        const mockUser = {
            _id: "6621d103fc9e6051353b70d8",
            username: 'testuser',
            contactemail: 'testuser@test.com',
            password: 'password',
            saved_questions: ['6621d103fc9f6051353b70d2', '6621d103fc9e6051353c70d0']
        };

        const loginResponse = await supertest(server)
            .post('/auth/login')
            .set('x-csrf-token', token)
            .send({ email: mockUser.contactemail, password: mockUser.password });

        // Ensure login was successful
        expect(loginResponse.status).toBe(200);

        // Retrieve saved questions using the obtained CSRF token
        const respSavedQuestions = await supertest(server)
            .get(`/user/getSavedQuestions/${mockUser.contactemail}`)
            .set('x-csrf-token', token);

        // Ensure the request was successful
        expect(respSavedQuestions.status).toBe(200);
        expect(respSavedQuestions[0]._id.toString()).toEqual('6621d103fc9f6051353b70d2');
        expect(respSavedQuestions[1]._id.toString()).toEqual('6621d103fc9e6051353c70d0');
        
    });

    it("should return 'Internal server error' message if there is an error", async () => {
        const respToken = await supertest(server).get('/auth/csrf-token');
        const token = respToken.body.csrfToken;

        const userEmail = 'testuser@test.com'; // Existing user

        // Mocking an internal server error by causing findOne to throw an error
        jest.spyOn(User, 'findOne').mockImplementation(() => {
            throw new Error("Mock error");
        });

        // Request saved questions which should cause an internal server error
        const respSavedQuestions = await supertest(server)
            .get(`/user/getSavedQuestions/${userEmail}`)
            .set('x-csrf-token', token);

        // Check response status and message
        expect(respSavedQuestions.status).toBe(500);
        expect(respSavedQuestions.body.message).toBe("Internal server error");
    });
});

describe("updatePassword controller", () => {
    it("should update user's password if old password is correct", async () => {
        // Mock user data
        const username = 'testuser';
        const oldPassword = 'oldpassword';
        const newPassword = 'newpassword';
        const hashedOldPassword = await hashPassword(oldPassword);
        const hashedNewPassword = await hashPassword(newPassword);
        const mockUser = {
            _id: "6621d103fc9e6051353b70d8",
            username: username,
            password: hashedOldPassword
        };

        // Mock User.findOne to return the mock user
        User.findOne.mockResolvedValue(mockUser);

        // Mock verifyPassword to return true
        verifyPassword.mockResolvedValue(true);

        // Obtain CSRF token
        const csrfResponse = await supertest(server).get('/auth/csrf-token');
        const token = csrfResponse.body.csrfToken;

        // Send request to update password
        const response = await supertest(server)
            .post('/user/update-password')
            .set('x-csrf-token', token)
            .send({ username, oldPassword, newPassword });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Password updated successfully');
        expect(mockUser.password).not.toBe(hashedOldPassword);
        expect(mockUser.password).toBe(hashedNewPassword);
    });

    it("should return 'User not found' message if user does not exist", async () => {
        // Mock User.findOne to return null (user not found)
        User.findOne.mockResolvedValue(null);

        // Obtain CSRF token
        const csrfResponse = await supertest(server).get('/auth/csrf-token');
        const token = csrfResponse.body.csrfToken;

        // Send request to update password
        const response = await supertest(server)
            .post('/user/update-password')
            .set('x-csrf-token', token)
            .send({ username: 'nonexistentuser', oldPassword: 'oldpassword', newPassword: 'newpassword' });

        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('User not found');
    });

    it("should return 'Invalid current password' message if old password is incorrect", async () => {
        // Mock User.findOne to return a user
        User.findOne.mockResolvedValue({});

        // Mock verifyPassword to return false
        verifyPassword.mockResolvedValue(false);

        // Obtain CSRF token
        const csrfResponse = await supertest(server).get('/auth/csrf-token');
        const token = csrfResponse.body.csrfToken;

        // Send request to update password
        const response = await supertest(server)
            .post('/user/update-password')
            .set('x-csrf-token', token)
            .send({ username: 'testuser', oldPassword: 'incorrectpassword', newPassword: 'newpassword' });

        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Invalid current password');
    });
});

describe("saveQuestionToUser controller", () => {
    it("should save the question to user if user exists", async () => {
        // Mock user data
        const username = 'testuser';
        const questionId = '6621d103fc9f6051353b70d2';

        // Obtain CSRF token
        const csrfResponse = await supertest(server).get('/auth/csrf-token');
        const token = csrfResponse.body.csrfToken;

        // Mock User.findOne to return the user
        const mockUser = {
            _id: "6621d103fc9e6051353b70d8",
            username: username,
            saved_questions: []
        };
        User.findOne.mockResolvedValueOnce(mockUser);

        // Send request to save the question to user
        const response = await supertest(server)
            .post(`/user/saveQuestionToUser/${username}`)
            .set('x-csrf-token', token)
            .send({ data: { isBookmarked: true, qid: questionId } });

        // Ensure the question is saved to the user
        expect(response.status).toBe(200);
        expect(mockUser.saved_questions).toContain(questionId);
    });

    it("should remove the question from user if user exists", async () => {
        // Mock user data
        const username = 'testuser';
        const questionId = '6621d103fc9f6051353b70d2';

        // Obtain CSRF token
        const csrfResponse = await supertest(server).get('/auth/csrf-token');
        const token = csrfResponse.body.csrfToken;

        // Mock User.findOne to return the user with the question already saved
        const mockUser = {
            _id: "6621d103fc9e6051353b70d8",
            username: username,
            saved_questions: [questionId]
        };
        User.findOne.mockResolvedValueOnce(mockUser);

        // Send request to remove the question from user
        const response = await supertest(server)
            .post(`/user/saveQuestionToUser/${username}`)
            .set('x-csrf-token', token)
            .send({ data: { isBookmarked: false, qid: questionId } });

        // Ensure the question is removed from the user
        expect(response.status).toBe(200);
        expect(mockUser.saved_questions).not.toContain(questionId);
    });

    it("should return 'User not found' message if user does not exist", async () => {
        // Mock user data
        const username = 'nonexistentuser';
        const questionId = '6621d103fc9f6051353b70d2';

        // Obtain CSRF token
        const csrfResponse = await supertest(server).get('/auth/csrf-token');
        const token = csrfResponse.body.csrfToken;

        // Mock User.findOne to return null (user not found)
        User.findOne.mockResolvedValueOnce(null);

        // Send request to save/remove the question from non-existent user
        const response = await supertest(server)
            .post(`/user/saveQuestionToUser/${username}`)
            .set('x-csrf-token', token)
            .send({ data: { isBookmarked: true, qid: questionId } });

        // Ensure the response contains 'User not found' message
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('User not found');
    });

    it("should handle error when saving/removing question", async () => {
        // Mock user data
        const username = 'testuser';
        const questionId = '6621d103fc9f6051353b70d2';

        // Obtain CSRF token
        const csrfResponse = await supertest(server).get('/auth/csrf-token');
        const token = csrfResponse.body.csrfToken;

        // Mock User.findOne to throw an error
        User.findOne.mockRejectedValueOnce(new Error('Database error'));

        // Send request to save/remove the question
        const response = await supertest(server)
            .post(`/user/saveQuestionToUser/${username}`)
            .set('x-csrf-token', token)
            .send({ data: { isBookmarked: true, qid: questionId } });

        // Ensure the response contains 'Internal server error' message
        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Internal server error');
    });
});

describe("updateUserProfileImage controller", () => {
    it("should update user's profile image", async () => {
        // Mock data for request body
        const mockReqBody = {
            username: 'testuser',
            profileImage: 'new-profile-image-url'
        };

        // Obtain CSRF token
        const csrfResponse = await supertest(server).get('/auth/csrf-token');
        const token = csrfResponse.body.csrfToken;

        // Mock updated user object after successful update
        const mockUpdatedUser = {
            _id: "6621d103fc9e6051353b70d8",
            username: mockReqBody.username,
            profileImage: mockReqBody.profileImage
        };

        // Mock User.findOneAndUpdate method to return updated user
        User.findOneAndUpdate.mockResolvedValueOnce(mockUpdatedUser);

        // Send request to the endpoint with CSRF token in headers
        const response = await supertest(server)
            .put(`/user/updateUserProfileImage`)
            .set('x-csrf-token', token)
            .send(mockReqBody);

        // Ensure response is successful and contains updated user data
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Profile image updated successfully');
        expect(response.body.user).toEqual(mockUpdatedUser);
        expect(User.findOneAndUpdate).toHaveBeenCalledWith(
            { username: mockReqBody.username },
            { profileImage: mockReqBody.profileImage },
            { new: true }
        );
    });

    it("should return internal server error if update fails", async () => {
        // Mock data for request body
        const mockReqBody = {
            username: 'testuser',
            profileImage: 'new-profile-image-url'
        };

        // Obtain CSRF token
        const csrfResponse = await supertest(server).get('/auth/csrf-token');
        const token = csrfResponse.body.csrfToken;

        // Mock error during update process
        const mockError = new Error("Update failed");

        // Mock User.findOneAndUpdate method to throw an error
        User.findOneAndUpdate.mockRejectedValueOnce(mockError);

        // Send request to the endpoint with CSRF token in headers
        const response = await supertest(server)
            .put(`/user/updateUserProfileImage`)
            .set('x-csrf-token', token)
            .send(mockReqBody);

        // Ensure response indicates internal server error
        expect(response.status).toBe(500);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Internal server error');
        expect(User.findOneAndUpdate).toHaveBeenCalledWith(
            { username: mockReqBody.username },
            { profileImage: mockReqBody.profileImage },
            { new: true }
        );
    });
})