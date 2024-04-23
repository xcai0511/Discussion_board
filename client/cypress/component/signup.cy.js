import SignUp from '../../src/components/signup';

describe('SignUp Page input and validation', () => {
    beforeEach(() => {
        cy.stub(SignUp, 'fetchCsrfToken').resolves('dummy-token');
        cy.mount(<SignUp/>);
    })
    it('Input titles', () => {
        cy.get(' .input_title').contains('Username*');
        cy.get(' .input_title').contains('Email Address*');
        cy.get(' .input_title').contains('Password*');
        cy.get(' .input_title').contains('Confirm Password*');
        cy.get('.form_postBtn').should('have.text', 'Sign Up');
        cy.get('.mandatory_indicator').contains('* indicates mandatory fields');
    })
    it('all inputs are empty', () => {
        cy.get('.form_postBtn').click()
        cy.get('div .input_error').should('contain', 'Username cannot be empty');
        cy.get('div .input_error').should('contain', 'Email address cannot be empty');
        cy.get('div .input_error').should('contain', 'Password cannot be empty');
        cy.get('div .input_error').should('contain', 'Confirm password cannot be empty');
    })
    it('username invalid', () => {
        cy.get('#signUpUsernameInput').should('have.value', '');
        cy.get('#signUpUsernameInput').type('123456789012345678901');
        cy.get('#signUpUsernameInput').should('have.value', '123456789012345678901');
        cy.get('.form_postBtn').click();
        cy.get('div .input_error').should('contain', 'Username cannot be more than 20 characters');
        cy.get('#signUpUsernameInput').should('have.value', '');
    })
    it('email invalid', () => {
        cy.get('#signUpUsernameInput').type('testusername');
        cy.get('#signUpEmailInput').should('have.value', '');
        cy.get('#signUpEmailInput').type('abc');
        cy.get('#signUpEmailInput').should('have.value', 'abc');
        cy.get('#signUpPasswordInput').type('12345678');
        cy.get('#signUpPasswordVerifyInput').type('12345678');
        cy.get('.form_postBtn').click()
        cy.get('div .input_error').should('contain', 'Invalid email format.');
        cy.get('#signUpEmailInput').should('have.value', '');
    })
    it('password invalid', () => {
        cy.get('#signUpUsernameInput').type('testusername');
        cy.get('#signUpEmailInput').type('abc@test.com');
        cy.get('#signUpPasswordInput').should('have.value', '');
        cy.get('#signUpPasswordInput').type('1234567');
        cy.get('#signUpPasswordInput').should('have.value', '1234567');
        cy.get('.form_postBtn').click()
        cy.get('div .input_error').should('contain', 'Password is too short (min 8 characters)');
        cy.get('#signUpPasswordInput').should('have.value', '');
        cy.get('#signUpPasswordInput').type('123456789012345678901');
        cy.get('.form_postBtn').click()
        cy.get('div .input_error').should('contain', 'Password is too long (max is 20 characters)');
    })
    it('confirm password invalid', () => {
        cy.get('#signUpUsernameInput').type('testusername');
        cy.get('#signUpEmailInput').type('abc@test.com');
        cy.get('#signUpPasswordInput').type('testpassword');
        cy.get('#signUpPasswordVerifyInput').should('have.value', '');
        cy.get('#signUpPasswordVerifyInput').type('12345678');
        cy.get('#signUpPasswordVerifyInput').should('have.value', '12345678');
        cy.get('.form_postBtn').click()
        cy.get('div .input_error').should('contain', 'Password does not match');
        cy.get('#signUpPasswordVerifyInput').should('have.value', '');
        cy.get('#signUpPasswordInput').should('have.value', '');
    })
})

describe('Signup Page Spies', () => {
    beforeEach(() => {
        cy.stub(SignUp, 'fetchCsrfToken').resolves('dummy-token');
        cy.stub(SignUp, 'addUser').resolves({
            _id: '1',
            username: 'testuser',
            contactemail: 'abc@test.com',
            password: 'testpassword',
            saved_questions: [],
        });
        const signUpUser = cy.spy().as('signUpUserSpy');
        const setQuestionPage = cy.spy().as('setQuestionPageSpy');
        const setLoginPage = cy.spy().as('setLoginPageSpy');
        cy.mount(<SignUp
            signUpUser={signUpUser}
            setQuestionPage={setQuestionPage}
            setLoginPage={setLoginPage}/>);
    })
    it('setQuestionPage should be called when back button clicked', () => {
        cy.get('.back_button_container').contains('Back');
        cy.get('.back_button_container').click();
        cy.get('@setQuestionPageSpy').should('have.been.called');
    })
    it('setLoginPage should be called when login button clicked', () => {
        cy.get('.link_to_login').contains('Already have an account?');
        cy.get('#login_btn').contains('Login');
        cy.get('#login_btn').click();
        cy.get('@setLoginPageSpy').should('have.been.called');
    })
    it('signUpUser should be called when signup button clicked', () => {
        cy.get('.form_postBtn').contains('Sign Up');
        cy.get('.mandatory_indicator').contains('* indicates mandatory fields');
        cy.get('#signUpUsernameInput').type('testusername');
        cy.get('#signUpEmailInput').type('abc@test.com');
        cy.get('#signUpPasswordInput').type('testpassword');
        cy.get('#signUpPasswordVerifyInput').type('testpassword');
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Sign up success!');
        });
        cy.get('.form_postBtn').click();
        cy.get('@signUpUserSpy').should('have.been.called');
    })
})
describe('Signup email already exists', () => {
    it('Signup email already in use', () => {
        cy.stub(SignUp, 'fetchCsrfToken').resolves('dummy-token');
        cy.stub(SignUp, 'addUser').resolves({
            message: 'Email already in user'
        });
        cy.mount(<SignUp/>);
        cy.get('#signUpUsernameInput').type('testusername');
        cy.get('#signUpEmailInput').type('abc@test.com');
        cy.get('#signUpPasswordInput').type('testpassword');
        cy.get('#signUpPasswordVerifyInput').type('testpassword');
        cy.get('.form_postBtn').click();
        cy.get('div .input_error').contains('Account exists, please try again');
    })

})