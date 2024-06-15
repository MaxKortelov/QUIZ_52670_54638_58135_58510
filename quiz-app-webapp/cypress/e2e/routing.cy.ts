import { selectByTestId } from "../helpers/selectByTestId";

describe('Routing', () => {
  describe('Not authorized user', () => {
    it('main page', () => {
      cy.visit('/');
      cy.get(selectByTestId('SingInPage')).should('exist');
    });
    it('change password page', () => {
      cy.visit('/change-password');
      cy.get(selectByTestId('SingInPage')).should('exist');
    });
    it('create quiz page', () => {
      cy.visit('/create-quiz');
      cy.get(selectByTestId('SingInPage')).should('exist');
    });
    it('login page', () => {
      cy.visit('/login');
      cy.get(selectByTestId('SingInPage')).should('exist');
    });
    it('not exist page ', () => {
      cy.visit('/fasfasfasf');
      cy.get(selectByTestId('SingInPage')).should('exist');
    });
  });

  describe('Authorized user', () => {
    beforeEach(() => {
      cy.login();
    });
    it('main page', () => {
      cy.visit('/');
      cy.get(selectByTestId('HomePage')).should('exist');
    });
    it('change password page', () => {
      cy.visit('/change-password');
      cy.get(selectByTestId('ChangePasswordPage')).should('exist');
    });
    it('create quiz page', () => {
      cy.visit('/create-quiz');
      cy.get(selectByTestId('CreateQuizPage')).should('exist');
    });
    it('not exist page ', () => {
      cy.visit('/fasfasfasf');
      cy.get(selectByTestId('NotFoundPage')).should('exist');
    });
  });
});
