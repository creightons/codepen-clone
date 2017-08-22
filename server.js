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
server.get('/iframed-page', (req, res) => res.sendFile(getFilePath('./iframed-page.html')));

server.listen(3000, () => console.log('live on port 3000'));
