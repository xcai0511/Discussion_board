describe("Create new posts e2e tests", () => {
    beforeEach(() => {
        cy.exec("node ../server/init.js");
    });
    
    afterEach(() => {
        cy.exec("node ../server/destroy.js");
    });

    it("given a user who is not logged in, when the user attempts to create a new question, then the program should prompt the user to log in", () => {
        cy.visit("http://localhost:3000");
        cy.contains("Ask a Question").click();
        cy.contains("Please log in to ask questions");
    });

    it("given a user who is logged in, when the user attempts to create a new question with all form fields entered correctly, then the new question should be successfully added and displayed on the questions page", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        // Ask question
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question Q1");
        cy.get("#formTextInput").type("Test Question Q1 Text T1");
        cy.get("#formTagInput").type("react");
        cy.contains("Post Question").click();

        cy.wait(1000);

        cy.contains("Fake Stack Overflow");
        cy.contains("5 questions");
        cy.contains("Test Question Q1");
    });

    it("given a user who is logged in, when the user attempts to create a new question with all form fields entered correctly, the new question should be successfully added and displayed on the questions page, then clicking the question should increment the view count by one and display the answer page", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        // Ask question
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question Q1");
        cy.get("#formTextInput").type("Test Question Q1 Text T1");
        cy.get("#formTagInput").type("react");
        cy.contains("Post Question").click();

        cy.wait(1000);

        cy.contains("Fake Stack Overflow");
        cy.contains("5 questions");
        cy.contains("Test Question Q1");

        // Navigate to answer page
        cy.contains("Test Question Q1").click();
        cy.contains("0 answers");
        cy.contains("1 views");
    });

    it("given a user who is logged in, when the user attempts to create a new question but inputs a title longer than 100 characters, then the new question form should display a title error", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        // Ask question with error
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question Q1 Test Question Q1 Test Question Q1 Test Question Q1 Test Question Q1 Test Question Q1 Test Question Q1 Test Question Q1 Test Question Q1 Test Question Q1 Test Question Q1 Test Question Q1 Test Question Q1 Test Question Q1 Test Question Q1 Test Question Q1 Test Question Q1");
        cy.get("#formTextInput").type("Test Question Q1 Text T1");
        cy.get("#formTagInput").type("react");
        cy.contains("Post Question").click();
        cy.contains("Title cannot be more than 100 characters");
    })

    it("given a user who is logged in, when the user attempts to create a new question but does not input a title, then the new question form should display a title error", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        // Ask question with error
        cy.contains("Ask a Question").click();
        cy.get("#formTextInput").type("Test Question Q1 Text T1");
        cy.get("#formTagInput").type("react");
        cy.contains("Post Question").click();
        cy.contains("Title cannot be empty");
    });

    it("given a user who is logged in, when the user attempts to create a new question but inputs no tags, then the new question form should display a tag error", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        // Ask question with error
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question Q1");
        cy.get("#formTextInput").type("Test Question Q1 Text T1");
        cy.contains("Post Question").click();
        cy.contains("Should have at least 1 tag");
    });

    it("given a user who is logged in, when the user attempts to create a new question but inputs more than five tags, then the new question form should display a tag error", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        // Ask question with error
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question Q1");
        cy.get("#formTextInput").type("Test Question Q1 Text T1");
        cy.get("#formTagInput").type("t1 t2 t3 t4 t5 t6");
        cy.contains("Post Question").click();
        cy.contains("Cannot have more than 5 tags");
    });

    it("given a user who is logged in, when the user attempts to create a new question but inputs a duplicate tag, then the question should be displayed with only one tag", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        // Ask question with error
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question Q1");
        cy.get("#formTextInput").type("Test Question Q1 Text T1");
        cy.get("#formTagInput").type("react react");
        cy.contains("Post Question").click();

        // Check tags
        cy.contains("Test Question Q1");
        cy.get("#searchBar").type("Test{enter}");
        cy.wait(1000);
        cy.get(".question_tags")
            .find(".question_tag_button")
            .should("have.length", 1)
            .and("contain", "react");
    });

    it("given a user who is logged in, when the user attempts to create a new question but inputs a tag longer than 20 characters, then the new question form should display a tag error", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        // Ask question with error
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question Q1");
        cy.get("#formTextInput").type("Test Question Q1 Text T1");
        cy.get("#formTagInput").type("reactreactreactreactreact");
        cy.contains("Post Question").click();
        cy.contains("New tag length cannot be more than 20");
    });

    it("given a user who is logged in, when the user attempts to create a new question but leaves the text field empty, then the new question form should display a text error", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        // Ask question with error
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question Q1");
        cy.get("#formTagInput").type("react");
        cy.contains("Post Question").click();
        cy.contains("Question text cannot be empty");
    });

    it("given a user who is logged in, when the user attempts to create a new question but inputs an invalid hyperlink, then the new question form should display a text error", () => {
        const invalidUrls = [
            "[Google](htt://www.google.com)",
            "[Microsoft](microsoft.com)",
            "[](https://www.google.com/)",
            "[link]()",
            "dfv[]()",
            "[link](http://www.google.com/)",
            "[Google](https//www.google.com)",
            "[GitHub](http//github.com)",
            "[Facebook](https:/facebook.com)",
            "[Twitter](://twitter.com)",
            "[Netflix](htps://www.netflix)",
            "[Google](htts://www.goo<gle.com)",
            "[Google](http://www.google)",
            "[Dropbox](ttps://www.dropbox.c-m)",
            "[LinkedIn](ps:/www.linkedin.com)",
            "[Adobe](ttps://www.adobe..com)",
            "[Spotify](ttp:///www.spotify.com)",
            "[Reddit](http://reddit)",
            "[Wikipedia](tps://www.wikipedia=com)",
        ];

        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        // Ask question with error
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question Q1 Invalid Hyperlinks");
        invalidUrls.forEach((url) => {
            cy.get("#formTextInput").clear().type(`This is an invalid link: ${url}`);
            cy.get("#formTagInput").clear().type("react");
            cy.contains("Post Question").click();
            cy.contains("Invalid hyperlink format");
        });
        cy.visit("http://localhost:3000");
        cy.contains("How to add an invalid hyperlink in Markdown?").should(
            "not.exist"
        );
    });

    it("given a user who is logged in, when the user attempts to add three new questions, then the new questions should be displayed on the question page and clicking the unanswered button should verify the sequence of questions", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        cy.wait(1000);

        // add a question
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question A");
        cy.get("#formTextInput").type("Test Question A Text");
        cy.get("#formTagInput").type("javascript");
        cy.contains("Post Question").click();

        cy.wait(1000);

        // add another question
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question B");
        cy.get("#formTextInput").type("Test Question B Text");
        cy.get("#formTagInput").type("javascript");
        cy.contains("Post Question").click();

        cy.wait(1000);

        // add another question
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question C");
        cy.get("#formTextInput").type("Test Question C Text");
        cy.get("#formTagInput").type("javascript");
        cy.contains("Post Question").click();

        cy.wait(1000);

        // clicks unanswered
        cy.contains("Unanswered").click();
        const qTitles = ["Test Question C", "Test Question B", "Test Question A",];
        cy.get(".postTitle").each(($el, index, $list) => {
            cy.wrap($el).should("contain", qTitles[index]);
        });
    });

    it("given a user who is logged in, when the user attempts to add three new questions, then the new questions should be displayed on the question page and searching for unanswered questions should verify the sequence of questions", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        // add a question
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question A");
        cy.get("#formTextInput").type("Test Question A Text");
        cy.get("#formTagInput").type("javascript");
        cy.contains("Post Question").click();

        cy.wait(1000);

        // add another question
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question B");
        cy.get("#formTextInput").type("Test Question B Text");
        cy.get("#formTagInput").type("javascript");
        cy.contains("Post Question").click();

        cy.wait(1000);

        // add another question
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question C");
        cy.get("#formTextInput").type("Test Question C Text");
        cy.get("#formTagInput").type("javascript");
        cy.contains("Post Question").click();

        cy.wait(1000);

        // searches for unanswered
        cy.get("#searchBar").type("answers:0{enter}");
        cy.wait(1000);
        const qTitles = ["Test Question C", "Test Question B", "Test Question A",];
        cy.get(".postTitle").each(($el, index, $list) => {
            cy.wrap($el).should("contain", qTitles[index]);
        });
    });

    it("given a user who is logged in, when the user attempts to add three new questions and one new answer, then the new questions should be displayed on the question page and clicking the unanswered button should verify the sequence of questions", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        // add a question
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question A");
        cy.get("#formTextInput").type("Test Question A Text");
        cy.get("#formTagInput").type("javascript");
        cy.contains("Post Question").click();

        cy.wait(1000);

        // add another question
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question B");
        cy.get("#formTextInput").type("Test Question B Text");
        cy.get("#formTagInput").type("javascript");
        cy.contains("Post Question").click();

        cy.wait(1000);

        // add another question
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question C");
        cy.get("#formTextInput").type("Test Question C Text");
        cy.get("#formTagInput").type("javascript");
        cy.contains("Post Question").click();

        cy.wait(1000);

        // add an answer to question A
        cy.contains("Test Question A").click();
        cy.get("#answerTextInput").type("Answer Question A");
        cy.contains("Post Answer").click();

        cy.wait(1000);

         // go back to main page
        cy.contains("Questions").click();

        // clicks unanswered
        cy.contains("Unanswered").click();
        const qTitles = ["Test Question C", "Test Question B"];
        cy.get(".postTitle").each(($el, index, $list) => {
            cy.wrap($el).should("contain", qTitles[index]);
        });
    });
});