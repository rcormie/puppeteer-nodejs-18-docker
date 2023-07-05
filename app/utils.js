// utils.js

const puppeteer = require('puppeteer');

// Create a global browser variable so puppeteer can run in the background and be accessed by other scripts (ie - puppeteer.js)
let browser;

async function launchBrowser() {
  if (!browser) {
    browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-gpu'
      ],
      headless: 'new' // Enable new Headless mode
    });
  }

  return browser;
}

module.exports = {
  launchBrowser
};
