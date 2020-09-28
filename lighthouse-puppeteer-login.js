/**
 * @param {puppeteer.Browser} browser
 * @param {{url: string, options: LHCI.CollectCommand.Options}} context
 */
module.exports = async browser => {
  // launch browser for LHCI
  const page = await browser.newPage();
  await page.goto('https://login.buffer.com/login');
  await page.type('#email', process.env.BUFFER_LUNA_SNEAKERS_EMAIL);
  await page.type('#password', process.env.BUFFER_LUNA_SNEAKERS_PASSWORD);
  const waitForNavigation = page.waitForNavigation();
  await page.click('#login-form-submit');
  await waitForNavigation;
  await page.close();
};
