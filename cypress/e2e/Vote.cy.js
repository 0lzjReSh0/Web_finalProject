describe('template spec8', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')

    cy.get('[href="/login"]').click()
    cy.get('#email').type("Scott@gmail.com")
    cy.get('#password').type("Zijingli&123456")
    cy.get('[type="submit"]').click({ multiple: true })

    cy.get('[href="/posts"]').click()

    cy.contains('Thinking').parent().as('post');

    /**vote for the post */
    cy.get('@post').get('#vote').click();
    

    
  })
})


