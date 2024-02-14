import GUI from 'lil-gui';
import { Webcam } from '@new-objects/libs';
import './style.css';

document.querySelector('body').innerHTML = `
    <div id="app">
      <p>Webcam demonstration</p>
      <video autoplay playsinline id="webcam"></video>
    </div>
`;
// init Webcam instance
const webcam = await Webcam.initialize();

// gui
const gui = new GUI();
const config = {
  current: webcam.settings.label,
  all: webcam.allWebcams.map(cam => cam.label),
};

gui
  .add(config, 'current', config.all)
  .name('Webcam')
  .onChange(value => webcam.setWebcamByLabel(value));
