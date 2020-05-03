describe("Onboarding tour", () => {
  beforeEach(() => {
    // run before each test (before each "it(...)")
    cy.visit("/");
  });

  it("completes", () => {
    cy.get("#tour-button").click();
    cy.get("button:visible").contains("Next").click();
    cy.get("button:visible")
      .contains("Next")
      .click()
      .get(".shepherd-target")
      .click()
      .get(".shepherd-target")
      .click();
    cy.get(".horizontal-row")
      .trigger("mouseover")
      .get("button")
      .contains("Reuse")
      .click();
    cy.get("button:visible").contains("Exit tour").click();
  });
});
