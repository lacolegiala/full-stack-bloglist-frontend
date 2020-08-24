describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', {
      username: 'mluukkai', password: 'salainen'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
    cy.contains('username')
  })

  it('User can log in', function() {
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#login').click()

    cy.contains('mluukkai logged in')
  })

  it('Login fails with wrong password', function() {
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('iihahaa')
    cy.get('#login').click()

    cy.get('.error').contains('wrong credentials')
  })
})