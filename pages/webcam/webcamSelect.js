import GUI from 'lil-gui';
import { nextWebcam, getVideoInputs } from './webcam';
import './style.css';

const state = {};

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
  state.allVideoInputs = await getVideoInputs();
  switchButton.disabled = !(state.allVideoInputs.length > 1);

  // switch webcams
  switchButton.addEventListener('click', nextWebcam);

  // enable webcam stream
  const constraints = { video: true };
  navigator.mediaDevices.getUserMedia(constraints).then(stream => {
    video.srcObject = stream;
  });
}

state.webcams = state.allVideoInputs.map(device => device.label);
console.log(state.webcams);

const gui = new GUI();
const webcam = gui.addFolder('Webcam');
webcam.add(state, 'webcams');
