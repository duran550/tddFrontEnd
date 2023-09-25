describe('Super Admin', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  //Wrong Authentication
  it('Wrong Authentication', () => {
    cy.get('div.w-full > .justify-center').click(); //gets the login button
    cy.get('#email').type('admin.tdd@td.com'); // gets the email input field
    cy.get('#password').type('admin'); // gets the password field
    cy.get('.bg-white > [tabindex="0"] > .justify-center').click(); // Clicks on the login bu
    cy.get('.ml-4').should('exist'); // Checking error message after wrong login
  });

  //Right Authentication and download
  it('Allows user to login', () => {
    cy.get('div.w-full > .justify-center').click(); //gets the login button
    cy.get('#email').type('admin.tdd@tdd.com'); // gets the email input field
    cy.get('#password').type('admin'); // gets the password field and puts in correct data
    cy.get('.bg-white > [tabindex="0"] > .justify-center').click(); // Clicks on the login button
    cy.location('pathname').should('eq', '/convert'); // Make sure we go to the convert directory
    cy.get('[type="file"]').selectFile(
      'cypress/images/WV_TTG_2022_12_202303211029.csv',
      { force: true }
    ); // Uploads csv file
    cy.get(
      '[style="z-index: 1; opacity: 1; transform: translateY(0px) translateZ(0px);"] > div.w-full > .justify-center'
    ).click(); // Converts csv file xml file
    cy.get('.Toastify__toast-container'); // File generation successful
    cy.get('.mt-4 > div > .justify-center').click(); // Clicks the download button
  });
});
