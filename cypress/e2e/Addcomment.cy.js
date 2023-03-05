describe('template spec6', () => {

  //do the 5 first
  it('passes', () => {
    cy.visit('http://localhost:3000/')

    cy.get('[href="/login"]').click()
    cy.get('#email').type("Scott@gmail.com")
    cy.get('#password').type("Zijingli&123456")
    cy.get('[type="submit"]').click({ multiple: true })

    cy.get('[href="/posts"]').click()

    cy.contains('Thinking').parent().as('post');

    // Click the "Show comments" button
    cy.get('@post').get('#comment').click();

    cy.get('@post').get('#ecomment').type("Maybe there is no answer");
    cy.get('@post').get('#submitComment').click();
    

    
  })
})


