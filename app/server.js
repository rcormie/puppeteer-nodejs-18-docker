// server.js

// Import the built-in http module from Node.js. This module allows you to 
// create a web server that can listen for HTTP requests.
const http = require('http');

// Import the function launchBrowser from puppeteerUtils.js. This function 
// will launch a new Puppeteer browser in the background.
const { launchBrowser } = require('./utils');

// Create a new HTTP server. The function passed to createServer is called 
// every time a client makes a request to the server. The req argument 
// represents the request from the client, while the res argument is used to 
// send a response back to the client.
http.createServer((req, res) => {
  // Write a response body that the server has been initialized
  res.write('Node.js server initialized.');
  
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

// Launch the Puppeteer browser in the background. If there's an error while launching the browser, 
// catch it and log it to the console.
launchBrowser().catch(console.error);
