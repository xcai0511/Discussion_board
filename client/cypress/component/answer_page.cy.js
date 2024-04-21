
import AnswerPage from '../../src/components/main/answerPage';
import NewAnswer from '../../src/components/main/answerPage/newAnswer'

describe('AnswerPage Component Test when user not login', () => {
    beforeEach(() => {
        cy.stub(AnswerPage, 'getQuestionById').resolves({
            title: 'Test Question Title',
            text: 'Test Question Text',
            tags: [],
            asked_by: 'user1',
            ask_date_time: new Date(),
            views: 10,
            answers: [{id: '1', text: "test answer", ans_by: "user", ans_date_time: new Date()}],
            votes: 10,
            score: 10
        })

        const qid = 1;
        const handleNewQuestion = cy.spy().as('handleNewQuestionSpy');
        const loggedIn = false;

        cy.mount(<AnswerPage
            qid={qid}
            handleNewQuestioin={handleNewQuestion}
            loggedIn={loggedIn}/>);
    });

    it('loads and displays question header correctly', () => {
        cy.get('.bold_title').contains('1 answers');
        cy.get('.bold_title').contains('Test Question Title');
        cy.get('.bluebtn').should('have.text', 'Ask a Question');
    })

    it('loads and displays question body correctly', () => {
        cy.get('.answer_question_view').contains('10 views');
        cy.get('.answer_question_text').contains('Test Question Text');
        cy.get('.question_author').contains('user1');
        cy.get('.answer_question_meta').contains('asked 0 seconds ago');
    })

    it('loads and displays question answer correctly', () => {
        cy.get('.answerText').contains("test answer");
        cy.get('.answer_author').contains('user');
        cy.get('.answer_question_meta').contains('0 seconds ago');
    })

    it('click save should show alert when user not logging in', () => {
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Please log in to bookmark questions.');
        });
        cy.get('.bookmark_button').click({ force: true });
    })

    it('click upvote should show alert when user not logging in', () => {
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Please log in to vote.');
        });
        cy.get('#upvote_button').click({ force: true });
    })

    it('click downvote should show alert when user not logging in', () => {
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Please log in to vote.');
        });
        cy.get('#upvote_button').click({ force: true });
    })

    it('shows log in message for new answer component', () => {
        cy.get('.log_in_msg').contains("Please log in to add comments");
    })

})

describe('Add answer component when logged in', () => {
    beforeEach(() => {
        cy.stub(AnswerPage, 'getQuestionById').resolves({
            title: 'Test Question Title',
            text: 'Test Question Text',
            tags: [],
            asked_by: 'user1',
            ask_date_time: new Date(2024, 1, 24, 10, 33, 30),
            views: 10,
            answers: [{
                id: '1',
                text: "test answer",
                ans_by: "user",
                ans_date_time: new Date(2024, 3, 20, 12, 22, 30)}],
            votes: 10,
            score: 10
        })

        cy.stub(AnswerPage, 'getUserById').resolves({
            _id: '1',
            username: 'testuser',
            contactemail: 'test@email.com',
            password: 'testpassword',
            profileImage: 'testprofileimage',
            saved_questions: [],
            upvoted_questions: [],
            downvoted_questions: []
        })

        const qid = 1;
        const handleNewQuestion = cy.spy().as('handleNewQuestionSpy');
        const loggedIn = true;
        const user = {
            _id: '1',
            username: 'testuser',
            contactemail: 'test@email.com',
            password: 'testpassword',
            profileImage: 'testprofileimage',
            saved_questions: [],
            upvoted_questions: [],
            downvoted_questions: []};

        cy.mount(<AnswerPage
            qid={qid}
            handleNewQuestioin={handleNewQuestion}
            loggedIn={loggedIn}
            user={user}/>);

    });

    it('new answer shows text inputted by user', () => {
        cy.get('#answerTextInput').should('have.value', '')
        cy.get('#answerTextInput').type('test')
        cy.get('#answerTextInput').should('have.value', 'test');
    })

    it('shows error message when input is empty', () => {
        cy.get('.form_postBtn').should('have.text', 'Post Answer');
        cy.get('.form_postBtn').click();
        cy.get('div .input_error').contains('Answer text cannot be empty')
    })

    it('shows error message when input is invalid', () => {
        cy.stub(NewAnswer, 'validateHyperlink').returns(false)
        cy.get('.form_postBtn').click();
        cy.get('div .input_error').contains('Invalid hyperlink format.')
    })

    it('successfully add answer', () => {
        cy.stub(NewAnswer, 'validateHyperlink').returns(true);
        cy.stub(NewAnswer, 'addAnswer').resolves({
            _id: '1',
            text: 'new answer',
            ans_date_time: new Date()
        })
        const handleAnswer = cy.spy().as('handleAnswerSpy');
        const user = {
            _id: '1',
            username: 'testuser',
            contactemail: 'test@email.com',
            password: 'testpassword',
            profileImage: 'testprofileimage',
            saved_questions: [],
            upvoted_questions: [],
            downvoted_questions: []};
        cy.mount(<NewAnswer
            user={user}
            handleAnswer={handleAnswer}/>);

        cy.get('#answerTextInput').type('new answer')
        cy.get('.form_postBtn').click();
        cy.get('@handleAnswerSpy').should('have.been.calledOnce');
    })

});