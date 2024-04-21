import SideNavBar from '../../src/components/main/sideBarNav/index';

it('should have all the tabs', () => {
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
    cy.get('#menu_savedPosts').contains('Saved');
    cy.get('#menu_users').contains('Users');
    cy.get('#menu_profile').contains('Profile');

})

it('Tabs should have been called', () => {
    const selected = '';
    const handleQuestionsSpy = cy.spy().as('handleQuestionsSpy');
    const handleTagSpy = cy.spy().as('handleTagSpy');
    const handleSavedPostsSpy = cy.spy().as('handleSavedPostsSpy');
    const handleUsersSpy = cy.spy().as('handleUsersSpy');
    const handleProfileSpy = cy.spy().as('handleProfileSpy');
    cy.mount(<SideNavBar
        selected={selected}
        handleQuestions={handleQuestionsSpy}
        handleTags={handleTagSpy}
        handleSavedPosts={handleSavedPostsSpy}
        handleUsers={handleUsersSpy}
        handleProfile={handleProfileSpy}/>)
    cy.get('#menu_question').click();
    cy.get('@handleQuestionsSpy').should('have.been.called');
    cy.get('#menu_tag').click();
    cy.get('@handleTagSpy').should('have.been.called');
    cy.get('#menu_savedPosts').click();
    cy.get('@handleSavedPostsSpy').should('have.been.called');
    cy.get('#menu_users').click();
    cy.get('@handleUsersSpy').should('have.been.called');
    cy.get('#menu_profile').click();
    cy.get('@handleProfileSpy').should('have.been.called');
})