describe('Publish', () => {
  it('loads', () => {
    cy.login();
    cy.visit('/');
    cy.findAllByText('What would you like to share?').should('exist');
  });
});
