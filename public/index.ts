import * as faceapi from 'face-api.js';

async function run() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
    const video = document.getElementsByTagName('video')[0];
    video.srcObject = stream;

    await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('../models'),
        faceapi.nets.faceLandmark68TinyNet.loadFromUri('../models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('../models'),
        faceapi.nets.faceExpressionNet.loadFromUri('../models'),
        faceapi.nets.ageGenderNet.loadFromUri('../models'),
        faceapi.nets.ssdMobilenetv1.loadFromUri('../models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('../models'),
    ]).catch(console.error);

    let out = faceapi.createCanvas({ width: 640, height: 480 });
    document.body.appendChild(out);

    setInterval(async () => {
        const det = await faceapi
            .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks();
        const resized = faceapi.resizeResults(det, { width: 640, height: 480 });
        const context = out.getContext('2d');
        context?.clearRect(0, 0, 640, 480);

        faceapi.draw.drawFaceLandmarks(out, resized!);
        console.log(resized);
    }, 100);

    console.log('detecting faces');
}

const baseUrl = 'https://192.168.0.109:3001';

const runClient = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
    const response = await fetch(`${baseUrl}/register`);
    const { userId } = await response.json();
    if (!response.ok) {
        alert('Cannot start face tracking');
    } else {
        const text = document.createTextNode(`${userId}`);
        document.body.appendChild(text);
    }
    const video = document.getElementsByTagName('video')[0];
    video.srcObject = stream;

    await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('../models'),
        faceapi.nets.faceLandmark68TinyNet.loadFromUri('../models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('../models'),
        faceapi.nets.faceExpressionNet.loadFromUri('../models'),
        faceapi.nets.ageGenderNet.loadFromUri('../models'),
        faceapi.nets.ssdMobilenetv1.loadFromUri('../models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('../models'),
    ]).catch(console.error);

    setInterval(async () => {
        //   const det = await faceapi
        //       .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
        //       .withFaceLandmarks();
        //   const resized = faceapi.resizeResults(det, { width: 640, height: 480 });
        await fetch(`${baseUrl}/detections`, {
            method: 'POST',
            body: JSON.stringify({ userId }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('sent');
    }, 1000);
};

// run()

runClient();
