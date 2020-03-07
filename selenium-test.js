const {Builder, By, Key, until} = require('selenium-webdriver');
const visibleTourElementCss = '.shepherd-element:not([hidden])';
const visibleTourElementXPath = '//*[contains(@class, "shepherd-element") and not(@hidden)]';
const tourButtonXPathParts = ['//*[contains(@class, "shepherd-button") and contains(text(), "', '")]'];

async function delayedStop(driver) {
  await driver.sleep(3000);
  driver.quit();
}

async function coreTest() {
  const driver = await new Builder().forBrowser('firefox').build();
  await driver.get('http://localhost:3000/');

  await driver.findElement(By.css('button[aria-label="add ES6 function"]')).click();
  await driver.findElement(By.id('input')).sendKeys('say hi');
  await driver.findElement(By.id('suggestion-button')).click();
  await driver.findElement(By.id('input')).sendKeys(
    Key.ARROW_DOWN, Key.ARROW_DOWN, Key.ARROW_DOWN, 'alert'
  );
  await driver.findElement(By.css('button[aria-label="add round brackets"]')).click();
  await driver.findElement(By.css('button[aria-label="add quotation marks"]')).click();
  await driver.findElement(By.css('#input')).sendKeys('Hi!', Key.ARROW_RIGHT, Key.ARROW_RIGHT, ';');
  await driver.findElement(By.css('#add-idea-button')).click();
  await driver.findElement(By.css('#ideas .react-markdown:nth-of-type(1)')).click(); // .trigger('mouseover')
  await driver.findElement(By.css('.idea-button[title="Delete this idea"]')).click();

  driver.sleep(1000);
  await driver.wait(until.alertIsPresent());
  let alert = await driver.switchTo().alert();
  // let alertText = await alert.getText();
  await alert.accept();

  await driver.findElement(By.css('button[aria-label="add comment"]')).click();
  await driver.findElement(By.css('#input')).sendKeys(Key.ARROW_RIGHT);
  await driver.findElement(By.css('button[aria-label="add square brackets"]')).click();
  await driver.findElement(By.css('button[aria-label="add curly brackets"]')).click();
  await driver.findElement(By.css('button[aria-label="add angular tag brackets"]')).click();
  await driver.findElement(By.css('#add-idea-button')).click();
  await driver.findElement(By.css('#ideas .react-markdown:nth-of-type(1)')).click(); // .trigger('mouseover')
  // click again to collapse input and bring buttons into view:
  await driver.findElement(By.css('#ideas .react-markdown:nth-of-type(1)')).click(); // .trigger('mouseover')
  // just in case, trigger a mouseover:
  await driver.findElement(By.css('#ideas .react-markdown:first-of-type')).then((element) => {
    driver.actions().move({origin: element}).perform();
  });
  await driver.findElement(By.css('.idea-button[title="Reuse this idea in the input area"]')).click();

  delayedStop(driver);
}

async function tourTest() {
  const driver = await new Builder().forBrowser('firefox').build();
  await driver.get('http://localhost:3000/');

  await driver.sleep(3000); // tour button appears after 3 seconds
  await driver.findElement(By.id('tour-button')).click();
  await driver.findElement(By.css(visibleTourElementCss))
    .findElement(By.xpath('//*[contains(text(), "Next")]')).click();
  await driver.findElement(By.xpath(
    visibleTourElementXPath + tourButtonXPathParts[0] + 'Next' + tourButtonXPathParts[1]
  )).click();
  await driver.findElement(By.css('.shepherd-target')).click();
  await driver.findElement(By.css('.shepherd-target')).click();
  await driver.findElement(By.css('#ideas .react-markdown:first-of-type')).then((element) => {
    driver.actions().move({origin: element}).perform();
  });
  await driver.sleep(1000); // just in case
  await driver.findElement(By.xpath(
    '//*[contains(@class, "shepherd-target")]//*[contains(text(), "Reuse")]'
  )).click();
  await driver.findElement(By.xpath(
    visibleTourElementXPath + tourButtonXPathParts[0] + 'Exit tour' + tourButtonXPathParts[1]
  )).click();

  delayedStop(driver);
}

coreTest();
tourTest();
