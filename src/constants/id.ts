// Averge color in an spanish ID card
export const ID_EXPECTED_RGB = { r: 160, g: 140, b: 120 };

export const ID_RGB_MARGIN = 0.15;

export const ID_EXPECTED_RGB_LOW = {
  r: ID_EXPECTED_RGB.r - ID_EXPECTED_RGB.r * ID_RGB_MARGIN,
  g: ID_EXPECTED_RGB.g - ID_EXPECTED_RGB.g * ID_RGB_MARGIN,
  b: ID_EXPECTED_RGB.b - ID_EXPECTED_RGB.b * ID_RGB_MARGIN,
};

export const ID_EXPECTED_RGB_HIGH = {
  r: ID_EXPECTED_RGB.r + ID_EXPECTED_RGB.r * ID_RGB_MARGIN,
  g: ID_EXPECTED_RGB.g + ID_EXPECTED_RGB.g * ID_RGB_MARGIN,
  b: ID_EXPECTED_RGB.b + ID_EXPECTED_RGB.b * ID_RGB_MARGIN,
};

export const ID_CAPTURE_WIDTH = 200;
// Dimesiones originales de un DNI: 85x55mm => ancho * 0.65 ~ altura
export const ID_HEIGHT_RATIO = 0.65;

export const ID_CAPTURE_HEIGHT = ~~ID_CAPTURE_WIDTH * ID_HEIGHT_RATIO;
