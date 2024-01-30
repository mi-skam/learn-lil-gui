import GUI from 'lil-gui';
import { nextWebcam, getVideoInputs } from './webcam';
import './style.css';

let allWebcams;

document.querySelector('#app').innerHTML = `
<p> Webcam demonstration </p>
<button id="switchButton">Next Webcam</button>
<video autoplay playsinline id="webcam"></video>
`;

const video = document.querySelector('#webcam');
const switchButton = document.querySelector('#switchButton');

const hasGetUserMedia = () => !!navigator.mediaDevices?.getUserMedia;

if (hasGetUserMedia()) {
  // enable button, if webcams are detected
  allWebcams = await getVideoInputs();
  switchButton.disabled = !(allWebcams.length > 1);

  // switch webcams
  switchButton.addEventListener('click', nextWebcam);

  // enable webcam stream
  const constraints = { video: true };
  navigator.mediaDevices.getUserMedia(constraints).then(stream => {
    video.srcObject = stream;
  });
}

const gui = new GUI();
gui.add(
  window,
  'webcams',
  allWebcams.map(device => device.label),
);
