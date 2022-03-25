const express = require('express');
const path = require('path');

const app = express();

// Start in container or on its own
const port = process.env.EXTERNAL_PORT || 8080;
let host = '0.0.0.0';
if (!process.env.EXTERNAL_PORT) {
    host = "localhost";
}

// Expose the public folder for the page
app.use(express.static(__dirname + '/public'));

// Use index.html as the first page
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// Start
app.listen(port, host);
console.log('Server started at http://localhost:' + port);