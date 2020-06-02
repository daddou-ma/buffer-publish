const getRandomPostText = () => {
  return `This is my random post text - ${Math.random()
    .toString(36)
    .substring(7)}`;
};

describe('Publish', () => {
  it('creates a new post', () => {
    cy.login();
    cy.visit('/');
    cy.get('[data-cy=open-composer-button]').click();
    const randomPostText = getRandomPostText();
    cy.get('[data-cy=composer-text-zone]').type(
      `${randomPostText}{cmd}{enter}`
    );
    cy.get('[data-cy=post]').should('contain', randomPostText);
  });
});
