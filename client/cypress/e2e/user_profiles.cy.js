describe("User profile e2e tests", () => {
    beforeEach(() => {
        cy.exec("node ../server/init.js");
    });
    
    afterEach(() => {
        cy.exec("node ../server/destroy.js");
    });

    it("given a user who is not logged in, when the user navigates to their profile page, then the user should be prompted to login", () => {
        cy.visit("http://localhost:3000");
        cy.contains("Profile").click();
        cy.contains("User Profile");
        cy.contains("Please login to see your user profile");
    });

    it("given a user who is logged in, when the user navigates to their profile page, then the correct username and email should be displayed", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        cy.contains("Profile").click();
        
        cy.wait(1000);

        cy.contains("Username: testuser");
        cy.contains("Contact Email: testuser@fakeso.com");
    });

    it("given a user who is logged in, when the user navigates to their profile page and successfully changes their password, then a success alert is displayed", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        cy.contains("Profile").click();

        cy.wait(1000);

        cy.contains("Change Password").click();
        cy.get("#currPasswordInput").type("testpassword");
        cy.get("#newPasswordInput").type("newpassword");
        cy.get(".form_postBtn").click();

        cy.on("window:alert", (alertText) => {
            expect(alertText).to.equal("Password updated successfully!");
        });
        cy.wait(1000);
    });

    it("given a user who is logged in, when the user navigates to their profile page to change their password, then the user should be able to logout and log back in with their new credentials", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        cy.contains("Profile").click();

        cy.wait(1000);

        cy.contains("Change Password").click();
        cy.get("#currPasswordInput").type("testpassword");
        cy.get("#newPasswordInput").type("newpassword");
        cy.get(".form_postBtn").click();

        cy.on("window:alert", (alertText) => {
            expect(alertText).to.equal("Password updated successfully!");
        });
        cy.wait(1000);

        cy.contains("Logout").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("newpassword");
        cy.get(".loginBtn").click();

        cy.contains("Profile").click();
        cy.contains("Username: testuser");
        cy.contains("Contact Email: testuser@fakeso.com");
    });

    it("given a user who is logged in, when the user navigates to their profile page to change their password but leaves the current password input blank, then a password error is displayed", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        cy.contains("Profile").click();

        cy.wait(1000);

        cy.contains("Change Password").click();
        cy.get("#newPasswordInput").type("newpassword");
        cy.get(".form_postBtn").click();

        cy.contains("Current password cannot be empty");
    });

    it("given a user who is logged in, when the user navigates to their profile page to change their password but leaves the new password input blank, then a password error is displayed", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        cy.contains("Profile").click();

        cy.wait(1000);

        cy.contains("Change Password").click();
        cy.get("#currPasswordInput").type("testpassword");
        cy.get(".form_postBtn").click();

        cy.contains("New password cannot be empty");
    });

    it("given a user who is logged in, when the user navigates to their profile page to change their password but their new password is too short, then a password error is displayed", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        cy.contains("Profile").click();

        cy.wait(1000);

        cy.contains("Change Password").click();
        cy.get("#currPasswordInput").type("testpassword");
        cy.get("#newPasswordInput").type("test");
        cy.get(".form_postBtn").click();

        cy.contains("Password is too short (minimum is 8 characters)");
    });

    it("given a user who is logged in, when the user navigates to their profile page to change their password but their new password is too long, then a password error is displayed", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        cy.contains("Profile").click();

        cy.wait(1000);

        cy.contains("Change Password").click();
        cy.get("#currPasswordInput").type("testpassword");
        cy.get("#newPasswordInput").type("newpasswordnewpassword");
        cy.get(".form_postBtn").click();

        cy.contains("Password is too long (maximum is 20 characters)");
    });

    it("given a user who is logged in, when the user navigates to their profile page to change their password but their current password is incorrect, then a password error is displayed", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        cy.contains("Profile").click();

        cy.wait(1000);

        cy.contains("Change Password").click();
        cy.get("#currPasswordInput").type("wrongpassword");
        cy.get("#newPasswordInput").type("newpassword");
        cy.get(".form_postBtn").click();

        cy.contains("Invalid current password");
    });

    it("given a user who is logged in, when the user navigates to their profile page to change their profile picture, then their new profile picture should be displayed correctly before and after navigating away from the page", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        cy.contains("Profile").click();

        cy.wait(1000);

        cy.get('.profileImage').then(($img) => {
            const currentSrc = $img.attr('src');

            cy.contains("Change Profile Picture").click();
            cy.get(".profile_image_options img").eq(1).click();
            cy.get(".saveImage_btn").click();
            
            // Check if the new profile picture is displayed correctly
            cy.get('.profileImage').should('have.attr', 'src').and('not.eq', currentSrc);

            cy.contains("Questions").click();
            cy.contains("Profile").click();

            cy.wait(1000);
            
            // Check if the new profile picture is still displayed correctly after navigating away and back
            cy.get('.profileImage').should('have.attr', 'src').and('not.eq', currentSrc);
        });
    });

    it("given a user who is logged in, when the user navigates to their profile page to change their profile picture, then their new profile picture should be displayed correctly upon logging out and logging back in", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        cy.contains("Profile").click();

        cy.wait(1000);

        cy.get('.profileImage').then(($img) => {
            const currentSrc = $img.attr('src');

            cy.contains("Change Profile Picture").click();
            cy.get(".profile_image_options img").eq(1).click();
            cy.get(".saveImage_btn").click();
            
            // Check if the new profile picture is displayed correctly
            cy.get('.profileImage').should('have.attr', 'src').and('not.eq', currentSrc);
            
            cy.contains("Logout").click();
            cy.get("#loginEmailInput").type("testuser@fakeso.com");
            cy.get("#loginPasswordInput").type("testpassword");
            cy.get(".loginBtn").click();

            cy.contains("Profile").click();

            cy.wait(1000);

            cy.get('.profileImage').should('have.attr', 'src').and('not.eq', currentSrc);
        });
    });

    it("given a user who is logged in, when the user navigates to their profile page, then the questions they have asked should be properly displayed (none)", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        cy.contains("Profile").click();

        cy.wait(1000);

        cy.contains("You haven't posted any questions yet.");
    });

    it("given a user who is logged in, when the user asks a question, then the newly added question should be displayed on their profile page", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        // add a question
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question Q1");
        cy.get("#formTextInput").type("Test Question Q1 Text T1");
        cy.get("#formTagInput").type("react");
        cy.contains("Post Question").click();

        // Navigate to user profile
        cy.contains("Profile").click();
        cy.wait(1000);
        cy.contains("Test Question Q1");
    });

    it("given a user who is logged in, when the user navigates to their profile page and confirms that they have no asked questions, then asking a question, adding a tag after posting, and filtering questions by unanswered should all display the question and its attributes correctly", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        cy.contains("Profile").click();
        cy.wait(1000);
        cy.contains("You haven't posted any questions yet.");

        cy.contains("Tags").click();
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question Q1");
        cy.get("#formTextInput").type("Test Question Q1 Text T1");
        cy.get("#formTagInput").type("react");
        cy.contains("Post Question").click();

        cy.contains("Test Question Q1");
        cy.contains("Profile").click();
        cy.contains("Test Question Q1");
        cy.contains("Add Tags").click();
        cy.get(".addTagInput").type("javascript");
        cy.contains("Add").click();

        cy.contains("javascript");
        cy.contains("Questions").click();
        cy.contains("Unanswered").click();
        cy.contains("javascript");

        cy.contains("Tags").click();
        cy.contains("3 questions");
    });

    it("given a user who is not logged in, when the user navigates to the users page, then all of the users should be displayed properly and clicking a user card should filter questions that were posted by them", () => {        
        cy.visit("http://localhost:3000");

        cy.contains("Users").click();

        cy.wait(1000);

        const userNames = [
            "jaimesi",
            "xiaojincai",
            "testuser",
        ];

        cy.get(".userName").each(($el, index, $list) => {
            cy.wrap($el).should("contain", userNames[index]);
        });

        cy.contains("testuser").click();
        cy.contains("0 questions");
    });

    it("given a user who is logged in, when the user clicks the profile button in the header component, then the user should be redirected to their profile page", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        cy.contains("testuser@fakeso.com").click();
        cy.contains("User Profile");
        cy.contains("Username: testuser");
        cy.contains("Contact Email: testuser@fakeso.com");
    });
});