## List of features

Implemented Features (* denotes additional features):

| Feature   | Description               | E2E Tests      | Component Tests | Jest Tests     | Server Endpoint    |
|-----------|---------------------------|----------------|-----------------|----------------|--------------------|
| View Questions | Users can view all questions | /client/cypress/e2e/view_posts.cy.js | /client/cypress/component/question_page.cy.js    | /server/tests/question.test.js   | /question/getQuestion |
| View Answers | Users can view existing answers of questions | /client/cypress/e2e/commenting_on_posts.cy.js | /client/cypress/component/answer_page.cy.js    | /server/tests/controllers/newAnswer.test.js   | /question/getQuestionById/:qid |
| View Post Statistics (Metadata) | Each question has an associated score, vote count, number of answers, view count, and post date and author | /client/cypress/e2e/post_stats.cy.js | /client/cypress/component/question_page.cy.js    | /server/tests/question.test.js   | /question/getQuestion |
| Create New Post | Users, if logged in, are able to post questions with a title, text, and tags | /client/cypress/e2e/create_new_posts.cy.js | /client/cypress/component/new_question.cy.js    | /server/tests/controllers/newQuestion.test.js   | /question/addQuestion |
| Search by Text | Users can filter their search to search within title or text strings | /client/cypress/e2e/search_posts.cy.js | /client/cypress/component/header.cy.js    | /server/tests/question.test.js   | /question/getQuestion |
| Search by Tag | Users can filter their search to search within tags | /client/cypress/e2e/search_posts.cy.js | /client/cypress/component/header.cy.js    | /server/tests/question.test.js   | /question/getQuestion |
| Search by User | Users can filter their search to search by user/author | /client/cypress/e2e/search_posts.cy.js | /client/cypress/component/header.cy.js    | /server/tests/question.test.js   | /question/getQuestion |
| Search by Answer Count | Users can filter their search to search by the number of answers a post has | /client/cypress/e2e/search_posts.cy.js | /client/cypress/component/header.cy.js    | /server/tests/question.test.js   | /question/getQuestion |
| Search by Score | Users can filter their search to search by the score a post has | /client/cypress/e2e/search_posts.cy.js | /client/cypress/component/header.cy.js    | /server/tests/question.test.js   | /question/getQuestion |
| Ordering Questions | Users are able to order questions by newest ask date, most recently active, and unanswered | /client/cypress/e2e/view_posts.cy.js | /client/cypress/component/new_question.cy.js    | /server/tests/question.test.js   | /question/getQuestion |
| Commenting on Posts | Users, if logged in, are able to leave comments or replies on questions | /client/cypress/e2e/commenting_on_posts.cy.js | /client/cypress/component/answer_page.cy.js    | /server/tests/controllers/newAnswer.test.js   | /answer/addAnswer |
| Upvoting on Posts | Users, if logged in, are able to cast upvotes on questions. This will increase the question’s score | /client/cypress/e2e/voting.cy.js | /client/cypress/component/answer_page.cy.js    | /server/tests/controllers/newQuestion.test.js   | /question/upvote/:qid
| Downvoting on Posts | Users, if logged in, are able to cast downvotes on questions. This will decrease the question’s score | /client/cypress/e2e/voting.cy.js | /client/cypress/component/answer_page.cy.js    | /server/tests/controllers/newQuestion.test.js   | /question/downvote/:qid |
| Delete Question | Users, if logged in, are able to delete questions that they have asked  | /client/cypress/e2e/post_moderation.cy.js | /client/cypress/component/user_profile.cy.js    | /server/tests/controllers/newQuestion.test.js   | /question/deleteQuestionById/:qid |
| View Tags | Users are able to view all tags present in the database including the tag name and number of associated questions. Clicking on a tag will filter questions based on the clicked tag | /client/cypress/e2e/tagging_posts.cy.js | /client/cypress/component/tag.cy.js    | /server/tests/controllers/tags.test.js   | /tag/getTagsWithQuestionNumber |
| View Users | Users are able to view all users present in the database including their username and profile image. Clicking on a user card will filter posts to questions that user has asked | /client/cypress/e2e/user_profiles.cy.js | /client/cypress/component/user.cy.js    | /server/tests/controllers/users.test.js   | /user/getAllUsers
| Adding Tags to Posts | Users, if logged in, are able to add tags to their already existing posts | /client/cypress/e2e/tagging_posts.cy.js | /client/cypress/component/user_profile.cy.js    | /server/tests/question.test.js   | /question/updateQuestionWithTag |
| Profile Page | Users, if logged in, can view their own profile page which includes their username, email address, profile picture, and questions they have asked | /client/cypress/e2e/user_profiles.cy.js | /client/cypress/component/user_profile.cy.js    | /server/tests/controllers/users.test.js   | /user/getUserById/:uid |
| Update Password | Users, if logged in, are able to change their passwords if and only if their current password matches the stored password in the database | /client/cypress/e2e/user_profiles.cy.js | /client/cypress/component/user_profile.cy.js    | /server/tests/controllers/users.test.js   | /user/updatePassword |
| Update Profile Picture | Users, if logged in, are able to change their profile picture by choosing between a set of predefined images | /client/cypress/e2e/user_profiles.cy.js | /client/cypress/component/user_profile.cy.js    | /server/tests/controllers/users.test.js   | /user/updateUserProfileImage |
| Login | Users, if they have an account, are able to login, offering them a more personalized experience by being able to cast votes, ask questions, comment, save questions, and edit their user information | /client/cypress/e2e/login.cy.js | /client/cypress/component/login.cy.js    | /server/tests/server.test.js   | /auth/login |
| Sign Up | Users, if they do not already have an account, can sign up for one by providing a username, email address, and password | /client/cypress/e2e/signup.cy.js | /client/cypress/component/signup.cy.js    | /server/tests/controllers/users.test.js   | /user/addUser |
| Logout | Users, if logged in, are able to log out and end their session | /client/cypress/e2e/logout.cy.js | /client/cypress/component/header.cy.js    | /server/tests/server.test.js   | /auth/logout |
| *View Saved Questions | Users, if logged in, are able to access a list of questions they have bookmarked | /client/cypress/e2e/save_posts.cy.js | /client/cypress/component/saved_questions.cy.js    | /server/tests/server.test.js  | /user/getSavedQuestions/:email |
| *Saving Questions | Users, if logged in, are able to bookmark questions which will be saved to their profile | /client/cypress/e2e/save_posts.cy.js | /client/cypress/component/answer_page.cy.js    | /server/tests/controllers/users.test.js   | /user/saveQuestionToUser/:username |
| *Password Encryption | When users sign up and/or change their password, their password is encrypted as an extra security measurement | N/A | N/A    | /server/tests/password.test.js   | N/A |
| *CSRF Token | CSRF tokens protect against unauthorized actions by verifying that requests originate from the expected user | /client/cypress/e2e/login.cy.js | N/A    | /server/tests/server.test.js  | /auth/csrf-token |


## Instructions to generate and view coverage report 

For our project, we used code coverage tools for both Cypress e2e and Jest unit tests. Here are the steps to generate code coverage reports for both:

### Jest Coverage

1) Navigate to the server folder -- `cd server/`
2) Run `npm install` to install all necessary dependencies, including Jest itself
3) Once all packages have been installed, run `npm jest -- --coverage` to run all Jest Unit tests with code coverage
4) After all tests have been executed, a *coverage* folder will generate in the server folder
5) Navigate to `coverage > lcov-report > index.html`
6) Open *index.html* in your browser (you can right-click and copy the path or directly open in browser, depending on your IDE)
7) From this dashboard, you will be able to see code coverage percentage for Statements, Branches, Functions, and Lines

Here is what it should look like:

![Jest Unit Test Code Coverage](https://github.com/CSE-316-Software-Development/final-project-xiaojin-jaime/assets/77062077/08a7e374-a28c-4a26-8aa7-8ab7e5833fa9)

### Cypress e2e Coverage

**NOTE:** While the necessary dependencies should be automatically installed when running `npm install`, please make sure Cypress code coverage (`npm install @cypress/code-coverage --save-dev`) and your code is instrumented (`npx nyc instrument --compact=false src instrumented`)

1) Navigate to the server folder -- `cd server/ `
2) Run `npm install` to install all necessary dependencies
3) Navigate to the client folder -- `cd.. ` then `cd client/`
4) Run `npm install` to install all necessary dependencies
5) From the client folder, run `npx cypress run` to run all Cypress e2e tests and generate a code coverage report
6) After all tests have been executed, a *coverage* folder will generate in the client folder
7) Navigate to `coverage > lcov-report > index.html`
6) Open *index.html* in your browser (you can right-click and copy the path or directly open in browser, depending on your IDE)
7) From this dashboard, you will be able to see code coverage percentage for Statements, Branches, Functions, and Lines

Here is what it should look like:

![Cypress E2E Code Coverage](https://github.com/CSE-316-Software-Development/final-project-xiaojin-jaime/assets/77062077/999468ec-e46f-443b-929d-d0e6344de440)

## Extra Credit Section (if applicable)

In addition to the required features, we also implemented the ability for users to bookmark questions and view their saved questions. For security mechanisms, we implemented both password encryption and CSRF tokens to mitigate the threat of unauthorized access. The corresponding tests have been listed above.
