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
  const [, setPostResponseOk] = useRecoilState(postResponseOkState);
  const [blobPhoto, setBlobPhoto] = useRecoilState(blobPhotoState);
  const [, setShowTakePicture] = useRecoilState(showTakePictureState);
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

  const handleClickCancel = () => {
    setShowTakePicture(false);
    setColorIsValidated(false);
  };

  useEffect(() => {
    if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream]);

  useEffect(() => {
    if (colorIsValidated && blobPhoto !== "") {
      handleSubmit(blobPhoto);
    }
  }, [colorIsValidated]);

  useEffect(() => {
    const delay = () => new Promise((res) => setTimeout(res, 100));

    let reading = true;
    async function startCapture() {
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

    return () => {
      reading = false;
    };
  }, [JSON.stringify(videoRef.current?.srcObject)]);

  return (
    <>
      <CameraPreview
        videoRef={videoRef}
        canvasRef={canvasRef}
        colorIsValidated={colorIsValidated}
        handleCanPlay={handleCanPlay}
        handleClickCancelPicture={handleClickCancel}
      />
    </>
  );
};
