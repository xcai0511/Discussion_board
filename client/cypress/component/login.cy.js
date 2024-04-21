import Login from "../../src/components/login"
import LoginForm from "../../src/components/login/loginForm"
it('displays errors when submitting empty fields', () => {
    const loginUser = cy.spy().as('loginUserSpy');
    const setQuestionPage = cy.spy().as('setQuestionPageSpy');
    const setSignUpPage = cy.spy().as('setSignUpPageSpy');

    cy.mount(
        <Login
            loginUser={loginUser}
            setQuestionPage={setQuestionPage}
            setSignUpPage={setSignUpPage}
        />
    );

    // Attempt to login without entering credentials
    cy.get('.form_postBtn').click();

    // Check for error messages
    cy.get('div .input_error').should('contain', 'Email cannot be empty');
    cy.get('div .input_error').should('contain', 'Password cannot be empty');

});

it('renders and handles input correctly', () => {
    const loginUser = cy.spy().as('loginUserSpy');
    const setQuestionPage = cy.spy().as('setQuestionPageSpy');
    const setSignUpPage = cy.spy().as('setSignUpPageSpy');
    const handleLogin = cy.spy().as('handleLoginSpy')

    cy.mount(
        <Login
            loginUser={loginUser}
            setQuestionPage={setQuestionPage}
            setSignUpPage={setSignUpPage}
        />
    );

    cy.get('#loginUsernameInput').type('test@example.com');
    cy.get('#loginPasswordInput').type('password123');

    // Submit the form
    cy.get('.form_postBtn').click();
    cy.get('@handleLoginSpy').should('have.been.calledWith');

});
