describe('template spec9', () => {
  it('passes', () => {

    //do the 8 first
    cy.visit('http://localhost:3000/')

    cy.get('[href="/login"]').click()
    cy.get('#email').type("Scott@gmail.com")
    cy.get('#password').type("Zijingli&123456")
    cy.get('[type="submit"]').click({ multiple: true })

    cy.get('[href="/posts"]').click()

    cy.contains('Thinking').parent().as('post');

    // Click the "Show comments" button
    cy.get('@post').get('#updatePost').click();
    cy.get('@post').get('#editPostTitle').type("Thinking about love")
    cy.get('@post').get('#editPostContent').type("What is love?\n Love depends on yourself")
    cy.get('@post').get('#SavePost').click();


    
  })
})


