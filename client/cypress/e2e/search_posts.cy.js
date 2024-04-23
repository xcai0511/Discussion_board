describe("Search posts e2e tests", () => {
    beforeEach(() => {
        cy.exec("node ../server/init.js");
    });
    
    afterEach(() => {
        cy.exec("node ../server/destroy.js");
    });

    it("given the user is viewing all questions, when the user searches for a text that matches exactly one question title and enters search, then the user can see the title of the question which contains the search text in its content", () => {
        const qTitles = ["Programmatically navigate using React router"];
        cy.visit("http://localhost:3000");
        cy.get("#searchBar").type("router{enter}");
    
        // Wait for the DOM to stabilize after the search action
        cy.wait(1000);
        cy.get(".postTitle").each(($el, index, $list) => {
            cy.wrap($el).should("contain", qTitles[index]);
        });
    });

    it("given the user is viewing all questions, when the user searches for a tag that matches exactly one question and enters search, then the user can see the question which contains the searched tag in its content", () => {
        const qTitles = ["Programmatically navigate using React router"];
        cy.visit("http://localhost:3000");
        cy.get("#searchBar").type("[react]{enter}");

        // Wait for the DOM to stabilize after the search action
        cy.wait(1000);
        cy.get(".postTitle").each(($el, index, $list) => {
        cy.wrap($el).should("contain", qTitles[index]);
        });
    });

    it("given the user is viewing all questions, when the user searches for a hyphenated tag that matches exactly two questions and enters search, then the user can see the questions which contains the searches hyphenated tag in its content", () => {
        const qTitles = [
            "Quick question about storage on android",
            "android studio save string shared preference, start activity and load the saved string",
        ];
        cy.visit("http://localhost:3000");
        cy.get("#searchBar").type("[web-development]{enter}");
        cy.wait(1000);
        cy.get(".postTitle").each(($el, index, $list) => {
            cy.wrap($el).should("contain", qTitles[index]);
        });
    });

    it("given the user is viewing all questions, when the user searches for two tags that match exactly one question and enters search, then the user can see the question which contains the searched tag in its content", () => {
        const qTitles = ["Object storage for a web application"];
        cy.visit("http://localhost:3000");
        cy.get("#searchBar").type("[app][storage]{enter}");
        cy.wait(1000);
        cy.get(".postTitle").each(($el, index, $list) => {
            cy.wrap($el).should("contain", qTitles[index]);
        });
    });

    it("given the user is viewing all questions, when the user searches for a question author that matches exactly one question and enters search, then the user can see the question which contains the author name", () => {
        const qTitles = ["Quick question about storage on android"];
        cy.visit("http://localhost:3000");
        cy.get("#searchBar").type("user:elephantCDE{enter}");
        cy.wait(1000);
        cy.get(".postTitle").each(($el, index, $list) => {
            cy.wrap($el).should("contain", qTitles[index]);
        });
    });

    it("given the user is viewing all questions, when the user searches for unanswered questions and enters search, then the user can see all of the unanswered questions, which is none", () => {
        cy.visit("http://localhost:3000");
        cy.get("#searchBar").type("answers:0{enter}");
        cy.wait(1000);
        cy.contains("0 questions");
        cy.contains("No Questions Found");
    });

    it("given the user is viewing all questions, when the user searches for questions with exactly one answer with one match and enters search, then the user can see the one question that has one answer", () => {
        const qTitles = ["Quick question about storage on android"];
        cy.visit("http://localhost:3000");
        cy.get("#searchBar").type("answers:1{enter}");
        cy.wait(1000);
        cy.get(".postTitle").each(($el, index, $list) => {
            cy.wrap($el).should("contain", qTitles[index]);
        });
    });

    it("given the user is viewing all questions, when the user searches for questions with a score of 10+ with one match and enters search, then the user can see the one question with a score of higher than 10", () => {
        const qTitles = ["Object storage for a web application"];
        cy.visit("http://localhost:3000");
        cy.get("#searchBar").type("score:10{enter}");
        cy.wait(1000);
        cy.get(".postTitle").each(($el, index, $list) => {
            cy.wrap($el).should("contain", qTitles[index]);
        });
    });

});