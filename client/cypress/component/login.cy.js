import Login from "../../src/components/login"
describe('Login Page Component Test', () => {
    beforeEach(() => {
        cy.stub(Login, 'fetchCsrfToken').resolves('dummy-token');

    })

    it('displays errors when submitting empty fields', () => {
        cy.mount(<Login/>);
        cy.get('.loginBtn').click();

        // Check for error messages
        cy.get('div .input_error').should('contain', 'Email address cannot be empty');
        cy.get('div .input_error').should('contain', 'Password cannot be empty');

    });

    it('shows email inputted by user', () => {
        cy.mount(<Login/>);
        cy.get(' .input_title').contains('Email Address*');
        cy.get('#loginEmailInput').should('have.value', '')
        cy.get('#loginEmailInput').type('abc')
        cy.get('#loginEmailInput').should('have.value', 'abc')
    })

    it('shows password inputted by user', () => {
        cy.mount(<Login/>);
        cy.get(' .input_title').contains('Password*');
        cy.get('#loginPasswordInput').should('have.value', '')
        cy.get('#loginPasswordInput').type('abc')
        cy.get('#loginPasswordInput').should('have.value', 'abc')
    })

    it('shows error when email format invalid', () => {
        cy.mount(<Login/>);
        cy.get('#loginEmailInput').type('abc')
        cy.get('#loginPasswordInput').type('abc1234567');
        cy.get('.loginBtn').click();
        cy.get('div .input_error').should('contain', 'Invalid email format.');
        cy.get('#loginEmailInput').should('have.value', '');
    })

    it('shows error when password invalid', () => {
        cy.mount(<Login/>);
        cy.get('#loginEmailInput').type('abc@test.com');
        cy.get('#loginPasswordInput').type('abc');
        cy.get('.loginBtn').click();
        cy.get('div .input_error').should('contain', "Password is too short (min 8 characters)");
        cy.get('#loginPasswordInput').should('have.value', '');
        cy.get('#loginPasswordInput').type('abc123456789012345678');
        cy.get('.loginBtn').click();
        cy.get('div .input_error').should('contain', "Password is too long (max is 20 characters)");
        cy.get('#loginPasswordInput').should('have.value', '');
    })

    it('shows error when email doesnt match', () => {
        cy.stub(Login, 'login').resolves({success: false, message: "email"});
        cy.mount(<Login/>);
        cy.get('#loginEmailInput').type('abc@test.com');
        cy.get('#loginPasswordInput').type('abc1234567');
        cy.get('.loginBtn').click();
        cy.get('div .input_error').should('contain', 'Email does not exist');
        cy.get('#loginEmailInput').should('have.value', '');
        cy.get('#loginPasswordInput').should('have.value', '');
    })

    it('shows error when password doesnt match', () => {
        cy.stub(Login, 'login').resolves({success: false, message: "password"});
        cy.mount(<Login/>);
        cy.get('#loginEmailInput').type('abc@test.com');
        cy.get('#loginPasswordInput').type('abc1234567');
        cy.get('.loginBtn').click();
        cy.get('div .input_error').should('contain', 'Password does not match');
        cy.get('#loginPasswordInput').should('have.value', '');
    })

    it('call loginUser when login button clicked', () => {
        cy.stub(Login, 'login').resolves({
            success: true,
            user: {
                _id: 1,
                username: 'user',
                contactemail: 'test@test.com',
                password: 'testpassword',
                saved_questions: [],
                upvotedQuestions: [],
                downvoted_questions: []
            }
        })
        const loginUser = cy.spy().as('loginUserSpy');

        cy.mount(<Login loginUser={loginUser}/>);
        cy.get('#loginEmailInput').type('test@test.com');
        cy.get('#loginPasswordInput').type('testpassword');
        cy.get('.loginBtn').click();
        cy.get('@loginUserSpy').should('have.been.called');
    })

    it('call setQuestionPage when back button clicked', () => {
        const setQuestionPage = cy.spy().as('setQuestionPageSpy');
        cy.mount(<Login setQuestionPage={setQuestionPage}/>);
        cy.get('.back-button-container').contains('Back');
        cy.get('.back-button-container').click();
        cy.get('@setQuestionPageSpy').should('have.been.called');
    })

    it('call setSignupPage when signup button clicked', () => {
        const setSignupPage = cy.spy().as('setSignupPageSpy');
        cy.mount(<Login setSignUpPage={setSignupPage}/>);
        cy.get('.link-to-signup').contains("Don't have an account?");
        cy.get('.link-to-signup').contains("Sign Up");
        cy.get('.signupBtn').click();
        cy.get('@setSignupPageSpy').should('have.been.called');
    })

})
