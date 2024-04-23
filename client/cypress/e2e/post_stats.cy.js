describe("View post statistics e2e tests", () => {
    beforeEach(() => {
        cy.exec("node ../server/init.js");
    });
    
    afterEach(() => {
        cy.exec("node ../server/destroy.js");
    });

    it("given a user is not logged in, when the user navigates to the question page, then the correct question metadata for each question is displayed in sequence", () => {
        cy.visit("http://localhost:3000");

        cy.contains("4 questions");

        const answers = [
            "1 answers",
            "2 answers",
            "3 answers",
            "2 answers",
        ];
        const views = [
            "103 views",
            "200 views",
            "121 views",
            "10 views",
        ];
        const votes = [
            "4 votes",
            "30 votes",
            "26 votes",
            "8 votes",
        ];

        cy.get(".postStats").each(($el, index, $list) => {
            cy.wrap($el).should("contain", answers[index]);
            cy.wrap($el).should("contain", views[index]);
            cy.wrap($el).should("contain", votes[index]);
        });
    });

    it("1. given a user is not logged in, when the user navigates to an answer page, then the correct question stats are displayed for that question", () => {
        cy.visit("http://localhost:3000");

        cy.contains("Programmatically navigate using React router").click();
        cy.contains("2 answers");
        cy.contains("11 views");
        cy.contains("6");
    });

    it("2. given a user is not logged in, when the user navigates to an answer page, then the correct question stats are displayed for that question", () => {
        cy.visit("http://localhost:3000");

        cy.contains("android studio save string shared preference, start activity and load the saved string").click();
        cy.contains("3 answers");
        cy.contains("122 views");
        cy.contains("8");
    });

    it("3. given a user is not logged in, when the user navigates to an answer page, then the correct question stats are displayed for that question", () => {
        cy.visit("http://localhost:3000");

        cy.contains("Object storage for a web application").click();
        cy.contains("2 answers");
        cy.contains("201 views");
        cy.contains("22");
    });

    it("4. given a user is not logged in, when the user navigates to an answer page, then the correct question stats are displayed for that question", () => {
        cy.visit("http://localhost:3000");

        cy.contains("Quick question about storage on android").click();
        cy.contains("1 answers");
        cy.contains("104 views");
        cy.contains("4");
    });
    
    it("given a user who is logged in, when the user attempts to add a new question, then the new question should be displayed on the question page with the correct question metadata", () => {
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
        cy.get("#formTagInput").type("javascript");
        cy.contains("Post Question").click();

        cy.wait(1000);

        cy.contains("Fake Stack Overflow");
        cy.contains("5 questions");
        cy.contains("testuser asked 0 seconds ago");

        const answers = [
            "0 answers",
            "1 answers",
            "2 answers",
            "3 answers",
            "2 answers",
        ];
        const views = [
            "0 views",
            "103 views",
            "200 views",
            "121 views",
            "10 views",
        ];
        const votes = [
            "0 votes",
            "4 votes",
            "30 votes",
            "26 votes",
            "8 votes",
        ]

        cy.get(".postStats").each(($el, index, $list) => {
            cy.wrap($el).should("contain", answers[index]);
            cy.wrap($el).should("contain", views[index]);
            cy.wrap($el).should("contain", votes[index]);
        });
        cy.contains("Unanswered").click();
        cy.get(".postTitle").should("have.length", 1);
        cy.contains("1 question");
    });
});