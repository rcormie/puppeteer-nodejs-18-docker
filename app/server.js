// Import the built-in http module from Node.js. This module allows you to 
// create a web server that can listen for HTTP requests.
const http = require('http');

// Import the function runPuppeteer from index.js. This function 
// will launch a new Puppeteer browser, navigate to a URL, take a screenshot, 
// and then close the browser.
const runPuppeteer = require('./index');

// Create a new HTTP server. The function passed to createServer is called 
// every time a client makes a request to the server. The req argument 
// represents the request from the client, while the res argument is used to 
// send a response back to the client.
http.createServer((req, res) => {
  // Write a response body of 'Hello, world!'
  res.write('Hello, world!');
  
  // End the response. If you don't call res.end(), the client will keep 
  // waiting for the rest of the response.
  res.end();
})
// Start the server and make it listen for connections on port 8080. The 
// function passed to listen is called once the server is ready to accept 
// connections.
.listen(8080, () => {
  console.log('Server started at http://localhost:8080');
});

// Run the Puppeteer script. If there's an error while running the script, 
// catch it and log it to the console.
runPuppeteer().catch(console.error);
