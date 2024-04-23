import SavedQUestionPage from '../../src/components/main/savedQuestionPage';
import SavedPosts from '../../src/components/main/savedQuestionPage/savedQuestion';

it('Show login message when user not logged in', () => {
    const loggedIn = false;
    cy.mount(<SavedQUestionPage loggedIn={loggedIn}/>);
    cy.get('.login_msg').contains('Saved Questions');
    cy.get('.login_msg').contains('Please login to see saved posts');
})

describe('Saved Questions Page Component when user logged in', () => {
    beforeEach(() => {
        cy.stub(SavedPosts, 'getSavedQuestions').resolves([
            {
                _id: '1',
                title: 'question title 1',
                text: 'question text 1',
                tags: [
                    {
                        _id: 't1',
                        name: 'tag1'
                    },
                    {
                        _id: 't2',
                        name: 'tag2'
                    },
                ],
                asked_by: 'user1',
                ask_date_time: new Date(2024, 3, 1, 9, 10, 20),
                views: 10,
                answers: ['a1', 'a2'],
                votes: 10,
                score: 10
            },
            {
                _id: '2',
                title: 'question title 2',
                text: 'question text 2',
                tags: [
                    {
                        _id: 't3',
                        name: 'tag3'
                    },
                    {
                        _id: 't4',
                        name: 'tag4'
                    }
                ],
                asked_by: 'user2',
                ask_date_time: new Date(2024, 4, 1, 3, 40, 30),
                views: 100,
                answers: ['a3', 'a4', 'a5', 'a6'],
                votes: 20,
                score: 15
            }
        ])

        const user = {_id: 'u1', contactemail: 'test@test.com'}
        const setQuestionOrder = cy.spy().as('setQuestionOrderSpy');
        const clickTag = cy.spy().as('clickTagSpy');
        const handleAnswer = cy.spy().as('handleAnswerSpy');
        const loggedIn = true;

        cy.mount(<SavedQUestionPage
            setQuestionOrder={setQuestionOrder}
            clickTag={clickTag}
            handleAnswer={handleAnswer}
            loggedIn={loggedIn}
            user={user}/>)
    })
    it('header renders correctly', () => {
        cy.get('.bold_title').contains('Saved Questions');
    })
    it('questions renders correctly', () => {
        cy.get('.postStats').contains('2 answers');
        cy.get('.postStats').contains('10 votes');
        cy.get('.postStats').contains('10 views');
        cy.get('.postTitle').contains('question title 1');
        cy.get('.question_tags').contains('tag1');
        cy.get('.question_tags').contains('tag2');
        cy.get('.question_author').contains('user1');
        cy.get('.question_meta').contains('asked Apr 01 at 09:10:20');

        cy.get('.postStats').contains('4 answers');
        cy.get('.postStats').contains('20 votes');
        cy.get('.postStats').contains('100 views');
        cy.get('.postTitle').contains('question title 2');
        cy.get('.question_tags').contains('tag3');
        cy.get('.question_tags').contains('tag4');
        cy.get('.question_author').contains('user2');
        cy.get('.question_meta').contains('asked May 01 at 03:40:30');
    })
    it('clickTag should be called when tags are clicked', () => {
        cy.get('.question_tag_button').click({multiple: true});
        cy.get('@clickTagSpy').should('have.been.called');
    })
    it('handleAnswer should be called when questions are clicked', () => {
        cy.get('.question').click({multiple: true});
        cy.get('@handleAnswerSpy').should('have.been.called');
    })

})

