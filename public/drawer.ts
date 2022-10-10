import * as faceapi from 'face-api.js';
import { FaceLandmarks, Point } from 'face-api.js';
// import { baseUrl } from '.';

// export const baseUrl = 'https://localhost:3001';
// const baseUrl = 'https://192.168.0.109:3001';
const baseUrl = 'https://face-api-demo.vercel.app';

const out = faceapi.createCanvas({ width: 640, height: 480 });
document.body.appendChild(out);

setInterval(async () => {
    const response = await fetch(`${baseUrl}/landmarks`, {});
    const body: faceapi.WithFaceLandmarks<
        {
            detection: faceapi.FaceDetection;
        },
        faceapi.FaceLandmarks68
    >[] = await response.json();

    const context = out.getContext('2d');
    context?.clearRect(0, 0, 640, 480);

    for (const iterator of Object.values(body)) {
        if (iterator && (iterator as any).detection) {
            const resized = faceapi.resizeResults(iterator, {
                width: 640,
                height: 480,
            });

            const mappedPoints = [
                ...(resized.landmarks as any)._positions.map(
                    (position) => new Point(position._x, position._y)
                ),
            ];
            const thingey = new FaceLandmarks(
                mappedPoints,
                {
                    width: 640,
                    height: 480,
                },
                new Point(
                    (resized.landmarks as any)._shift._x,
                    (resized.landmarks as any)._shift._y
                )
            );
            // muchos dirtos
            (thingey as any)._positions = mappedPoints;
            faceapi.draw.drawFaceLandmarks(out, thingey);
        }
    }
}, 100);
