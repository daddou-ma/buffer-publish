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
      url: '/rpc/queuedPosts',
      status: 200,
    }).as('getQueuedPosts');

    cy.login();
    cy.visit('/');
    cy.wait('@getQueuedPosts');
    cy.get('[data-cy=open-composer-button]').click();

    const randomPostText = getRandomPostText();
    cy.get('[data-cy=composer-text-zone]').type(`${randomPostText}`);
    cy.findByText(/add to queue/i).click();
    cy.wait('@getQueuedPosts');

    cy.findByText(randomPostText).should('exist');
  });
});
