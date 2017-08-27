const express = require('express');
const app = express();

const spawn = require("child_process").spawn;
const process = spawn('python', ["classificator.py"]);

app.get('/', (req, res) => {
	res.sendFile('/client/index.html', { root: __dirname });
});

process.stdout.on('data', data => {
	console.log(data.toString('utf8'));
});
// console.log('YEP')

app.listen(8080, () => {
	console.log('Use localhost:8080');
});