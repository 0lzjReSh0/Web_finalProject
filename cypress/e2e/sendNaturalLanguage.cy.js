describe('template spec4', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')

    cy.get('[href="/login"]').click()
    cy.get('#email').type("Scott@gmail.com")
    cy.get('#password').type("Zijingli&123456")
    cy.get('[type="submit"]').click({ multiple: true })



    cy.get('[href="/posts"]').click()
    cy.get('[type="text"]').type("Thinking")
    cy.get('[type= "postContent"]').type("What is love?\nWhat is the answer")
    cy.get('#language').select("other")
    cy.get('[type="submit"]').click()
    cy.get('[href="/posts"]').click()
  })
})