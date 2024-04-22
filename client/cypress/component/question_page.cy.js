
import QuestionHeader from '../../src/components/main/questionPage/header';
import OrderButton from '../../src/components/main/questionPage/header/orderButton';
import QuestionPage from '../../src/components/main/questionPage'


describe('QuestionPage Header and OrderButton Component', () => {
    // Question Page - Order Button
    it('Rendering Order Button', () => {
        const message = 'Test Message'
        const setQuestionOrderSpy = cy.spy('').as('setQuestionOrderSpy')

        cy.mount(<OrderButton
            message={message}
            setQuestionOrder={setQuestionOrderSpy}/>)
        cy.get('.btn').click()
        cy.get('@setQuestionOrderSpy').should('have.been.calledWith', message);

    })

// Question Page - Header Component
    it('Rendering Question Header', () => {
        const title = 'Sample Title'
        const count = 1
        // const newQuestionButton = 'Add a new question'
        const handleNewQuestionSpy = cy.spy().as('handleNewQuestionSpy')
        const setQuestionOrderSpy = cy.spy().as('setQuestionOrderSpy')

        cy.mount(<QuestionHeader
            title_text={title}
            qcnt = {count}
            setQuestionOrder={setQuestionOrderSpy}
            handleNewQuestion={handleNewQuestionSpy}/>)

        cy.get('.bold_title').contains(title)
        cy.get('.bluebtn').click()
        cy.get('@handleNewQuestionSpy').should('have.been.called');
        cy.get('#question_count').contains(count + ' questions')
        cy.get('.btns .btn').eq(0).should('have.text', 'Newest');
        cy.get('.btns .btn').eq(1).should('have.text', 'Active');
        cy.get('.btns .btn').eq(2).should('have.text', 'Unanswered');
        cy.get('.btns .btn').each(($el, index, $list) => {
            cy.wrap($el).click();
            cy.get('@setQuestionOrderSpy').should('have.been.calledWith', $el.text());
        })
    })
})


describe('QuestionPage Question Component Tests', () => {
    beforeEach(() => {
        cy.stub(QuestionPage, 'getQuestionsByFilter').resolves([{
            _id: '1',
            title: 'Example Title 1',
            answers: [],
            votes: 3,
            views: 150,
            tags: [{ _id: '1', name: 'testing' }, { _id: '2', name: 'testing2' }],
            asked_by: 'User1',
            ask_date_time: new Date()
        }])

        // Spies for prop functions
        const handleAnswer = cy.spy().as('handleAnswerSpy');
        const clickTag = cy.spy().as('clickTagSpy');
        const handleNewQuestion = cy.spy().as('handleNewQuestionSpy');

        // Mount the component
        cy.mount(
            <QuestionPage
                handleAnswer={handleAnswer}
                clickTag={clickTag}
                handleNewQuestion={handleNewQuestion}
            />
        );
    });

    it('loads and displays questions correctly', () => {
        cy.get('#question_list').should('contain', 'Example Title 1');
        cy.get('.postStats').should('contain', '0 answers');
        cy.get('.postStats').should('contain', '3 votes');
        cy.get('.postStats').should('contain', '150 views');
        cy.get('.question_tags').should('contain', 'testing');
        cy.get('.question_tags').should('contain', 'testing2');
        cy.get('.question_author').should('contain', 'User1');
        cy.get('.question_meta').should('contain', 'asked 0 seconds ago');
    });

    it('calls handleNewQuestion when the Ask a Question button is clicked', () => {
        cy.get('.bluebtn').click();
        cy.get('@handleNewQuestionSpy').should('have.been.calledOnce');
    });

    it('calls handleAnswer when question title is clicked', () => {
        cy.get('.question').click();
        cy.get('@handleAnswerSpy').should('have.been.calledOnce');
    })

    it('calls clickTag when question tag is clicked', () => {
        cy.get('.question_tag_button').first().click();
        cy.get('@clickTagSpy').should('have.been.calledOnce');
    })
});