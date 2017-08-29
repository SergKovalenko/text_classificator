"use strict";

const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const spawn = require("child_process").spawn;

const root = __dirname;
const app = express();

app.use(express.static(__dirname + '/client'))
app.use(bodyParser.json());


function writeData(type, data, callback) {
	const writeStream = fs.createWriteStream(`${root}/data/${type}s.txt`, { flags: 'a' });

	writeStream.end(`${data}\n`, 'utf-8', callback);
}

// routing
app.get('/', (req, res) => {
	res.sendFile('/client/index.html', { root });
});

app.post('/addData', (req, res) => {
	writeData('label', req.body.label, 
		writeData('review', req.body.review, () => {
	    	const process = spawn('python', ["classificator.py"]);
		    process.stdout.on('data', data => {
				res.send(data.toString('utf8'))
			});
		})
	);
});


app.listen(8080, () => {
	console.log('Use localhost:8080');
});
