const express = require('express');
const fs = require('fs');
const https = require('https');
const cors = require('cors');

const app = express();
const port = 3001;

const key = fs.readFileSync('localhost-key.pem', 'utf-8');
const cert = fs.readFileSync('localhost.pem', 'utf-8');

app.use('/', express.static('public'));
app.use('/models/', express.static('models'));
app.use(cors());
app.use(express.json())

// app.use('/detections', (req, res) => {});

const map = {};

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

app.post('/detections', (req, res) => {
    console.log('yo');
    const { userId } = req.query;
    console.log(userId);
    res.send('ok');
});

// app.use('/detections', (req, res) => {
//     console.log('yo');
//     const { userId } = req.query;
//     console.log(userId);
// });

https.createServer({ key, cert }, app).listen(port);

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
// });
