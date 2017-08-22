const express = require('express');
const path = require('path');

function getFilePath(relativePath) {
    return path.resolve(__dirname, relativePath);
}


const server = express();

server.use((req, res, next) => {
    const url = `${req.method} ${req.url}`;
    console.log(url);
    next();
});

server.get('/', (req, res) => res.sendFile(getFilePath('./index.html')));
server.get('/iframe-1', (req, res) => res.sendFile(getFilePath('./iframe-1.html')));
server.get('/iframe-2', (req, res) => res.sendFile(getFilePath('./iframe-2.html')));

server.listen(3000, () => console.log('live on port 3000'));
