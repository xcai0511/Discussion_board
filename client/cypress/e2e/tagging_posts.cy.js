describe("Tagging posts e2e tests", () => {
    beforeEach(() => {
        cy.exec("node ../server/init.js");
    });
    
    afterEach(() => {
        cy.exec("node ../server/destroy.js");
    });

    it("given a user who is not logged in, when the user navigates to the tag page, then all of the tags should be displayed and clicking a tag should filter the questions by tag and display them in the correct sequence", () => {
        cy.visit("http://localhost:3000");
        cy.contains("Tags").click();
        cy.contains("react", { matchCase: false });
        cy.contains("javascript", { matchCase: false });
        cy.contains("web-development", { matchCase: false });
        cy.contains("software-engineering", { matchCase: false });
        cy.contains("website", { matchCase: false });
        cy.contains("app", { matchCase: false });
        cy.contains("storage", { matchCase: false });
    });

    it("given a user who is not logged in, when the user navigates to the tag page, then the number of questions associated with each tag should be displayed", () => {
        cy.visit("http://localhost:3000");
        // all question no. should be in the page
        cy.contains("Tags").click();
        cy.contains("7 Tags");
        cy.contains("1 questions");
        cy.contains("2 questions");
    });

    it("given a user who is not logged in, when the user navigates to the tag page, then all of the tags should be displayed and clicking a tag should filter the questions by tag and display them in the correct sequence", () => {

        cy.visit("http://localhost:3000");

        cy.contains("Tags").click();
        cy.contains("javascript").click();
        cy.contains("2 questions");

        const qTitles = [
            "android studio save string shared preference, start activity and load the saved string",
            "Programmatically navigate using React router",
        ];

        cy.get(".postTitle").each(($el, index, $list) => {
            cy.wrap($el).should("contain", qTitles[index]);
        });
    });

    it("given a user who is logged in, when the user adds a question with an existing tag, then the tag count of that tag should increase by 1", () => {
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

        cy.contains("Tags").click();
        cy.contains("3 questions");
    });

    it("given a user who is logged in, when the user adds a question with a new tag, then the new tag should display on the tag page", () => {
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
        cy.get("#formTagInput").type("newtag");
        cy.contains("Post Question").click();

        cy.wait(1000);

        cy.contains("Tags").click();
        cy.contains("newtag");
    });

    it("given a user who is logged in, when the user adds a question with multiple new tags, then the new tags should display on the tag page", () => {
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
        cy.get("#formTagInput").type("t1 t2");
        cy.contains("Post Question").click();

        cy.wait(1000);

        cy.contains("Tags").click();
        cy.contains("t1");
        cy.contains("t2");
    });

    it("given a user who is logged in, when the user adds a question with one new tag and one existing tag, then the new tag should display on the tag page with a tag count of 1 and the existing tag should display with a tag count increased by 1", () => {
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
        cy.get("#formTagInput").type("t1 javascript");
        cy.contains("Post Question").click();

        cy.wait(1000);

        cy.contains("Tags").click();
        cy.contains("t1");
        cy.contains("javascript");
        cy.contains("3 questions");
    });

    it("given a user who is logged in, when the user adds a question and navigates to their profile page to add a new tag to the question, then the new tag should be displayed on the question page and the tag page", () => {
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

        cy.contains("Test Question Q1");

        cy.contains("Profile").click();

        cy.wait(1000);

        cy.contains("Test Question Q1");
        cy.contains("Add Tags").click();
        cy.get(".addTagInput").type("t1");
        cy.contains("Add").click();
        cy.contains("t1");

        cy.contains("Questions").click();
        cy.contains("t1");
        cy.contains("Tags").click();
        cy.contains("t1");
    });

    it("given a user who is logged in, when the user adds a question and navigates to their profile page to add a new tag to the question but decides otherwise, then the new tag should not be displayed", () => {
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

        cy.contains("Test Question Q1");

        cy.contains("Profile").click();

        cy.wait(1000);

        cy.contains("Test Question Q1");
        cy.contains("Add Tags").click();
        cy.get(".addTagInput").type("t1");
        cy.contains("Cancel").click();

        cy.contains("t1").should(
            "not.exist"
        );

        cy.contains("Questions").click();
        cy.contains("t1").should(
            "not.exist"
        );
    });

    it("given a user who is logged in, when the user adds a question and navigates to their profile page to add an existing tag to the question, then the tag should display on the question page and the tag count of the tag should increase by 1", () => {
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

        cy.contains("Test Question Q1");

        cy.contains("Profile").click();

        cy.wait(1000);

        cy.contains("Test Question Q1");
        cy.contains("Add Tags").click();
        cy.get(".addTagInput").type("javascript");
        cy.contains("Add").click();

        cy.contains("javascript");
        cy.contains("Tags").click();
        cy.contains("7 Tags");
        cy.contains("3 questions");
    });

    it("given a user who is logged in, when the user adds a question and navigates to their profile page to add a duplicate tag to the question, then the user should receive a tag alert and the duplicate tag should not be added", () => {
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

        cy.contains("Test Question Q1");

        cy.contains("Profile").click();

        cy.wait(1000);

        cy.contains("Test Question Q1");
        cy.contains("Add Tags").click();
        cy.get(".addTagInput").type("react");
        cy.contains("Add").click();

        cy.on("window:alert", (alertText) => {
            expect(alertText).to.equal("One or more tags you are trying to add are already associated with this question");
        });
        cy.wait(1000);
    });

    it("given a user who is logged in, when the user navigates to the tag page and adds a new question, then the new question should display correctly", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        cy.contains("Tags").click();
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question Q1");
        cy.get("#formTextInput").type("Test Question Q1 Text T1");
        cy.get("#formTagInput").type("react");
        cy.contains("Post Question").click();
        cy.contains("Test Question Q1");
    });

});