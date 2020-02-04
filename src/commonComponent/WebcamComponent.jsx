import React from "react";
import Webcam from "react-webcam";

import "../Layout/Scroll.css";

function WebcamComponent({ setImage }) {
  return (
    <>
      <WebcamCapture takePhoto={setImage} />
    </>
  );
}

export default WebcamComponent;

const videoConstraints = {
  width: 450,
  height: 450,
  facingMode: "user"
};

function WebcamCapture({ takePhoto }) {
  const webcamRef = React.useRef(null);

  const convertBase64ToFile = function(image) {
    const byteString = atob(image.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i += 1) {
      ia[i] = byteString.charCodeAt(i);
    }
    const newBlob = new Blob([ab], {
      type: "image/jpeg"
    });
    return newBlob;
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot(); // Base64
    takePhoto(convertBase64ToFile(imageSrc));
  }, [webcamRef]);

  return (
    <>
      <Webcam
        audio={false}
        height={450}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={450}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture} type="button" alignItems="center" padding="15">
        Prendre une photo depuis la Webcam
      </button>
    </>
  );
}
