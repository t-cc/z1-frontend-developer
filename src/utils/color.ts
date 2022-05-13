import { ID_EXPECTED_RGB_HIGH, ID_EXPECTED_RGB_LOW } from "../constants/id";

export const getAverageRGBfromImage = (data: ImageData | undefined) => {
  let r = 0;
  let g = 0;
  let b = 0;
  let i = 0;
  if (data) {
    let count = 0;
    const blockSize = 4;
    while ((i += blockSize * 4) < data.data.length) {
      ++count;
      r += data.data[i];
      g += data.data[i + 1];
      b += data.data[i + 2];
    }
    r = ~~(r / count);
    g = ~~(g / count);
    b = ~~(b / count);
  }
  return [r, g, b];
};

export const isValidIdCardAverageColor = (r: number, g: number, b: number) => {
  return (
    ID_EXPECTED_RGB_LOW.r < r &&
    r < ID_EXPECTED_RGB_HIGH.r &&
    ID_EXPECTED_RGB_LOW.g < g &&
    g < ID_EXPECTED_RGB_HIGH.g &&
    ID_EXPECTED_RGB_LOW.b < b &&
    b < ID_EXPECTED_RGB_HIGH.b
  );
};
