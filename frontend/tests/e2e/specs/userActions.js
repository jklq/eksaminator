describe('Registration', () => {
  cy.visit('/register');

  it('Contains all the correct fields and a title', () => {
    cy.contains('h1', 'Lag en bruker');
    cy.contains('label', 'Navn').should('not.have.attr', 'required');
    cy.contains('label', 'Brukernavn').should('have.attr', 'required');
    cy.contains('label', 'E-post').should('have.attr', 'required');
    cy.contains('label', 'Passord').should('have.attr', 'required');
    cy.contains('label', 'Bekreft Passord').should('have.attr', 'required');
  });

  context('Registration with Invalid Inputs', () => {
    beforeEach(() => {
      cy.get('#name-input').type('John Doe');
      cy.get('#username-input').type('jklq0');
      cy.get('#email-input').type('email@email.com');
      cy.get('#password-input').type('ValidValidPassword123321');
      cy.get('#password-confirmation-input').type('ValidValidPassword123321');
    });
    afterEach(() => {
      cy.get('#submit-button').click();
      cy.get('.error').should('be.visible');
    });

    it('Does not work to register with invalid username', () => {
      cy.get('#username-input').type('jk');
    });

    it('Does not work to register with invalid password', () => {
      cy.get('#password-input').type('123');
      cy.get('#password-confirmation-input').type('123');
    });

    it('Does not work to register with non-matching passwords', () => {
      cy.get('#password-input').type('ThisPasswordIsValid172');
      cy.get('#password-confirmation-input').type('ThisPasswordIsAlsoValid1231');
    });
  });

  it('Works to register with valid details', () => {
    cy.get('#name-input').type('John Doe');
    cy.get('#username-input').type('jklq0');
    cy.get('#email-input').type('email@email.com');
    cy.get('#password-input').type('ValidValidPassword123321');
    cy.get('#password-confirmation-input').type('ValidValidPassword123321');
    cy.get('#submit-button').click();
    cy.url().should('include', 'app');
  });
});

describe('Login', () => {
  cy.visit('/login');

  it('Contains all the correct fields and a title', () => {
    cy.contains('h1', 'Logg inn');
    cy.contains('label', 'E-post').should('have.attr', 'required');
    cy.contains('label', 'Passord').should('have.attr', 'required');
  });

  context('Login with Invalid Inputs', () => {
    beforeEach(() => {
      cy.get('#email-input').type('email@email.com');
      cy.get('#password-input').type('ValidValidPassword123321');
    });
    afterEach(() => {
      cy.get('#submit-button').click();
      cy.get('.error').should('be.visible');
    });

    it('Does not work to log in with invalid username', () => {
      cy.get('#username-input').type('jk');
    });

    it('Does not work to log in with invalid password', () => {
      cy.get('#password-input').type('123');
      cy.get('#password-confirmation-input').type('123');
    });
  });

  it('Works to log in with valid details', () => {
    cy.get('#email-input').type('email@email.com');
    cy.get('#password-input').type('ValidValidPassword123321');
    cy.get('#submit-button').click();
    cy.url().should('include', 'app');
  });
});
