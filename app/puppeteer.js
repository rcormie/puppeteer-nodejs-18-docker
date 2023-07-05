// puppeteer.js

// Import puppeteer library
const { launchBrowser } = require('./utils');

async function testFunction() {
  // Get the existing Puppeteer browser instance
  const browser = await launchBrowser();

  // Check if the browser is initialized
  if (!browser) {
    console.error('Puppeteer browser is not initialized. Run the --run command first.');
    process.exit(1); // Exit with error status code
  }

  // Create a new page (tab) in the browser
  const page = await browser.newPage();

  // Navigate to the specified URL
  await page.goto('https://example.com');

  // Take a screenshot of the page and save it to a file named 'example.png'
  await page.screenshot({ path: 'example.png' });

  // Evaluate a script in the context of the page
  // This script creates an array of href attributes from all 'a' (link) elements on the page
  const links = await page.evaluate(() =>
    Array.from(document.querySelectorAll('a'), a => a.href)
  );

  // Log the array of links to the console
  console.log(links);

  // Close the page (tab)
  await page.close();

  console.log('Test was successful.');
}

// Extract URLs function
// Usage: selectors will need to be provided in pairs: one to select the 'container' (a logical grouping of elements, like a job posting),
// and another to select an element within that container. For your job site example, the first selector could be ".post", and 
// subsequent selectors would select elements within each posting, like ".sort-by-workplace", ".sort-by-location", etc.
//
// Example: node puppeteer.js --extracturls "https://robincormie.dev" "h1" "a"
async function extractURLs(url, containerSelector, ...elementSelectors) {
  const browser = await launchBrowser();
  if (!browser) {
    console.error('Puppeteer browser is not initialized. Run the --run command first.');
    process.exit(1);
  }

  const page = await browser.newPage();
  console.log(`Navigating to ${url}`);
  await page.goto(url);
  console.log('Page loaded');

  const data = await page.evaluate((containerSelector, elementSelectors) => {
    const containers = Array.from(document.querySelectorAll(containerSelector));
    const results = containers.map(container => {
      const item = {};

      // Get the href first
      const anchorElement = container.querySelector('a[href]');
      if (anchorElement) {
        item['href'] = anchorElement.href;
      }

      // Then get the remaining elements
      elementSelectors.forEach(selector => {
        const element = container.querySelector(selector);
        if (element) {
          const text = element.textContent.trim();
          item[selector] = { text };
        }
      });

      return item;
    });

    return results;
  }, containerSelector, elementSelectors);

  console.log(`Extracted ${data.length} items:`);
  console.log(data);

  await page.close();
  return data;
}

// Mapping of command-line arguments to functions
const commandMappings = {
  '--test': testFunction,
  '--extracturls': extractURLs
};

// Function to handle command-line arguments
function handleCommandLineArgs() {
  const args = process.argv.slice(2); // Exclude the first two arguments (node and script name)

  // The command is the first argument
  const command = args[0];

  // The URL is the second argument
  const url = decodeURIComponent(args[1]); // Decode the URL

  // The CSS selectors are the rest of the arguments
  const selectors = args.slice(2);

  // Check if the argument is a valid command
  if (commandMappings[command]) {
    const func = commandMappings[command];

    // Call the associated function with the URL and selectors as arguments
    func(url, ...selectors)
      .then((result) => {
        // If the function returns a result, log it to the console
        if (result) {
          //console.log(result); // remove this line to avoid duplicate logging
        }

        // console.log(`${func.name} executed successfully.`);
        process.exit(0); // Exit with success status code
      })
      .catch((error) => {
        console.error(`Error executing ${func.name}:`, error);
        process.exit(1); // Exit with error status code
      });
  }
}



// Handle command-line arguments
handleCommandLineArgs();