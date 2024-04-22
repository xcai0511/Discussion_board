import NewQuestion from '../../src/components/main/newQuestion/index';

it('New Question Page should not show when user not logged in', () => {
    const loggedIn = false;
    cy.mount(<NewQuestion loggedIn={loggedIn}/>)
    cy.get('.login_indicator').contains('Please log in to ask questions');
})

describe('New Question Page Components when user logged in', () => {
    beforeEach(() => {
        const loggedIn = true;
        cy.mount(<NewQuestion loggedIn={loggedIn}/>)
    })
    it('shows title inputted by user', () => {
        cy.get('#formTitleInput').should('have.value', '')
        cy.get('#formTitleInput').type('abc')
        cy.get('#formTitleInput').should('have.value', 'abc')
    })

    it('shows text inputted by user', () => {
        cy.get('#formTextInput').should('have.value', '')
        cy.get('#formTextInput').type('abc')
        cy.get('#formTextInput').should('have.value', 'abc')
    })

    it('shows tags inputted by user', () => {
        cy.get('#formTagInput').should('have.value', '')
        cy.get('#formTagInput').type('abc')
        cy.get('#formTagInput').should('have.value', 'abc')
    })


    it('shows error message when inputs are empty', () => {
        cy.get('.form_postBtn').click()
        cy.get('div .input_error').contains('Title cannot be empty')
        cy.get('div .input_error').contains('Question text cannot be empty')
        cy.get('div .input_error').contains('Should have at least 1 tag')
    })

    it('shows error message when title is more than 100 characters', () => {
        cy.get('#formTitleInput').type('a'.repeat(101))
        cy.get('.form_postBtn').click()
        cy.get('div .input_error').contains('Title cannot be more than 100 characters')
    })

    it('shows error message when there are more than five tags', () => {
        cy.get('#formTagInput').type('a b c d e f')
        cy.get('.form_postBtn').click()
        cy.get('div .input_error').contains('Cannot have more than 5 tags')
    })

    it('shows error message when a tag is longer than 20 characters', () => {
        cy.get('#formTagInput').type('a'.repeat(21))
        cy.get('.form_postBtn').click()
        cy.get('div .input_error').contains('New tag length cannot be more than 20')
    })

})

it('Handle Questions should be called when post question button clicked', () => {
    cy.stub(NewQuestion, 'addQuestion').resolves({
        _id: '1',
        title: 'test question title',
        text: 'test question text',
        asked_by: 'user',
        ask_date_time: new Date(),
        tags: ['1', '2'],
    })
    const loggedIn = true;
    const user = {_id: '1', username: 'user'}
    const handleQuestions = cy.spy().as('handleQuestionsSpy');
    cy.mount(<NewQuestion
        loggedIn={loggedIn}
        user={user}
        handleQuestions={handleQuestions}/>)
    cy.get('#formTitleInput').type('test question title');
    cy.get('#formTextInput').type('test question text');
    cy.get('#formTagInput').type('tag1 tag2');
    cy.get('.form_postBtn').click();
    cy.get('@handleQuestionsSpy').should('have.been.called');
})
