import React, { RefObject } from "react";
import {
  StyledBtnCancel,
  StyledCanvasWrapper,
  StyledHead,
  StyledMessage,
  StyledVideo,
  StyledVideoMask,
  StyledAspectRatio,
  StyledCanvas,
  StyledVideoWrapper,
} from "./styles";

interface Props {
  videoRef: RefObject<HTMLVideoElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
  handleCanPlay: () => void;
  handleClickCancelPicture: () => void;
}

export const CameraPreview: React.FC<Props> = ({
  videoRef,
  canvasRef,
  handleCanPlay,
  handleClickCancelPicture,
}) => {
  return (
    <>
      <StyledVideoWrapper>
        <StyledVideo
          ref={videoRef}
          onCanPlay={handleCanPlay}
          autoPlay
          playsInline
          muted
        />
      </StyledVideoWrapper>
      <StyledVideoMask>
        <StyledHead>Take picture</StyledHead>
        <StyledMessage>
          Fit your ID card inside the frame. The picture will be taken
          automatically.
        </StyledMessage>

        <StyledCanvasWrapper>
          <StyledAspectRatio>
            <StyledCanvas ref={canvasRef} />
          </StyledAspectRatio>
        </StyledCanvasWrapper>
        <StyledBtnCancel
          onClick={() => {
            handleClickCancelPicture();
          }}
        >
          CANCEL
        </StyledBtnCancel>
      </StyledVideoMask>
    </>
  );
};
