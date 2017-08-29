const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');

const spawn = require("child_process").spawn;
const root = __dirname;

app.use(express.static(__dirname + '/client'))
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.sendFile('/client/index.html', { root });
});

app.post('/addData', (req, res) => {
    const writeStreamLabels = fs.createWriteStream(`${root}/data/labels.txt`, { flags: 'a' });
    const writeStreamReviews = fs.createWriteStream(`${root}/data/reviews.txt`, { flags: 'a' });

    writeStreamLabels.end(`${req.body.label}\n`, 'utf-8');

    writeStreamReviews.end(`${req.body.review}\n`, 'utf-8', () => {
    	const process = spawn('python', ["classificator.py"]);
	    process.stdout.on('data', data => {
	    	console.log(data);
			res.send(data.toString('utf8'))
		});
    });
    
    // return Promise.map(csvData, (data, index) => {
    //     return new Promise((resolve, reject) => {
    //         if (index !== data.length - 1) {
    //             writeStream.write(data, 'utf-8', resolve({ path: csvPath, name: csvName }));
    //         } else {
    //             writeStream.end(data, 'utf-8', resolve({ path: csvPath, name: csvName }));
    //         }

    //         writeStream.on('error', reject);
    //     });
    // }, { concurrency: 10 });

});



app.listen(8080, () => {
	console.log('Use localhost:8080');
});
