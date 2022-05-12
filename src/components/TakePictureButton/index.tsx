import React from "react";
import { StyledButton } from "./styles";

interface Props {
  handleClickTakePicture: () => void;
}

export const TakePictureButton: React.FC<Props> = ({
  handleClickTakePicture,
}) => {
  return (
    <StyledButton
      onClick={() => {
        handleClickTakePicture();
      }}
    >
      TAKE PICTURE
    </StyledButton>
  );
};
