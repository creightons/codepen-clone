const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const uuidV4 = require('uuid/v4');

function getFilePath(relativePath) {
    return path.resolve(__dirname, relativePath);
}


const server = express();

server.use((req, res, next) => {
    const url = `${req.method} ${req.url}`;
    console.log(url);
    next();
});

server.use(bodyParser.json());

server.get('/', (req, res) => res.sendFile(getFilePath('./index.html')));
server.get('/iframe-1', (req, res) => res.sendFile(getFilePath('./iframe-1.html')));
server.get('/iframe-2', (req, res) => res.sendFile(getFilePath('./iframe-2.html')));

server.post('/make-file', (req, res) => {
    const { htmlBody } = req.body;

    const newFile = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset='utf-8'>
            </head>
            <body>
                ${htmlBody}
            </body>
        </html>
    `;

    const filename = `${uuidV4()}.html`;
    const filepath = getFilePath(`./new_files/${filename}`);

    fs.writeFile(filepath, newFile, (err) => {
        if (err) throw err;
        return res.status(200).send({ filename });
    });
});

server.listen(3000, () => console.log('live on port 3000'));
