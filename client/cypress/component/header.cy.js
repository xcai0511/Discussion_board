import Header from '../../src/components/header';
import UserInfo from '../../src/components/header/userInfo';

it('header shows search bar and title', () => {
    const searchQuery = ''
    const title = 'Fake Stack Overflow'
    cy.mount(<Header
        search={searchQuery}/>)
    cy.get('#searchBar').should('have.value', searchQuery)
    cy.get('#searchBar').should('have.attr', 'placeholder')
    cy.get('.title').contains(title)
})

it('header shows login and signup button', () => {
    cy.mount(<Header/>)
    cy.get('.login_button').should('have.text', 'Login');
    cy.get('.signup_button').should('have.text', 'Sign Up');
})

it('search bar shows search text entered by user', () => {
    const searchQuery = 'test search'
    cy.mount(<Header search={searchQuery}/>)
    cy.get('#searchBar').should('have.value', searchQuery)
    cy.get('#searchBar').should('have.attr', 'placeholder');
    cy.get('#searchBar').clear()
    cy.get('#searchBar').type('Search change')
    cy.get('#searchBar').should('have.value', 'Search change')
})

it('set question page called when enter is pressed in search', () => {
    const setQuestionPageSpy = cy.spy().as('setQuestionPageSpy')
    const searchQuery = 'test search'
    cy.mount(<Header
        search={searchQuery}
        setQuestionPage={setQuestionPageSpy}/>)
    cy.get('#searchBar').type('{enter}')
    cy.get('@setQuestionPageSpy').should('have.been.calledWith', searchQuery, 'Search Results')
})

it('log in called when login button clicked', () => {
    const setLoginPage = cy.spy().as('setLoginPageSpy');
    cy.mount(<Header setLoginPage={setLoginPage}/>);
    cy.get('.login_button').click();
    cy.get('@setLoginPageSpy').should('have.been.calledOnce');
})

it('Signup called when signup button clicked', () => {
    const setSignUpPage = cy.spy().as('setSignUpPageSpy');
    cy.mount(<Header setSignUpPage={setSignUpPage}/>);
    cy.get('.signup_button').click();
    cy.get('@setSignUpPageSpy').should('have.been.calledOnce');
})

it('Header should show profile and logout button after logging in', () => {
    const loggedIn = true;
    const user = {username: 'test user', contactemail: 'test@gmail.com'};
    const handleLogout = cy.spy().as('handleLogoutSpy');
    const setProfilePage = cy.spy().as('setProfilePageSpy');
    cy.mount(<Header
        loggedIn={loggedIn}
        user={user}
        handleLogout={handleLogout}
        setProfilePage={setProfilePage}/>);
    cy.get('.user_email').should('have.text', user.contactemail);
    cy.get('.logout_button').should('have.text', 'Logout');
})

it('setUserProfile should have been called when profile button clicked', () => {
    const loggedIn = true;
    const user = {username: 'test user', contactemail: 'test@gmail.com'};
    const setProfilePage = cy.spy().as('setProfilePageSpy');
    cy.mount(<Header
        loggedIn={loggedIn}
        user={user}
        setProfilePage={setProfilePage}/>);
    cy.get('.user_email').click();
    cy.get('@setProfilePageSpy').should('have.been.calledOnce');
})

it('handle log out', () => {
    cy.stub(Header, 'logout').returns({success: true});
    const user = {username: 'test user', contactemail: 'test@gmail.com'};
    const handleLogout = cy.spy().as('handleLogoutSpy');
    cy.mount(<Header
        loggedIn={true}
        user={user}
        handleLogout={handleLogout}/>);
    cy.get('.logout_button').click();
    cy.get('@handleLogoutSpy').should('have.been.called');
})