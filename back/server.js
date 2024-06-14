const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.static('files'));

app.get('/get', (req, res) => {
    fs.readFile('./files/todo.json', (err, data) => {
        if (err) {
            throw err;
        }

        if (data) {
            res.send(data.toString());
        } else {
            res.send('[]');
        }
    });
});

app.get('/add', (req, res) => {
    fs.readFile('./files/todo.json', (err, data) => {
        if (err) {
            throw err;
        }

        let content = '[]';
        if (data) {
            let str = data.toString();
            let json = JSON.parse(str);

            json.push(req.query.text || '-empty-');

            content = JSON.stringify(json);
        }

        fs.writeFile('./files/todo.json', content, (err) => {
            if (err) {
                throw err;
            }

            res.status(200).send('OK');
        })
    });
});

app.get('/count', (req, res) => {
    fs.readFile('./files/todo.json', (err, data) => {
        if (err) {
            throw err;
        }

        if (data) {
            res.send(JSON.parse(data.toString()).length.toString());
        } else {
            res.send('0');
        }
    });
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});