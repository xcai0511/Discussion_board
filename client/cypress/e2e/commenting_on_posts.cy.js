describe("Commenting on posts e2e tests", () => {
    beforeEach(() => {
        cy.exec("node ../server/init.js");
    });
    
    afterEach(() => {
        cy.exec("node ../server/destroy.js");
    });

    it("given a user who is not logged in, when the user clicks a question and intends to add a new answer, then the user is prompted to login", () => {
        cy.visit("http://localhost:3000");
        cy.contains("Programmatically navigate using React router").click();
        cy.contains("Please log in to add comments");
    });

    it("given a user who is logged in, when the user clicks a question and adds a new answer, then the answer should be displayed on the answer page", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        cy.wait(1000);

        // Navigate to answer page
        cy.contains("Programmatically navigate using React router").click();
        cy.get("#answerTextInput").type("Answer Question A");
        cy.contains("Post Answer").click();

        const answers = [
            "Answer Question A",
            "React Router is mostly a wrapper around the history library. history handles interaction with the browser's window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don't have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.",
            "On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn't change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router.",
        ];

        cy.contains("3 answers");
        cy.get(".answerText").each(($el, index) => {
            cy.contains(answers[index]);
        });
        cy.contains("testuser");
        cy.contains("0 seconds ago");
    });

    it("given a user who is logged in, when the user clicks a questions and intends to add an answer but leaves the text input blank, then the new answer form should display an error", () => {
        cy.visit("http://localhost:3000");

        // Login user
        cy.contains("Login").click();
        cy.get("#loginEmailInput").type("testuser@fakeso.com");
        cy.get("#loginPasswordInput").type("testpassword");
        cy.get(".loginBtn").click();

        cy.wait(1000);

        // Navigate to answer page
        cy.contains("Programmatically navigate using React router").click();
        cy.contains("Post Answer").click();
        cy.contains("Answer text cannot be empty");
    });

    it("given a user who is logged in, when the user clicks a questions and intends to add an answer but inputs an invalid hyperlink, then the new answer form should display an error", () => {
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

        cy.wait(1000);

        // Navigate to answer page
        cy.contains("Programmatically navigate using React router").click();
        invalidUrls.forEach((url) => {
            cy.get("#answerTextInput").clear().type(`This is an invalid link: ${url}`);
            cy.contains("Post Answer").click();
            cy.contains("Invalid hyperlink format");
        });
    });
});