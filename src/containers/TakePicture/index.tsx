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
} from "../../state";
import { sendImage } from "../../services/sendImage";

const CAPTURE_OPTIONS = {
  audio: false,
  video: true, // { facingMode: "environment" },
};

export const TakePicture = () => {
  const [, setShowTakePicture] = useRecoilState(showTakePictureState);
  const [, setBlobPhoto] = useRecoilState(blobPhotoState);
  const [, setPostResponseOk] = useRecoilState(postResponseOkState);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mediaStream = useCamera(CAPTURE_OPTIONS);

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream;
  }

  function handleCanPlay() {
    videoRef.current?.play();
  }

  const handleSubmit = async (imageData: string) => {
    const response = await sendImage(imageData);
    setPostResponseOk(response);
    setShowTakePicture(false);
  };

  useEffect(() => {
    const takePhoto = async (capture: ImageCapture) => {
      const photo = await capture.takePhoto();
      const url = URL.createObjectURL(photo);
      const img = new Image();
      img.src = url;

      img.addEventListener("load", () => {
        if (canvasRef.current) {
          const cutStartX = img.width * 0.25;
          const cutWidth = img.width * 0.5;
          const cutHeight = cutWidth * 1.5;
          const cutStartY = img.height / 2 - cutHeight / 2;
          const width = canvasRef.current.width;
          const height = canvasRef.current.height;
          URL.revokeObjectURL(img.src);
          const context = canvasRef.current.getContext("2d");
          context?.drawImage(
            img,
            cutStartX,
            cutStartY,
            cutWidth,
            cutHeight,
            0,
            0,
            width,
            height
          );
          const data = context?.getImageData(0, 0, width, height);
          const [r, g, b] = getAverageRGBfromImage(data);
          if (isValidIdCardAverageColor(r, g, b)) {
            const imageData = canvasRef.current.toDataURL();
            setBlobPhoto(imageData);
            handleSubmit(imageData);
            // setShowTakePicture(false);
          }
        }
      });
    };

    const timmer = setInterval(() => {
      if (videoRef.current?.srcObject) {
        const tracks = mediaStream?.getVideoTracks();
        if (tracks) {
          const capture = new ImageCapture(tracks[0]);
          takePhoto(capture);
        }
      }
    }, 1000);

    return () => {
      clearInterval(timmer);
    };
  }, [videoRef.current?.srcObject]);

  return (
    <>
      <CameraPreview
        videoRef={videoRef}
        canvasRef={canvasRef}
        handleCanPlay={handleCanPlay}
        handleClickCancelPicture={() => {
          setShowTakePicture(false);
        }}
      />
    </>
  );
};
