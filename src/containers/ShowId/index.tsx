import React from "react";
import { useRecoilState } from "recoil";
import { Header } from "../../components/Header";
import { Main } from "../../components/Main";
import {
  STATUS_TEXT_ACCEPTED,
  STATUS_TEXT_REJECTED,
  STATUS_TEXT_UNKNOW,
  STATUS_TYPE_ACCEPTED,
  STATUS_TYPE_REJECTED,
  STATUS_TYPE_UNKNOW,
} from "../../constants/status";
import {
  blobPhotoState,
  colorIsValidatedState,
  postResponseOkState,
  showTakePictureState,
} from "../../state";

export function ShowId() {
  const [, setShowTakePicture] = useRecoilState(showTakePictureState);
  const [blobPhoto, setBlobPhoto] = useRecoilState(blobPhotoState);
  const [postResponseOk] = useRecoilState(postResponseOkState);
  const [, setColorIsValidated] = useRecoilState(colorIsValidatedState);

  const handleClickTakePicture = () => {
    setBlobPhoto(undefined);
    setColorIsValidated(false);
    setShowTakePicture(true);
  };

  let statusType = STATUS_TYPE_UNKNOW;
  let statusText = STATUS_TEXT_UNKNOW;
  if (postResponseOk !== undefined) {
    if (postResponseOk) {
      statusType = STATUS_TYPE_ACCEPTED;
      statusText = STATUS_TEXT_ACCEPTED;
    } else {
      statusType = STATUS_TYPE_REJECTED;
      statusText = STATUS_TEXT_REJECTED;
    }
  }
  return (
    <>
      <Header />
      <Main
        image={blobPhoto}
        statusText={statusText}
        statusType={statusType}
        handleClickTakePicture={handleClickTakePicture}
      />
    </>
  );
}
