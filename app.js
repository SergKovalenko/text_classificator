const express = require('express');
const app = express();

const spawn = require("child_process").spawn;
const process = spawn('python', ["classificator.py"]);

app.use(express.static(__dirname + '/client'))

app.get('/', (req, res) => {
	res.sendFile('/client/index.html', { root: __dirname });
});

app.post('/addData', (req, res) => {
    const writeStream = fs.createWriteStream(csvPath, { flags: 'a' });

    return Promise.map(csvData, (data, index) => {
        return new Promise((resolve, reject) => {
            if (index !== data.length - 1) {
                writeStream.write(data, 'utf-8', resolve({ path: csvPath, name: csvName }));
            } else {
                writeStream.end(data, 'utf-8', resolve({ path: csvPath, name: csvName }));
            }

            writeStream.on('error', reject);
        });
    }, { concurrency: 10 });
});

process.stdout.on('data', data => {
	console.log(data.toString('utf8'));
});

app.listen(8080, () => {
	console.log('Use localhost:8080');
});