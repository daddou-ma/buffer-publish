const getRandomPostText = () => {
  return `This is my random post text - ${Math.random()
    .toString(36)
    .substring(7)}`;
};

describe('Publish', () => {
  it('creates a new post', () => {
    cy.server();
    cy.route({
      method: 'POST',
      url: '/pusher/auth',
      status: 200,
    }).as('auth');

    cy.login();
    cy.visit('/');
    cy.wait('@auth');
    cy.get('[data-cy=open-composer-button]').click();

    const randomPostText = getRandomPostText();
    cy.get('[data-cy=composer-text-zone]').type(`${randomPostText}`);
    cy.findByText(/add to queue/i).click();
    cy.findByText(randomPostText).should('exist');
  });
});
