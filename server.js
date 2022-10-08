const express = require('express');
const fs = require('fs');
const https = require('https');
const cors = require('cors');

const app = express();
const port = 3001;

const key = fs.readFileSync('localhost-key.pem', 'utf-8');
const cert = fs.readFileSync('localhost.pem', 'utf-8');

app.use('/', express.static('public'));
app.use('/drawer', express.static('public/drawer.html'));
app.use('/models/', express.static('models'));
app.use(cors());
app.use(express.json());

let map = {};

app.use('/register', (req, res) => {
    const userId = parseInt(Math.random() * 1000000, 10);
    map[userId] = {};
    res.json({ userId });
});

app.use('/unregister', (req, res) => {
    const userId = req.query.userId;
    delete map[userId];
    res.json({ userId });
});

app.use('/clear', (req, res) => {
    map = {};
    res.send('ok');
});

app.post('/detections', (req, res) => {
    const { userId, yo } = req.body;
    map[userId] = yo;
    res.send('ok');
});

app.get('/landmarks', (req, res) => {
    res.json(map);
});

https.createServer({ key, cert }, app).listen(port);
