import AnswerHeader from '../../src/components/main/answerPage/header';
import QuestionBody from '../../src/components/main/answerPage/questionBody'
import Answer from '../../src/components/main/answerPage/answer';
//import AnswerPage from '../../src/components/main/answerPage'
import NewAnswer from "../../src/components/main/answerPage/newAnswer";
// Answer Page - Header Tests
it('Answer Header component shows question title, answer count and onclick function', () => {
    const answerCount = 3;
    const title = 'android studio save string shared preference, start activity and load the saved string';
    const handleNewQuestion = cy.spy().as('handleNewQuestionSpy');

    cy.mount(<AnswerHeader
        ansCount={answerCount}
        title={title}
        handleNewQuestion={handleNewQuestion}/>);
    cy.get('.bold_title').contains(answerCount + " answers");
    cy.get('.answer_question_title').contains(title);
    cy.get('.bluebtn').click();
    cy.get('@handleNewQuestionSpy').should('have.been.called');
})

// Answer Page - Question Body
it('Component should have a question body which shows question text, views, asked by and asked', () => {
    const questionBody = 'Sample Question Body'
    const views = '150'
    const askedBy = 'vanshitatilwani'
    const date = new Date().toLocaleString()
    cy.mount(<QuestionBody
        text={questionBody}
        views={views}
        askby={askedBy}
        meta={date}
    />)

    cy.get('.answer_question_text > div').contains(questionBody)
    cy.get('.answer_question_view').contains(views + ' views')
    cy.get('.answer_question_right > .question_author').contains(askedBy)
    cy.get('.answer_question_right > .answer_question_meta').contains('asked ' + date)

})

// Answer Page - Answer component
it('Component should have a answer text ,answered by and answered date', () => {
    const answerText = 'Sample Answer Text'
    const answeredBy = 'joydeepmitra'
    const date = new Date().toLocaleString()
    cy.mount(<Answer
        text={answerText}
        ansBy={answeredBy}
        meta={date}
    />)

    cy.get('.answerText').contains(answerText)
    cy.get('.answerAuthor > .answer_author').contains(answeredBy)
    cy.get('.answerAuthor > .answer_question_meta').contains(date)


})

it('mounts', () => {
    cy.mount(<NewAnswer/>)
    cy.get('#answerUsernameInput')
    cy.get('#answerTextInput')
    cy.get('.form_postBtn')
})

it('shows error message when both input is empty', () => {
    cy.mount(<NewAnswer/>)
    cy.get('.form_postBtn').click()
    cy.get('div .input_error').contains('Username cannot be empty')
    cy.get('div .input_error').contains('Answer text cannot be empty')
})

it('shows username inputted by user', () => {
    cy.mount(<NewAnswer/>)
    cy.get('#answerUsernameInput').should('have.value', '')
    cy.get('#answerUsernameInput').type('abc')
    cy.get('#answerUsernameInput').should('have.value', 'abc')
})

it('shows error message when text is empty', () => {
    cy.mount(<NewAnswer/>)
    cy.get('#answerUsernameInput').type('abc')
    cy.get('.form_postBtn').click()
    cy.get('div .input_error').contains('Answer text cannot be empty')
})

it('shows text inputted by user', () => {
    cy.mount(<NewAnswer/>)
    cy.get('#answerTextInput').should('have.value', '')
    cy.get('#answerTextInput').type('abc')
    cy.get('#answerTextInput').should('have.value', 'abc')
})


it('addAnswer is called when click Post Answer', () => {
    const addAnswerSpy = cy.spy().as('addAnswerSpy');
    cy.mount(<NewAnswer qid="123" addAnswer={addAnswerSpy} handleAnswer={() => {}} />);
    cy.get('#answerUsernameInput').type('usr');
    cy.get('#answerTextInput').type('abc');
    cy.get('.form_postBtn').click().then(() => {
        expect(addAnswerSpy).to.be.calledWith(123, { text: 'abc', ansBy: 'usr' });
    });
});

it('handleAnswer is called when click Post Answer', () => {
    const obj = {
        addAnswer: (arg) => {return arg}
    }
    const handleAnswer = cy.spy().as('handleAnswerSpy')
    cy.mount(<NewAnswer qid={123} addAnswer={obj.addAnswer} handleAnswer={handleAnswer} />)
    cy.get('#answerUsernameInput').type('usr')
    cy.get('#answerTextInput').type('abc')
    cy.get('.form_postBtn').click()
    cy.get('@handleAnswerSpy').should('have.been.calledWith', 123)
})

// Anwer Page  - Main Component
// it('Render a Answer Page Component and verify all details', () => {
//     const handleNewQuestion = cy.spy().as('handleNewQuestionSpy')
//     const handleNewAnswer = cy.spy().as('handleNewAnswerSpy')
//     const answers = []
//     for(let index= 1; index <= 2; index++){
//         let newanswer = {
//             aid: index,
//             text: 'Sample Answer Text '+index,
//             ansBy: 'sampleanswereduser'+index,
//             ansDate: new Date(),
//         };
//         answers.push(new AnswerObj(newanswer))
//     }
//
//     let question = {
//         title: 'Sample Question Title',
//         text: 'Sample Question Text',
//         askedBy: 'vanshitatilwani',
//         askDate: new Date(),
//         views : 150,
//         ansIds : answers.map(answer => answer.aid)
//     };
//
//     cy.mount(<AnswerPage
//         question={new Question(question)}
//         ans={answers}
//         handleNewQuestion={handleNewQuestion}
//         handleNewAnswer={handleNewAnswer}
//     />)
//
//     cy.get('.bold_title').contains(answers.length + " answers")
//     cy.get('.answer_question_title').contains(question.title)
//     cy.get('#answersHeader > .bluebtn').click()
//     cy.get('@handleNewQuestionSpy').should('have.been.called');
//
//     cy.get('.answer_question_text > div').contains(question.text)
//     cy.get('.answer_question_view').contains(question.views + ' views')
//     cy.get('.answer_question_right > .question_author').contains(question.askedBy)
//
//     cy.get('.answerText')
//         .eq(0)
//         .find('div')
//         .should('have.text', answers[0].text);
//     cy.get('.answerAuthor > .answer_author').eq(0).should('have.text', answers[0].ansBy)
//
//     cy.get('.answerText')
//         .eq(1)
//         .find('div')
//         .should('have.text', answers[1].text);
//     cy.get('.answerAuthor > .answer_author').eq(0).should('have.text', answers[0].ansBy)
//
//     cy.get('.ansButton').click();
//     cy.get('@handleNewAnswerSpy').should('have.been.called');
//
// })