describe("Post moderation e2e tests", () => {
    beforeEach(() => {
        cy.exec("node ../server/init.js");
    });
    
    afterEach(() => {
        cy.exec("node ../server/destroy.js");
    });

    it("given a user who is logged in, when the user adds a question and navigates to their profile page, then clicking the delete button displays an alert", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question Q1");
        cy.get("#formTextInput").type("Test Question Q1 Text T1");
        cy.get("#formTagInput").type("javascript");
        cy.contains("Post Question").click();
        cy.contains("Test Question Q1");

        cy.contains("Profile").click();
        cy.wait(1000);
        cy.contains("Test Question Q1");
        cy.get(".delete_btn").click();
        cy.on("window:confirm", (confirmText) => {
            expect(confirmText).to.equal("Are you sure you want to delete this question?");
        });
        cy.wait(1000);
    });

    it("given a user who is logged in, when the user adds three questions and deletes one of them, then navigating to the questions page and filtering unanswered questions should verify sequence", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question Q1");
        cy.get("#formTextInput").type("Test Question Q1 Text T1");
        cy.get("#formTagInput").type("javascript");
        cy.contains("Post Question").click();

        cy.wait(1000);
        
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question Q2");
        cy.get("#formTextInput").type("Test Question Q2 Text T2");
        cy.get("#formTagInput").type("react");
        cy.contains("Post Question").click();

        cy.wait(1000);

        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question Q3");
        cy.get("#formTextInput").type("Test Question Q3 Text T3");
        cy.get("#formTagInput").type("storage");
        cy.contains("Post Question").click();

        cy.contains("Profile").click();
        cy.wait(1000);

        cy.get(".delete_btn").eq(0).click();
        cy.wait(1000);
        
        cy.contains("Test Question Q2");
        cy.contains("Test Question Q1");

        cy.contains("Questions").click();
        cy.contains("Unanswered").click();

        const qTitles = [
            "Test Question Q2",
            "Test Question Q1",
        ];

        cy.get(".postTitle").each(($el, index, $list) => {
            cy.wrap($el).should("contain", qTitles[index]);
        });
    });

    it("given a user who is logged in, when the user adds a question and navigates to their profile page, then clicking the delete button should display an alert and clicking cancel should keep the question", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question Q1");
        cy.get("#formTextInput").type("Test Question Q1 Text T1");
        cy.get("#formTagInput").type("javascript");
        cy.contains("Post Question").click();

        cy.contains("Profile").click();
        cy.wait(1000);
        cy.contains("Test Question Q1");

        cy.get(".delete_btn").click();
        
        // Return false to cancel the deletion
        cy.on("window:confirm", () => false);

        cy.contains("Test Question Q1");
        cy.contains("Questions").click();
        cy.contains("Test Question Q1");
    });

    it("given a user who is logged in, when the user adds three questions and navigates to their profile page, then deleting all questions, navigating to the questions page, and filtering unanswered questions should verify the sequence", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question Q1");
        cy.get("#formTextInput").type("Test Question Q1 Text T1");
        cy.get("#formTagInput").type("javascript");
        cy.contains("Post Question").click();

        cy.wait(1000);

        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question Q2");
        cy.get("#formTextInput").type("Test Question Q2 Text T2");
        cy.get("#formTagInput").type("react");
        cy.contains("Post Question").click();

        cy.wait(1000);

        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question Q3");
        cy.get("#formTextInput").type("Test Question Q3 Text T3");
        cy.get("#formTagInput").type("storage");
        cy.contains("Post Question").click();

        cy.contains("Profile").click();
        cy.wait(1000);
        cy.contains("Test Question Q3");
        cy.contains("Test Question Q2");
        cy.contains("Test Question Q1");

        cy.get(".delete_btn").eq(0).click();
        cy.wait(1000);
        cy.contains("Test Question Q2");
        cy.contains("Test Question Q1");

        cy.get(".delete_btn").eq(0).click();
        cy.wait(1000);
        cy.contains("Test Question Q1");

        cy.get(".delete_btn").click();
        cy.wait(1000);
        cy.contains("You haven't posted any questions yet.");

        cy.contains("Questions").click();
        cy.wait(1000);
        cy.contains("Unanswered").click();
        cy.contains("0 questions");
        cy.contains("Test Question Q3").should(
            "not.exist"
        );
        cy.contains("Test Question Q2").should(
            "not.exist"
        );
        cy.contains("Test Question Q1").should(
            "not.exist"
        );
    });
});