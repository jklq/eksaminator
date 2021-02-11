// https://docs.cypress.io/api/introduction/api.html

describe('Not logged in', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.contains('h1', 'Din Personlige Eksamen-hjelper');

    it('Contains a working login button', () => {
      cy.contains('Logg inn').should('have.attr', 'href', '/login');
    });
    it('Contains a working register button', () => {
      cy.contains('Lag en gratis bruker').should('have.attr', 'href', '/register');
    });
  });
});
