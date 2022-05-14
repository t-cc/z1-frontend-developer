import React, { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { CameraPreview } from "../../components/CameraPreview";
import { useCamera } from "../../hooks/useCamera";
import {
  getAverageRGBfromImage,
  isValidIdCardAverageColor,
} from "../../utils/color";
import {
  showTakePictureState,
  blobPhotoState,
  postResponseOkState,
  colorIsValidatedState,
} from "../../state";
import { sendImage } from "../../services/sendImage";
import {
  ID_CAPTURE_HEIGHT,
  ID_CAPTURE_WIDTH,
  ID_HEIGHT_RATIO,
} from "../../constants/id";

const CAPTURE_OPTIONS = {
  audio: false,
  video: { facingMode: "environment" },
};

export const TakePicture = () => {
  // Wee need this variable because the colorIsValidated only updates every render cycle
  let processEnd = false;
  const [, setShowTakePicture] = useRecoilState(showTakePictureState);
  const [, setBlobPhoto] = useRecoilState(blobPhotoState);
  const [, setPostResponseOk] = useRecoilState(postResponseOkState);
  const [colorIsValidated, setColorIsValidated] = useRecoilState(
    colorIsValidatedState
  );
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mediaStream = useCamera(CAPTURE_OPTIONS);

  function handleCanPlay() {
    videoRef.current?.play();
  }

  const handleSubmit = async (imageData: string) => {
    const response = await sendImage(imageData);
    setPostResponseOk(response);
    setShowTakePicture(false);
  };

  useEffect(() => {
    setBlobPhoto("");
    setColorIsValidated(false);
  }, []);

  useEffect(() => {
    if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream, videoRef.current]);

  useEffect(() => {
    const displayAndCheckImage = async () => {
      if (canvasRef.current && videoRef.current) {
        await videoRef.current.play();
        const context = canvasRef.current.getContext("2d");
        const cutStartX = ~~videoRef.current.videoWidth * 0.1;
        const cutWidth = ~~videoRef.current.videoWidth * 0.8;
        const cutHeight = ~~cutWidth * ID_HEIGHT_RATIO;
        const cutStartY = ~~videoRef.current.videoHeight / 2 - cutHeight / 2;
        context?.drawImage(
          videoRef.current,
          cutStartX,
          cutStartY,
          cutWidth,
          cutHeight,
          0,
          0,
          ID_CAPTURE_WIDTH,
          ID_CAPTURE_HEIGHT
        );
        const data = context?.getImageData(
          0,
          0,
          ID_CAPTURE_WIDTH,
          ID_CAPTURE_HEIGHT
        );
        const [r, g, b] = getAverageRGBfromImage(data);
        if (isValidIdCardAverageColor(r, g, b)) {
          const imageData = canvasRef.current.toDataURL();
          setBlobPhoto(imageData);
          handleSubmit(imageData);
          setColorIsValidated(true);
          clearInterval(timmer);
          processEnd = true;
        }
      }
    };

    const captureAndProcessImage = async () => {
      if (videoRef.current?.srcObject && !processEnd) {
        await displayAndCheckImage();
      }
    };

    captureAndProcessImage();
    const timmer = setInterval(captureAndProcessImage, 300);

    return () => {
      clearInterval(timmer);
    };
  }, [videoRef.current?.srcObject]);

  return (
    <>
      <CameraPreview
        videoRef={videoRef}
        canvasRef={canvasRef}
        colorIsValidated={colorIsValidated}
        handleCanPlay={handleCanPlay}
        handleClickCancelPicture={() => {
          setShowTakePicture(false);
        }}
      />
    </>
  );
};
