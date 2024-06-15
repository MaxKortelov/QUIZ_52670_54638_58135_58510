import {selectByTestId} from "../helpers/selectByTestId";

describe('quiz flow', () => {
  beforeEach(() => {
    cy.login()
  })
  it('quiz', () => {
    cy.intercept('POST', '/user').as('user');
    cy.intercept('POST', '/quiz/*').as('quiz');
    cy.intercept('POST', '/quiz/start').as('quizStart');
    cy.intercept('POST', '/quiz/question/next').as('quizNextQuestion');

    cy.wait('@user')

    cy.visit('/quiz/7465ddff-224d-4b27-924f-1ba2481ab589/intro');
    cy.get(selectByTestId('QuizInfoPage')).should('exist');

    cy.get('#startQuiz').click();
    cy.wait('@quizStart')

    cy.get(selectByTestId('QuizPage')).should('exist');

    cy.get('.quizQuestionAnswer').first().click();
    cy.get('#nextQuestionButton').click();

    const answerQuestionAndProceed = () => {
      cy.get('.quizQuestionAnswer').first().click();

      if (cy.get('#nextQuestionButton').should('exist')) {
        cy.get('#nextQuestionButton').click();

        cy.wait('@quizNextQuestion')

        answerQuestionAndProceed();
      } else if (cy.get('#submitQuizButton').should('exist')) {
        // cy.get('.answer-option').first().click(); // Отвечаем на последний вопрос
        cy.get('#submitQuizButton').click();
      }
    };

    // answerQuestionAndProceed();
  })
})
