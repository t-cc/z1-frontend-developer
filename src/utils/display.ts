import { RefObject } from "react";
import {
  ID_CAPTURE_HEIGHT,
  ID_CAPTURE_WIDTH,
  ID_HEIGHT_RATIO,
} from "../constants/id";
import { getAverageRGBfromImage, isValidIdCardAverageColor } from "./color";

export const displayAndCheckImage = async (
  videoRef: RefObject<HTMLVideoElement>,
  canvasRef: RefObject<HTMLCanvasElement>
) => {
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
      return canvasRef.current.toDataURL();
    }
  }
  return null;
};
