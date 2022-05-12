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
