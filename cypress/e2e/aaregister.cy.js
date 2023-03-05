describe('template spec1', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[href="/register"]').click()
    cy.get('#name').type("naNami")
    cy.get('#email').type("Scott@gmail.com")
    cy.get('#password').type("Zijingli&123456")
    cy.get('[type="submit"]').click({ multiple: true })
    cy.get('[type="link"]').click()
  })
})