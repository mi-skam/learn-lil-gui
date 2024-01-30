import GUI from 'lil-gui';
import Webcam from './webcam';
import './style.css';

document.querySelector('body').innerHTML = `
    <div id="app">
      <p>Webcam demonstration</p>
      <button id="switchButton">Next Webcam</button>
      <video autoplay playsinline id="webcam"></video>
    </div>
`;
// init Webcam instance
const webcam = new Webcam();
await webcam.init();

const switchButton = document.querySelector('#switchButton');

switchButton.disabled = !(webcam.allWebcams.length > 1);
switchButton.addEventListener('click', webcam.nextWebcam);

// gui
const gui = new GUI();
console.log(webcam.allWebcams);
gui.add(
  webcam,
  'currentWebcam',
  webcam.allWebcams.map(cam => cam.label),
);
