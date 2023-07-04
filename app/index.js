// Import puppeteer library
const puppeteer = require('puppeteer');

// Async function to run Puppeteer. This function launches a new Puppeteer 
// browser, navigates to a URL, takes a screenshot, and then closes the browser.
async function runPuppeteer() {
  // Launch a new browser instance with specified arguments
  // '--no-sandbox' and '--disable-setuid-sandbox' are needed when running Chrome in a Docker container
  // '--disable-gpu' is used to disable hardware acceleration (it can cause issues in some scenarios, especially on servers)
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu'
    ],
    headless: 'new' // Enable new Headless mode
  });

  // Create a new page (tab) in the browser
  const page = await browser.newPage();

  // Navigate to the specified URL
  await page.goto('https://example.com');

  // Take a screenshot of the page and save it to a file named 'example.png'
  await page.screenshot({ path: 'example.png' });

  // Evaluate a script in the context of the page
  // This script creates an array of href attributes from all 'a' (link) elements on the page
  const links = await page.evaluate(() =>
    Array.from(document.querySelectorAll('a'), (e) => e.href)
  );

  // Log the array of links to the console
  console.log(links);

  // Close the browser
  await browser.close();
}

// Make the runPuppeteer function accessible from other JavaScript files
module.exports = runPuppeteer;
