import SideNavBar from '../../src/components/main/sideBarNav/index';

it('should have question, tag, and saved post tab', () => {
    const selected = '';
    const handleQuestionsSpy = cy.spy().as('handleQuestionsSpy');
    const handleTagSpy = cy.spy().as('handleTagSpy');
    const handleSavedPostsSpy = cy.spy().as('handleSavedPostsSpy');
    cy.mount(<SideNavBar
                selected={selected}
                handleQuestions={handleQuestionsSpy}
                handleTags={handleTagSpy}
                handleSavedPosts={handleSavedPostsSpy}/>)
    cy.get('#menu_question').contains('Questions');
    cy.get('#menu_tag').contains('Tag');
    cy.get('#menu_savedPosts').contains('Saved Posts');
})

it('Tabs should have been called', () => {
    const selected = '';
    const handleQuestionsSpy = cy.spy().as('handleQuestionsSpy');
    const handleTagSpy = cy.spy().as('handleTagSpy');
    const handleSavedPostsSpy = cy.spy().as('handleSavedPostsSpy');
    cy.mount(<SideNavBar
        selected={selected}
        handleQuestions={handleQuestionsSpy}
        handleTags={handleTagSpy}
        handleSavedPosts={handleSavedPostsSpy}/>)
    cy.get('#menu_question').click();
    cy.get('@handleQuestionsSpy').should('have.been.called');
    cy.get('#menu_tag').click();
    cy.get('@handleTagSpy').should('have.been.called');
    cy.get('#menu_savedPosts').click();
    cy.get('@handleSavedPostsSpy').should('have.been.called');
})