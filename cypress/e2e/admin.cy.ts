describe('Admin Authentication', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Wrong Authentication', () => {
    cy.get('div.w-full > .justify-center').click(); //gets the login button
    cy.get('#email').type('admin.tdd@td.com');
    cy.get('#password').type('admin');
    cy.get('.bg-white > [tabindex="0"] > .justify-center').click();
    cy.get('.ml-4').should('exist');
  });

  it('Allows user to login', () => {
    cy.get('div.w-full > .justify-center').click(); //gets the login button
    cy.get('#email').type('admin@ttg.com'); // Get's the Email
    cy.get('#password').type('Admin@ttg1'); // Get's the Password
    cy.get('.bg-white > [tabindex="0"] > .justify-center').click();
    cy.location('pathname').should('eq', '/convert'); // Ensures Login Page is redirected to Convert
    cy.get('[type="file"]').selectFile(
      'cypress/images/WV_TRANSELECTRICA_2022_12_202303211413.csv',
      { force: true }
    ); // Get's the file in csv
    cy.get('.Toastify__toast-body > :nth-child(2)'); // Ensures a warning message is displayed if the file uploaded is not a TTG
  });
});
