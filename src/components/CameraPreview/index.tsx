import React, { RefObject } from "react";
import { ID_CAPTURE_HEIGHT, ID_CAPTURE_WIDTH } from "../../constants/id";
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
  StyledOkMessage,
} from "./styles";
import iconCheck from "../../assets/icon-check-circle.svg";
import iconLight from "../../assets/icon-lightbulb.svg";

interface Props {
  videoRef: RefObject<HTMLVideoElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
  colorIsValidated: boolean;
  colorIsTooDark: boolean;
  handleCanPlay: () => void;
  handleClickCancelPicture: () => void;
}

export const CameraPreview: React.FC<Props> = ({
  videoRef,
  canvasRef,
  colorIsValidated,
  colorIsTooDark,
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
            <StyledCanvas
              ref={canvasRef}
              width={ID_CAPTURE_WIDTH}
              height={ID_CAPTURE_HEIGHT}
              colorIsValidated={colorIsValidated}
              colorIsTooDark={colorIsTooDark}
            />
          </StyledAspectRatio>
          {colorIsTooDark && (
            <StyledOkMessage>
              <img src={iconLight} />
              Room lighting is too low
            </StyledOkMessage>
          )}
          {colorIsValidated && (
            <StyledOkMessage>
              <img src={iconCheck} />
              Picture taken!
            </StyledOkMessage>
          )}
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
