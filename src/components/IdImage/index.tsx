import React from "react";
import IdBgDefault from "../../assets/ID_bg.svg";
import { STATUS_TYPE_UNKNOW } from "../../constants/status";
import { StyledImg } from "./styles";

interface Props {
  statusType?: string;
  image?: string;
}

export const IdImage: React.FC<Props> = ({
  statusType = STATUS_TYPE_UNKNOW,
  image = IdBgDefault,
}) => {
  if (!image) {
    image = IdBgDefault;
  }
  return (
    <>
      <StyledImg src={image} statusType={statusType} />
    </>
  );
};
