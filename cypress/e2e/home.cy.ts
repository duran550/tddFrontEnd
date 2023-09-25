describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  context('home section', () => {
    it('the h1 contains the correct test', () => {
      cy.get('.text-4xl').contains('Welcome to TDD app'); //using data test attribute
      cy.get('.flex-col > .text-black').contains(
        'Welcome to TDD, the utility of conversion for a greater perfomance'
      );
      cy.get('div.w-full > .justify-center');
    });
  });
});
