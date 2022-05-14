import React, { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { CameraPreview } from "../../components/CameraPreview";
import { useCamera } from "../../hooks/useCamera";
import { displayAndCheckImage } from "../../utils/display";
import {
  showTakePictureState,
  blobPhotoState,
  postResponseOkState,
  colorIsValidatedState,
} from "../../state";
import { sendImage } from "../../services/sendImage";

const CAPTURE_OPTIONS = {
  audio: false,
  video: { facingMode: "environment" },
};

export const TakePicture = () => {
  // Wee need this 2 variables because the colorIsValidated only updates every render cycle
  const [, setShowTakePicture] = useRecoilState(showTakePictureState);
  const [, setPostResponseOk] = useRecoilState(postResponseOkState);
  const [blobPhoto, setBlobPhoto] = useRecoilState(blobPhotoState);
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
    setColorIsValidated(false);
  };

  useEffect(() => {
    setBlobPhoto("");
  }, []);

  useEffect(() => {
    if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream, videoRef.current]);

  useEffect(() => {
    if (colorIsValidated && blobPhoto !== "") {
      handleSubmit(blobPhoto);
    }
  }, [colorIsValidated]);

  useEffect(() => {
    const delay = () => new Promise((res) => setTimeout(res, 100));

    async function startCapture() {
      let reading = true;
      while (reading) {
        const imageData = await displayAndCheckImage(videoRef, canvasRef);
        if (imageData) {
          setBlobPhoto(imageData);
          setColorIsValidated(true);
          reading = false;
        } else {
          await delay();
        }
      }
    }

    if (videoRef.current?.srcObject) {
      startCapture();
    }
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
