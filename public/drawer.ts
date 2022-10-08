import * as faceapi from 'face-api.js';
// import { baseUrl } from '.';

export const baseUrl = 'https://localhost:3001';

const out = faceapi.createCanvas({ width: 640, height: 480 });
document.body.appendChild(out);

setInterval(async () => {
    const response = await fetch(`${baseUrl}/landmarks`, {
    })
    const body: faceapi.WithFaceLandmarks<{
        detection: faceapi.FaceDetection;
    }, faceapi.FaceLandmarks68>[] = await response.json()
    // console.log(body)

    const context = out.getContext('2d');
    context?.clearRect(0, 0, 640, 480);


    // const det = await faceapi
    //         .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
    //         .withFaceLandmarks();
    //     const resized = faceapi.resizeResults(det, { width: 640, height: 480 });
    //     const context = out.getContext('2d');
    //     context?.clearRect(0, 0, 640, 480);

    //     faceapi.draw.drawFaceLandmarks(out, resized!);
    //     console.log(resized);

    for (const iterator of body) {
        if ((iterator as any).detection) {
            // const resized = faceapi.resizeResults(iterator, { width: 640, height: 480 });
            // console.log(resized)
            faceapi.draw.drawFaceLandmarks(out, iterator.landmarks);
        }
    }
}, 5000)