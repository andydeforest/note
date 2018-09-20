require('dotenv').load();
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3001;
const io = require('socket.io')(process.env.SOCKET_PORT || 8001);
const hash = require('object-hash');
const fs = require('fs');

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static('client/public/index'));
app.use('/music', express.static('music'));
// Add routes, both API and view
app.use(routes);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

var folder_hash = hash(fs.readdirSync('./music/'));

io.on('connection', (client) => {
	setInterval(() => {
		// Every second we check for updates to our folder
		if(hash(fs.readdirSync('./music/')) !== folder_hash) {
			client.emit('update', true);
			folder_hash = hash(fs.readdirSync('./music/'));
		}
	}, 1000);
});