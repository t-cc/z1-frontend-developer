import styled from "styled-components";

export const StyledVideoWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  z-index: 1;
  background: gray;
`;

export const StyledVideo = styled.video`
  width: 100%;
`;

export const StyledVideoMask = styled.div`
  background: rgba(20, 28, 38, 0.75);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  z-index: 10;
`;

export const StyledHead = styled.div`
  color: #ffffff;
  font-family: Roboto;
  font-size: 1.3125rem;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 1.5rem;
  text-align: center;
  margin-top: 4rem;
`;

export const StyledMessage = styled.div`
  color: #ffffff;
  font-family: Roboto;
  font-size: 1rem;
  letter-spacing: 0;
  line-height: 1.5rem;
  text-align: center;
  margin-bottom: 3rem;
  padding: 1rem;
`;

export const StyledCanvasWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;

export const StyledAspectRatio = styled.div`
  width: 100%;
  padding-top: 60%;
  height: 0;
  position: relative;
`;

export const StyledCanvas = styled.canvas<CanvasPreview>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 5%;
  border: 0.125rem solid transparent;
  ${({ colorIsValidated, colorIsTooDark }) =>
    colorIsTooDark
      ? "border-color: transparent;"
      : colorIsValidated
      ? "border-color: green;"
      : "border-color: red;"}
`;

export const StyledOkMessage = styled.div`
  color: #ffffff;
  font-family: Roboto;
  font-size: 1rem;
  letter-spacing: 0;
  line-height: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 0.8rem;
`;

export const StyledBtnCancel = styled.button`
  color: #ffffff;
  font-family: Roboto;
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 0.35px;
  line-height: 1.5rem;
  text-align: center;
  padding: 1rem;
  background: transparent;
  border: none;
  margin-top: auto;
  margin-bottom: 1rem;
`;
