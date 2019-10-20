describe("Test - Adds the new article", () => {
    it("Visits the app root url", () => {
      cy.visit("/");
      cy.get("#signIn").click();
      cy.get("h1").contains("Sign In");
      cy.get('input[placeholder="Email"]').type("sonali@gmail.com");
      cy.get('input[placeholder="Password"]').type("sonali@123");
      cy.get("button").click();
      cy.get("#newPostLink").click();
      cy.get('input[placeholder="Article Title"]').type("Article 1");
      cy.get('input[placeholder="What\'s this article about?"]').type("Description");
      cy.get("textarea").type("Article Body");
      cy.get('button').click();
      cy.get("h1").contains("Article 1");
      cy.get("#logout").click();
    });
  });