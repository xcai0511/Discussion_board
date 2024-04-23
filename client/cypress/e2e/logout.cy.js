describe("Logout e2e tests", () => {
    beforeEach(() => {
        cy.exec("node ../server/init.js");
    });
    
    afterEach(() => {
        cy.exec("node ../server/destroy.js");
    });

    it("given a user who is logged in, when the user clicks the logout button in the header, then the user should be successfully logged out and navigated to the login page", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        cy.wait(1000);

        cy.contains("Logout").click();
        cy.wait(1000);
        cy.contains("Email Address");
        cy.contains("Password");
        cy.get(".loginBtn");
    });

    it("given a user who is logged in, when the user navigates between pages and their user profile page, then when the user clicks the logout button they should be successfully logged out and able to log back in", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        cy.contains("Tags").click();
        cy.wait(1000);
        cy.contains("7 Tags");
        cy.contains("Users").click();
        cy.wait(1000);
        cy.contains("3 Users");
        cy.contains("Profile").click();
        cy.wait(1000);
        cy.contains("Username: testuser");
        cy.contains("Saved").click();
        cy.wait(1000);
        cy.contains("Object storage for a web application");

        cy.contains("Logout").click();
        cy.wait(1000);
        cy.contains("Email Address");
        cy.contains("Password");
        cy.get(".loginBtn");
    });
});