import { atom } from "recoil";

export const showTakePictureState = atom<boolean>({
  key: "showTakePictureState",
  default: false,
});

export const blobPhotoState = atom<string>({
  key: "blobPhotoState",
  default: "",
});

export const postResponseOkState = atom<boolean>({
  key: "postResponseOkState",
  default: undefined,
});

export const colorIsValidatedState = atom<boolean>({
  key: "colorIsValidatedState",
  default: false,
});

export const colorIsTooDarkState = atom<boolean>({
  key: "colorIsTooDarkState",
  default: false,
});
