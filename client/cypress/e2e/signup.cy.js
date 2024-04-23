describe("Signup e2e tests", () => {
    beforeEach(() => {
        cy.exec("node ../server/init.js");
    });
    
    afterEach(() => {
        cy.exec("node ../server/destroy.js");
    });

    it("given a user who is not logged in, when the user navigates to the sign up page and enters valid inputs for all fields, then the user should successfully sign up with those credentials and enable a successful log in", () => {
        cy.visit("http://localhost:3000");

        // Sign up user
        cy.contains("Sign Up").click();
        cy.get("#signUpUsernameInput").type("user1");
        cy.get("#signUpEmailInput").type("user1@test.com");
        cy.get("#signUpPasswordInput").type("userpassword");
        cy.get("#signUpPasswordVerifyInput").type("userpassword");
        cy.get(".form_postBtn").click();

        cy.on("window:alert", (alertText) => {
            expect(alertText).to.equal("Sign up success!");
        });
        cy.wait(1000);

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("user1@test.com");
        cy.get("#loginPasswordInput").type("userpassword");
        cy.get(".loginBtn").click();

        cy.contains("4 questions");
    });

    it("given a user who is not logged in, when the user attempts to sign up for an account but leaves the username field empty, then the sign up form should display a username error", () => {
        cy.visit("http://localhost:3000");

        // Sign up user
        cy.contains("Sign Up").click();
        cy.get("#signUpEmailInput").type("user1@test.com");
        cy.get("#signUpPasswordInput").type("userpassword");
        cy.get("#signUpPasswordVerifyInput").type("userpassword");
        cy.get(".form_postBtn").click();

        cy.contains("Username cannot be empty");
    });

    it("given a user who is not logged in, when the user attempts to sign up for an account but inputs a username longer than 20 characters, then the sign up form should display a username error", () => {
        cy.visit("http://localhost:3000");

        // Sign up user
        cy.contains("Sign Up").click();
        cy.get("#signUpUsernameInput").type("user1user1user1user1user1");
        cy.get("#signUpEmailInput").type("user1@test.com");
        cy.get("#signUpPasswordInput").type("userpassword");
        cy.get("#signUpPasswordVerifyInput").type("userpassword");
        cy.get(".form_postBtn").click();

        cy.contains("Username cannot be more than 20 characters");
    });

    it("given a user who is not logged in, when the user attempts to sign up for an account but leave the email address input blank, then the sign up form should display an email error", () => {
        cy.visit("http://localhost:3000");

        // Sign up user
        cy.contains("Sign Up").click();
        cy.get("#signUpUsernameInput").type("user1");
        cy.get("#signUpPasswordInput").type("userpassword");
        cy.get("#signUpPasswordVerifyInput").type("userpassword");
        cy.get(".form_postBtn").click();

        cy.contains("Email address cannot be empty");
    });

    it("given a user who is not logged in, when the user attempts to sign up for an account but inputs an invalid email format, then the sign up form should display an email error", () => {
        cy.visit("http://localhost:3000");

        // Sign up user
        cy.contains("Sign Up").click();
        cy.get("#signUpUsernameInput").type("user1");
        cy.get("#signUpEmailInput").type("invalidemail");
        cy.get("#signUpPasswordInput").type("userpassword");
        cy.get("#signUpPasswordVerifyInput").type("userpassword");
        cy.get(".form_postBtn").click();

        cy.contains("Invalid email format.");
    });

    it("given a user who is not logged in, when the user attempts to sign up for an account but leaves the password field blank, then the sign up form should display a password error", () => {
        cy.visit("http://localhost:3000");

        // Sign up user
        cy.contains("Sign Up").click();
        cy.get("#signUpUsernameInput").type("user1");
        cy.get("#signUpEmailInput").type("user1@test.com");
        cy.get("#signUpPasswordVerifyInput").type("userpassword");
        cy.get(".form_postBtn").click();

        cy.contains("Password cannot be empty");
    });

    it("given a user who is not logged in, when the user attempts to sign up for an account but inputs a password less than 8 characters, then the sign up form should display a password error", () => {
        cy.visit("http://localhost:3000");

        // Sign up user
        cy.contains("Sign Up").click();
        cy.get("#signUpUsernameInput").type("user1");
        cy.get("#signUpEmailInput").type("user1@test.com");
        cy.get("#signUpPasswordInput").type("user");
        cy.get("#signUpPasswordVerifyInput").type("user");
        cy.get(".form_postBtn").click();

        cy.contains("Password is too short (min 8 characters)");
    });

    it("given a user who is not logged in, when the user attempts to sign up for an account but inputs a password longer than 20 characters, then the sign up form should display a password error", () => {
        cy.visit("http://localhost:3000");

        // Sign up user
        cy.contains("Sign Up").click();
        cy.get("#signUpUsernameInput").type("user1");
        cy.get("#signUpEmailInput").type("user1@test.com");
        cy.get("#signUpPasswordInput").type("user1user1user1user1user1");
        cy.get("#signUpPasswordVerifyInput").type("user1user1user1user1user1");
        cy.get(".form_postBtn").click();

        cy.contains("Password is too long (max is 20 characters)");
    });

    it("given a user who is not logged in, when the user attempts to sign up for an account but leaves the confirm password field blank, then the sign up form should display a password error", () => {
        cy.visit("http://localhost:3000");

        // Sign up user
        cy.contains("Sign Up").click();
        cy.get("#signUpUsernameInput").type("user1");
        cy.get("#signUpEmailInput").type("user1@test.com");
        cy.get("#signUpPasswordInput").type("userpassword");
        cy.get(".form_postBtn").click();

        cy.contains("Confirm password cannot be empty");
    });

    it("given a user who is not logged in, when the user attempts to sign up for an account but the confirm password field does not match the password field, then the sign up form should display a password error", () => {
        cy.visit("http://localhost:3000");

        // Sign up user
        cy.contains("Sign Up").click();
        cy.get("#signUpUsernameInput").type("user1");
        cy.get("#signUpEmailInput").type("user1@test.com");
        cy.get("#signUpPasswordInput").type("userpassword");
        cy.get("#signUpPasswordVerifyInput").type("notmatching");
        cy.get(".form_postBtn").click();

        cy.contains("Password does not match");
    });

    it("given a user who is not logged in, when the user attempts to sign up for an account but uses an email address that is already in the system, then the sign up form should display an account error", () => {
        cy.visit("http://localhost:3000");

        // Sign up user
        cy.contains("Sign Up").click();
        cy.get("#signUpUsernameInput").type("testuser");
        cy.get("#signUpEmailInput").type("testuser@fakeso.com");
        cy.get("#signUpPasswordInput").type("testpassword");
        cy.get("#signUpPasswordVerifyInput").type("testpassword");
        cy.get(".form_postBtn").click();

        cy.contains("Account exists, please try again");
    });

    it("given a user who is not logged in, when the user navigates to the sign up page but decides they want to go back to the questions page, then clicking the back button should navigate the user to the question page", () => {
        cy.visit("http://localhost:3000");

        // Sign up user
        cy.contains("Sign Up").click();
        cy.wait(1000);
        cy.contains("Back").click();
        cy.wait(1000);
        cy.contains("4 questions");
    });

    it("given a user who is not logged in, when the user navigates to the sign up page but already has an account, then clicking the link to log in should navigate the user to the login page", () => {
        cy.visit("http://localhost:3000");

        // Sign up user
        cy.contains("Sign Up").click();
        cy.wait(1000);
        cy.get("#login_btn").click();

        cy.contains("Email Address");
        cy.contains("Password");
        cy.get(".loginBtn");
    });

});