describe("Core functionality", () => {
  beforeEach(() => {
    // run before each test (before each "it(...)")
    cy.visit("/");
  });

  it("can use all the code convenience buttons, delete an idea, and reuse an idea", () => {
    cy.get('button[aria-label="add ES6 function"]')
      .click()
      .get("#input")
      .type("say hi")
      .get("#suggestion-button")
      .click()
      .get("#input")
      .type("{downarrow}alert")
      .get('button[aria-label="add round brackets"]')
      .click()
      .get('button[aria-label="add quotation marks"]')
      .click()
      .get("#input")
      .type("Hi!{rightarrow}{rightarrow};")
      .get("#add-idea-button")
      .click()
      .get(".horizontal-row")
      .trigger("mouseover")
      .get('.idea-button[title="Delete this idea"]')
      .click()
      .get('button[aria-label="add comment"]')
      .click()
      .get("#input")
      .type("{rightarrow}")
      .get('button[aria-label="add square brackets"]')
      .click()
      .get('button[aria-label="add curly brackets"]')
      .click()
      .get('button[aria-label="add angular tag brackets"]')
      .click()
      .get("#add-idea-button")
      .click()
      .get(".horizontal-row")
      .trigger("mouseover")
      .get('.idea-button[title="Reuse this idea in the input area"]')
      .click();
  });
});
