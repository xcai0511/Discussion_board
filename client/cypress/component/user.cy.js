import UsersPage from '../../src/components/main/usersPage';

describe('Users Page Component Test', () => {
    beforeEach(() => {
        cy.stub(UsersPage, 'getAllUsers').resolves([
            {
                _id: '1',
                username: 'user1',
                profileImage: 'user-avatar-1.png'
            },
            {
                _id: '2',
                username: 'user2',
                profileImage: 'user-avatar-2.png'
            },
            {
                _id: '3',
                username: 'user3',
                profileImage: 'user-avatar-3.png'
            }
        ])
        const clickUser = cy.spy().as('clickUserSpy');
        const handleNewQuestion = cy.spy().as('handleNewQuestionSpy');
        cy.mount(<UsersPage
            clickUser={clickUser}
            handleNewQuestion={handleNewQuestion}/>)
    })
    it('renders header components correctly', () => {
        cy.get('.bold_title').contains('3 Users');
        cy.get('.bold_title').contains('All Users');
    })
    it('renders all user correctly', () => {
        cy.get('.userName').contains('user1');
        cy.get('.userName').contains('user2');
        cy.get('.userName').contains('user3');
        const expectedSrc = [
            'images/user-avatar-1.png',
            'images/user-avatar-2.png',
            'images/user-avatar-3.png'
        ];
        cy.get('.userImage').should('have.length', 3)
            .each((el, index) => {
                expect(el).to.have.attr('src', expectedSrc[index]);
            });
    })
    it('clickUser should be called when user node clicked', () => {
        cy.get('.userNode').click({multiple: true});
        cy.get('@clickUserSpy').should('have.been.called');
    })
    it('handleNewQuestion should be called when user click new question button', () => {
        cy.get('.bluebtn').contains('Ask a Question');
        cy.get('.bluebtn').click();
        cy.get('@handleNewQuestionSpy').should('have.been.called');
    })
})