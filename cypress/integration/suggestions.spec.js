function testSuggestionInputOutput(input, output) {
  cy.get('#input')
    .clear() // very important!
    .type(input)
    .get('#suggestion-button')
    .click()
    .get('#input')
    .should('have.value', output)
}

function testGetNoSuggestion(input) {
  cy.get('#input')
    .clear() // very important!
    .type(input)
    .get('#suggestion-button')
    .should('have.value', '')
}

describe('Suggestions appear and replace correctly', () => {
  beforeEach(() => { // run before each test (before each "it(...)")
    // cy.window().its('Cypress').should('be.an', 'object')
    cy.visit('/');
  });

  it('does not suggest anything on blank input', () => {
    cy.get('#suggestion-button')
      .should('have.value', '')
  });

  it('works on the simplest case', () => {
    testSuggestionInputOutput('a b', 'aB')
  });

  it('works on the simplest case - with spaces', () => {
    testSuggestionInputOutput('a b ', 'aB ')
    testSuggestionInputOutput(' a b', ' aB')
    testSuggestionInputOutput('    a b    ', '    aB    ')
  });

  it('works on longer words', () => {
    testSuggestionInputOutput('a bcd', 'aBcd')
    testSuggestionInputOutput('abcd e', 'abcdE')
    testSuggestionInputOutput('abc def', 'abcDef')
  });

  it('only contatenates the last two words', () => {
    testSuggestionInputOutput('a b c', 'a bC')
    testSuggestionInputOutput('a b c d', 'a b cD')
  });

  it('works when there is a new line', () => {
    testSuggestionInputOutput('a b\n', 'aB\n')
    testSuggestionInputOutput('\na b\n', '\naB\n')
    testSuggestionInputOutput('\na b', '\naB')
    testSuggestionInputOutput('a b\nc', 'aB\nc')
    testSuggestionInputOutput('a b\nc d', 'a b\ncD')
    testSuggestionInputOutput('a b\nc d\ne f', 'a b\nc d\neF')
    testSuggestionInputOutput('a b\n\nc d', 'a b\n\ncD')
    testSuggestionInputOutput('a b\n\nc d\ne f', 'a b\n\nc d\neF')
  });

  it('works when there is a comment', () => {
    testGetNoSuggestion('//a')
    testGetNoSuggestion(' //a')
    testGetNoSuggestion('//a ')
    testGetNoSuggestion(' //a ')
    testGetNoSuggestion('// a')
    testGetNoSuggestion(' // a')
    testGetNoSuggestion(' // a ')
    testGetNoSuggestion('// a b')
    testGetNoSuggestion('// a b ')
    testGetNoSuggestion('//a\n')
    testSuggestionInputOutput('//a\nc d', '//a\ncD')
    testSuggestionInputOutput('//a b\nc d', '//a b\ncD')
    testSuggestionInputOutput('// a b\nc d', '// a b\ncD')
    testSuggestionInputOutput('// a b\n\nc d', '// a b\n\ncD')
    testSuggestionInputOutput('// a b\n \nc d', '// a b\n \ncD')
    testSuggestionInputOutput('// a b \n \nc d', '// a b \n \ncD')
    testSuggestionInputOutput('// a b \n \nc d \n \n e f ', '// a b \n \nc d \n \n eF ')
    testGetNoSuggestion('// some comment', '// some comment')
    testSuggestionInputOutput('// some comment\nsome code', '// some comment\nsomeCode')
  });
});
