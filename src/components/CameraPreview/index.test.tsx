import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { CameraPreview } from "./index";

describe("CameraPreview", () => {
  it("renders component and call cancel button", () => {
    const onClick = jest.fn();
    const ref = React.createRef();
    render(
      <CameraPreview
        // @ts-expect-error Needs a type RefObject<HTMLVideoElement>
        videoRef={ref}
        // @ts-expect-error Needs a type RefObject<HTMLCanvasElement>
        canvasRef={ref}
        colorIsValidated={false}
        handleCanPlay={() => {
          return;
        }}
        handleClickCancelPicture={onClick}
      />
    );
    expect(screen.getByText("Take picture")).toBeInTheDocument();
    fireEvent.click(screen.getByText("CANCEL"));
    expect(onClick).toHaveBeenCalled();
  });
});
