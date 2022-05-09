/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Create recomendation', () => {
  it('should create a recommendation song', () => {
    const recommendation = {
      name: 'Like Sand',
      youtubeLink: 'https://www.youtube.com/watch?v=CMtGsrID-qM&ab_channel=InFlames-Topic',
    };

    cy.visit('http://localhost:3000');
    cy.get('input:first').should('have.attr', 'placeholder', 'Name').type(recommendation.name);
    cy.get('input:last').should('have.attr', 'placeholder', 'https://youtu.be/...').type(recommendation.youtubeLink);
    cy.intercept('POST', 'http://localhost:5000/recommendations').as('createRecommendation');
    cy.get('button').click();
    cy.wait('@createRecommendation');
    cy.contains(recommendation.name);
  });
});
