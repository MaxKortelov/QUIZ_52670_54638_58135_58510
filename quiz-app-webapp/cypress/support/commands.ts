import { selectByTestId } from "../helpers/selectByTestId";

Cypress.Commands.add('login', () => {
  cy.intercept('GET', '/login').as('login');

  cy.visit('/login')
  cy.get(selectByTestId('SingInPage')).should('exist');

  cy.get('#email').type('test1@test.com')
  cy.get('#password').type('11111111')

  cy.wait('@login');
  cy.get('#authSubmit').click()
})

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>
    }
  }
}

export {}
