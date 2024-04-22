import Tag from '../../src/components/main/tagPage/tag';
import TagPage from '../../src/components/main/tagPage'
// Tag Component
describe('Tag Page Component Test', () => {
    beforeEach(() => {
        cy.stub(TagPage, 'getTagsWithQuestionNumber').resolves([
            {
                name: 'tag1',
                qcnt: 2
            },
            {
                name: 'tag2',
                qcnt: 3
            }
        ])

        const clickTag = cy.spy().as('clickTagSpy');
        const handleNewQuestion = cy.spy().as('handleNewQuestionSpy');

        cy.mount(<TagPage clickTag={clickTag} handleNewQuestion={handleNewQuestion}/>)
    })
    it('renders the tag page properly', () => {
        cy.get('.bold_title').contains('0 Tags');
        cy.get('.bold_title').contains('All Tags');
        cy.get('.bluebtn').should('have.text', 'Ask a Question');
        cy.get('.tagNode').contains('tag1');
        cy.get('.tagNode').contains('2 questions');
        cy.get('.tagNode').contains('tag2');
        cy.get('.tagNode').contains('3 questions');
    })

    it('clickTag should be called when tag is clicked', () => {
        cy.get('.tagNode').click({ multiple: true });
        cy.get('@clickTagSpy').should('have.been.calledTwice');
    })

    it('handleNewQuestion should be called when button clicked', () => {
        cy.get('.bluebtn').click();
        cy.get('@handleNewQuestionSpy').should('have.been.calledOnce');
    })
})