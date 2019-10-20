// https://docs.cypress.io/api/introduction/api.html

describe("Test - Opens the first article and add comment", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    cy.get("#signIn").click();
    cy.get("h1").contains("Sign In");
    cy.get('input[placeholder="Email"]').type("sonali@gmail.com");
    cy.get('input[placeholder="Password"]').type("sonali@123");
    cy.get("button").click();
    cy.xpath('//*[@id="app"]/div/div[2]/div/div/div[2]/a/h1').click();
    cy.get("textarea").type("add automation comment");
    cy.get('#postCommentButton').click();
    cy.get("#logout").click();
  });
});
