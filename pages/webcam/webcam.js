const nextWebcam = async () => {
  const webcamEl = document.querySelector('#webcam');
  const allVideoInputs = await getAllWebcams();
  let nextDevice;

  if (webcamEl.srcObject) {
    const currentDeviceId = webcamEl.srcObject
      .getVideoTracks()[0]
      .getSettings().deviceId;
    nextDevice = allVideoInputs.find(
      videoInput => videoInput.deviceId !== currentDeviceId,
    );
  }

  if (nextDevice) {
    setWebcam(nextDevice);
  }
};

const setWebcam = device => {
  const webcamEl = document.querySelector('#webcam');
  const constraints = { video: { deviceId: device.deviceId } };

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (stream) {
      webcamEl.srcObject = stream;
    })
    .catch(function (error) {
      console.error('Error switching camera:', error);
    });
};

const setWebcamByLabel = async webcamLabel => {
  // get all webcams
  const detectedWebcams = await getAllWebcams();
  // get webcam by label
  const webcam = detectedWebcams.reduce((acc, cam) => {
    acc = cam.find(cam => cam.label === webcamLabel);
    return acc;
  }, '');
  if (webcam) {
    setWebcam(webcam);
  }
};

const getAllWebcams = async () => {
  return navigator.mediaDevices
    .enumerateDevices()
    .then(function (devices) {
      const videoDevices = devices.filter(
        device => device.kind === 'videoinput',
      );
      return videoDevices;
    })
    .catch(function (error) {
      console.error('Error enumerating devices:', error);
    });
};

export { nextWebcam, getAllWebcams, setWebcam, setWebcamByLabel };
