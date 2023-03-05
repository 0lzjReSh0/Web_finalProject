describe('template spec3', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')

    cy.get('[href="/login"]').click()
    cy.get('#email').type("Scott@gmail.com")
    cy.get('#password').type("Zijingli&123456")
    cy.get('[type="submit"]').click({ multiple: true })



    cy.get('[href="/posts"]').click()
    cy.get('[type="text"]').type("test1")
    cy.get('[type= "postContent"]').type("console.log(12345)")
    cy.get('#language').select("JavaScript")
    cy.get('[type="submit"]').click()
    // cy.get('[href="/posts"]').click()
  })
})