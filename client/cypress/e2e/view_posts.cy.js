describe("View posts e2e tests", () => {
    beforeEach(() => {
        cy.exec("node ../server/init.js");
    });
    
    afterEach(() => {
        cy.exec("node ../server/destroy.js");
    });

    it("given the user is viewing all questions, then the user can see all of the questions in newest order by default", () => {
        const qTitles = [
          "Quick question about storage on android",
          "Object storage for a web application",
          "android studio save string shared preference, start activity and load the saved string",
          "Programmatically navigate using React router",
        ];
    
        cy.visit("http://localhost:3000");
        cy.get(".postTitle").each(($el, index, $list) => {
          cy.wrap($el).should("contain", qTitles[index]);
        });
    });

    it("given the user is viewing all questions, when the user clicks the active button, then the user can see all of the questions in active order", () => {
        const qTitles = [
            "Programmatically navigate using React router",
            "android studio save string shared preference, start activity and load the saved string",
            "Quick question about storage on android",
            "Object storage for a web application",
        ];

        cy.visit("http://localhost:3000");
        cy.contains("Active").click();
        cy.get(".postTitle").each(($el, index, $list) => {
            cy.wrap($el).should("contain", qTitles[index]);
        });
    });

    it("given the user is viewing all questions, when the user clicks the unanswered button, then the user can see all of the questions without answers, which is none", () => {
        cy.visit("http://localhost:3000");
        cy.contains("Unanswered").click();
        cy.contains("0 questions");
    });
});