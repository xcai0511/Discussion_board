describe("Voting e2e tests", () => {
    beforeEach(() => {
        cy.exec("node ../server/init.js");
    });
    
    afterEach(() => {
        cy.exec("node ../server/destroy.js");
    });

    it("given a user who is not logged in, when the user clicks a question and clicks the upvote button, then the user is prompted to login", () => {
        cy.visit("http://localhost:3000");
        cy.contains("Programmatically navigate using React router").click();
        cy.get("#upvote_button").click();
        // Check for alert
        cy.on("window:alert", (alertText) => {
            expect(alertText).to.equal("Please log in to vote.");
        });
        cy.wait(1000);
    });

    it("given a user who is not logged in, when the user clicks a question and clicks the downvote button, then the user is prompted to login", () => {
        cy.visit("http://localhost:3000");
        cy.contains("Programmatically navigate using React router").click();
        cy.get("#downvote_button").click();
        // Check for alert
        cy.on("window:alert", (alertText) => {
            expect(alertText).to.equal("Please log in to vote.");
        });
        cy.wait(1000);
    });

    it("given a user who is logged in, when the user clicks a question and clicks the upvote button, then the score should increase by 1 and the updated vote count should be displayed on the question page", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        cy.contains("Programmatically navigate using React router").click();

        cy.wait(1000);

        cy.get("#upvote_button").click();
        cy.get(".question_score").contains("7");

        cy.wait(1000);

        cy.contains("Questions").click();
        cy.contains("9 votes");
    });

    it("given a user who is logged in, when the user clicks a question and clicks the downvote button, then the score should decrease by 1 and the updated vote count should be displayed on the question page", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        cy.contains("Programmatically navigate using React router").click();
        cy.get("#downvote_button").click();
        cy.get(".question_score").contains("5");

        cy.wait(1000);

        cy.contains("Questions").click();
        cy.contains("9 votes");
    });

    it("given a user who is logged in, when the user clicks a question and switches their vote from upvote to downvote, then the score should increase by 1 then decrease by 2 and the updated vote count should be displayed on the question page", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        cy.contains("Programmatically navigate using React router").click();
        cy.get("#upvote_button").click();
        cy.get(".question_score").contains("7");

        cy.wait(1000);

        cy.contains("Questions").click();
        cy.contains("9 votes");

        cy.contains("Programmatically navigate using React router").click();
        cy.get("#downvote_button").click();
        cy.get(".question_score").contains("5");

        cy.wait(1000);

        cy.contains("Questions").click();
        cy.contains("9 votes");
    });

    it("given a user who is logged in, when the user clicks a question and switches their vote from downvote to upvote, then the score should decrease by 1 then increase by 2 and the updated vote count should be displayed on the question page", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        cy.contains("Programmatically navigate using React router").click();
        cy.get("#downvote_button").click();
        cy.get(".question_score").contains("5");

        cy.wait(1000);

        cy.contains("Questions").click();
        cy.contains("9 votes");

        cy.contains("Programmatically navigate using React router").click();
        cy.get("#upvote_button").click();
        cy.get(".question_score").contains("7");

        cy.wait(1000);

        cy.contains("Questions").click();
        cy.contains("9 votes");
    });

    it("given a user who is logged in, when the user clicks a question and removes their upvote, then the score should increase by 1 then decrease by 1", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        cy.contains("Programmatically navigate using React router").click();
        cy.get("#upvote_button").click();
        cy.get(".question_score").contains("7");

        cy.wait(1000);

        cy.contains("Questions").click();
        cy.contains("9 votes");

        cy.contains("Programmatically navigate using React router").click();
        cy.get("#upvote_button").click();
        cy.get(".question_score").contains("6");

        cy.wait(1000);

        cy.contains("Questions").click();
        cy.contains("8 votes");
    });

    it("given a user who is logged in, when the user clicks a question and removes their downvote, then the score should decrease by 1 then increase by 1", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        cy.contains("Programmatically navigate using React router").click();
        cy.get("#downvote_button").click();
        cy.get(".question_score").contains("5");

        cy.wait(1000);

        cy.contains("Questions").click();
        cy.contains("9 votes");

        cy.contains("Programmatically navigate using React router").click();
        cy.get("#downvote_button").click();
        cy.get(".question_score").contains("6");

        cy.wait(1000);

        cy.contains("Questions").click();
        cy.contains("8 votes");
    });

    it("given a user who is logged in, when the user clicks a question and clicks upvote, then the score should increase by 1 and navigating to the question page should display the updated vote count and clicking the same question should display the correct score", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        cy.contains("Programmatically navigate using React router").click();
        cy.get("#upvote_button").click();
        cy.get(".question_score").contains("7");

        cy.wait(1000);

        cy.contains("Questions").click();
        cy.contains("9 votes");

        cy.contains("Programmatically navigate using React router").click();
        cy.get(".question_score").contains("7");
    });
});