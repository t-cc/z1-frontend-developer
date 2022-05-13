import React from "react";
import {
  STATUS_TYPE_ACCEPTED,
  STATUS_TEXT_UNKNOW,
  STATUS_TYPE_UNKNOW,
} from "../../constants/status";
import { IdImage } from "../IdImage";
import { StatusButton } from "../StatusButton";
import { TakePictureButton } from "../TakePictureButton";
import { StyledHead, StyledImgWrapper, StyledMessage } from "./styles";

interface Props {
  image?: string;
  statusType?: string;
  statusText?: string;
  handleClickTakePicture: () => void;
}

export const Main: React.FC<Props> = ({
  image,
  statusType = STATUS_TYPE_UNKNOW,
  statusText = STATUS_TEXT_UNKNOW,
  handleClickTakePicture,
}) => {
  return (
    <main>
      <StyledHead>Scan your ID</StyledHead>
      <StyledMessage>
        Take a picture. It may take time to validate your personal information.
      </StyledMessage>
      <StyledImgWrapper>
        <IdImage image={image} statusType={statusType} />
        {statusType !== STATUS_TYPE_ACCEPTED && (
          <TakePictureButton
            handleClickTakePicture={handleClickTakePicture}
            statusType={statusType}
          />
        )}
        {statusType !== STATUS_TYPE_UNKNOW && (
          <StatusButton statusText={statusText} statusType={statusType} />
        )}
      </StyledImgWrapper>
    </main>
  );
};
