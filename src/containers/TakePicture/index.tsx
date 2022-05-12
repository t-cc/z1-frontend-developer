import React, { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { CameraPreview } from "../../components/CameraPreview";
import { ID_EXPECTED_RGB_HIGH, ID_EXPECTED_RGB_LOW } from "../../constants/id";
import { useCamera } from "../../hooks/useCamera";
import {
  showTakePictureState,
  blobPhotoState,
  postResponseOkState,
} from "../../state";

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

  const handleSubmit = async () => {
    const response = await fetch(
      "https://front-exercise.z1.digital/evaluations",
      {
        method: "POST",
        body: null,
      }
    );

    const responseJson = await response.json();
    if (responseJson.summary && responseJson.summary.outcome) {
      console.info(responseJson.summary.outcome);
      setPostResponseOk(responseJson.summary.outcome === "Approved");
      setShowTakePicture(false);
    }
    //
  };

  useEffect(() => {
    const getAverageRGB = (data: ImageData | undefined) => {
      let r = 0;
      let g = 0;
      let b = 0;
      let i = 0;
      if (data) {
        let count = 0;
        const blockSize = 4;
        while ((i += blockSize * 4) < data.data.length) {
          ++count;
          r += data.data[i];
          g += data.data[i + 1];
          b += data.data[i + 2];
        }
        r = ~~(r / count);
        g = ~~(g / count);
        b = ~~(b / count);
      }
      return [r, g, b];
    };

    const isValidIdCardColor = (r: number, g: number, b: number) => {
      return (
        ID_EXPECTED_RGB_LOW.r < r &&
        r < ID_EXPECTED_RGB_HIGH.r &&
        ID_EXPECTED_RGB_LOW.g < g &&
        g < ID_EXPECTED_RGB_HIGH.g &&
        ID_EXPECTED_RGB_LOW.b < b &&
        b < ID_EXPECTED_RGB_HIGH.b
      );
    };

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
          const [r, g, b] = getAverageRGB(data);
          if (isValidIdCardColor(r, g, b)) {
            setBlobPhoto(canvasRef.current.toDataURL());
            handleSubmit();
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
    }, 500);

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
