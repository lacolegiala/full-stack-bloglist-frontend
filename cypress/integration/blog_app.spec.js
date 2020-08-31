const { func } = require("prop-types")

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.request('POST', 'http://localhost:3001/api/users', {
      username: 'hihii', password: 'hulihulihei'
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
    cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login').click()
    })

    it('A blog can be created', function() {
      cy.get('#create').click()
      cy.get('#title').type('Tournée du Chat Noir')
      cy.get('#author').type('Rodolphe Salis')
      cy.get('#url').type('chatnoir.com')
      cy.get('#blog-submit').click()

      cy.contains('New blog called Tournée du Chat Noir added by Rodolphe Salis')
      cy.get('.bloglist').contains('Tournée du Chat Noir')
    })

    describe.only('When a blog has been created', function() {
      beforeEach(function() {
        cy.get('#create').click()
        cy.get('#title').type('Tournée du Chat Noir')
        cy.get('#author').type('Rodolphe Salis')
        cy.get('#url').type('chatnoir.com')
        cy.get('#blog-submit').click()
      })
      
      it('A blog can be liked', function() {
        cy.get('.bloglist').contains('Tournée du Chat Noir')
        .click()
        
        cy.contains('Like')
        .click()
        
        cy.get('.Notification').contains('Liked')
      })
      
      it('A blog can be removed', function() {
        cy.get('.bloglist').contains('Tournée du Chat Noir')
        .click()
        
        cy.contains('Remove')
        .click()
        
        cy.get('.Notification'). contains('Removed blog Tournée du Chat Noir')
      })
      
      it('A user cannot remove a blog they did not create', function() {
        cy.contains('Logout')
        .click()
        
        cy.get('#username').type('hihii')
        cy.get('#password').type('hulihulihei')
        cy.get('#login').click()
        
        cy.get('.bloglist').contains('Tournée du Chat Noir')
        .click()
        
        cy.get('html').should('not.contain', 'Remove')
      })
      
      it('Blogs are listed in descending order according to their likes', function() {
        cy.get('.bloglist').contains('Tournée du Chat Noir')
        .click()
        
        cy.contains('Like')
        .click()
        .click()
        
        cy.contains('Hide').click()

        cy.get('#create').click()
        cy.get('#title').type('aaaaa')
        cy.get('#author').type('eeeeee')
        cy.get('#url').type('iiii.com')
        cy.get('#blog-submit').click()

        cy.visit('http://localhost:3000')

        cy.get('#title-button').then( titles => {
          cy.wrap(titles[1]).contains('aaaaa').click()
        })

        cy.contains('Like')
        .click()
        .click()
        .click()

        cy.visit('http://localhost:3000')

        cy.get('.link').then( titles => {
          cy.wrap(titles[0]).contains('aaaaa')
        })
      }) 
    })
  })
})