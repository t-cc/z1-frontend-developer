import React from "react";
import { STATUS_TYPE_REJECTED } from "../../constants/status";
import { StyledButton } from "./styles";

interface Props {
  statusType: string;
  handleClickTakePicture: () => void;
}

export const TakePictureButton: React.FC<Props> = ({
  statusType,
  handleClickTakePicture,
}) => {
  return (
    <StyledButton
      onClick={() => {
        handleClickTakePicture();
      }}
    >
      {statusType === STATUS_TYPE_REJECTED ? "RETAKE PICTURE" : "TAKE PICTURE"}
    </StyledButton>
  );
};
