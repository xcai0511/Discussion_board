describe("Login e2e tests", () => {
    beforeEach(() => {
        cy.exec("node ../server/init.js");
    });
    
    afterEach(() => {
        cy.exec("node ../server/destroy.js");
    });

    it("given a user who is not logged in, when the user attempts to log in with proper credentials, then the user will be successfully logged in and the question page should be displayed", () => {
        cy.visit("http://localhost:3000");
        
        cy.wait(1000);

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        cy.wait(1000);

        cy.contains("4 questions");
    });

    it("given a user who is not logged in, when the user attempts to log in but leaves the email address input empty, then the login form should display an email error", () => {
        cy.visit("http://localhost:3000");

        cy.contains("Login").click();
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        cy.contains("Email address cannot be empty");
    });

    it("given a user who is not logged in, when the user attempts to log in but inputs an invalid email format, then the login form should display an email error", () => {
        cy.visit("http://localhost:3000");

        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        cy.contains("Invalid email format.");
    });

    it("given a user who is not logged in, when the user attempts to log in but leaves the password input empty, then the login form should display a password error", () => {
        cy.visit("http://localhost:3000");

        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get(".loginBtn").click();

        cy.contains("Password cannot be empty");
    });

    it("given a user who is not logged in, when the user attempts to log in but inputs an email that does not exist in the database, then the login form should display an email error", () => {
        cy.visit("http://localhost:3000");

        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("fakeuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        cy.contains("Email does not exist");
    });

    it("given a user who is not logged in, when the user attempts to log in but inputs a wrong password, then the login form should display a password error", () => {
        cy.visit("http://localhost:3000");

        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("wrongpassword");
        cy.get(".loginBtn").click();

        cy.contains("Password does not match");
    });

    it("given a user who is not logged in, when the user navigates to the login page but decides they want to go back to the question page, then the back button should navigate them to the question page", () => {
        cy.visit("http://localhost:3000");

        cy.contains("Login").click();
        cy.contains("Back").click();
        cy.wait(1000);

        cy.contains("4 questions");
    });

    it("given a user who is not logged in, when the user navigates to the login page but does not have an account, then the sign up link should navigate them to the sign up form", () => {
        cy.visit("http://localhost:3000");

        cy.contains("Login").click();
        cy.get(".signupBtn").click();

        cy.contains("Username");
        cy.contains("Confirm Password");
    });
});