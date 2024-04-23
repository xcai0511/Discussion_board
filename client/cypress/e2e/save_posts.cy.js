describe("Save posts e2e tests", () => {
    beforeEach(() => {
        cy.exec("node ../server/init.js");
    });
    
    afterEach(() => {
        cy.exec("node ../server/destroy.js");
    });

    it("given a user who is not logged in, when the user navigates to the saved questions page, then the user should be prompted to login", () => {
        cy.visit("http://localhost:3000");
        cy.contains("Saved").click();
        cy.contains("Please login to see saved posts");
    });

    it("given a user is logged in, when the users navigates to the saved questions page, then the questions should be displayed in proper sequence", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        cy.contains("Saved").click();

        cy.wait(1000);

        const qTitles = [
            "android studio save string shared preference, start activity and load the saved string", 
            "Object storage for a web application", 
            "Quick question about storage on android",
        ];
        cy.get(".postTitle").each(($el, index, $list) => {
            cy.wrap($el).should("contain", qTitles[index]);
        });
    });

    it("given a user is logged in, when the user navigates to a question and saves it, then it should display on the saved questions page", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        cy.contains("Programmatically navigate using React router").click();
        cy.get(".bookmark_button").click();

        cy.wait(1000);

        cy.contains("Saved").click();

        cy.wait(1000);

        cy.contains("Programmatically navigate using React router");
    });

    it("given a user is logged in, when the user navigates to the saved question page and removes a save from a question, then the question should not be displayed on the saved questions page", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        cy.contains("Saved").click();
        cy.contains("Quick question about storage on android").click();
        cy.get(".bookmark_button").click();

        cy.contains("Saved").click();
        cy.wait(1000);
        cy.contains("Quick question about storage on android").should(
            "not.exist"
        );
        cy.contains("android studio save string shared preference, start activity and load the saved string");
        cy.contains("Object storage for a web application");
    });

    it("given a user is logged in, when the user navigates to an answer page and removes a save from a question, then the updated list of saved questions should be displayed", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        cy.contains("Quick question about storage on android").click();
        cy.get(".bookmark_button").click();

        cy.contains("Saved").click();
        cy.wait(1000);
        cy.contains("Quick question about storage on android").should(
            "not.exist"
        );
        cy.contains("android studio save string shared preference, start activity and load the saved string");
        cy.contains("Object storage for a web application");
    });

    it("given a user is logged in, when the user removes all saved questions, then the updated list of saved questions should be displayed (none)", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        // Remove all saves
        cy.contains("Quick question about storage on android").click();
        cy.get(".bookmark_button").click();
        cy.contains("Questions").click();
        cy.contains("Object storage for a web application").click();
        cy.get(".bookmark_button").click();
        cy.contains("Questions").click();
        cy.contains("android studio save string shared preference, start activity and load the saved string").click();
        cy.get(".bookmark_button").click();

        // Navigate to saved questions page
        cy.contains("Saved").click();

        cy.wait(1000);
        
        cy.contains("No saved questions found.");
        cy.contains("Quick question about storage on android").should(
            "not.exist"
        );
        cy.contains("Object storage for a web application").should(
            "not.exist"
        );
        cy.contains("android studio save string shared preference, start activity and load the saved string").should(
            "not.exist"
        );
    });

    it("given a user is not logged in, when the user navigates to a question and attempts to save it, then an alert should be displayed", () => {
        cy.visit("http://localhost:3000");
        cy.contains("Quick question about storage on android").click();
        cy.get(".bookmark_button").click();
        cy.on("window:alert", (alertText) => {
            expect(alertText).to.equal("Please log in to bookmark questions.");
        });
        cy.wait(1000);
    });
});