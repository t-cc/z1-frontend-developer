import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { TakePictureButton } from "./index";
import { STATUS_TYPE_ACCEPTED } from "../../constants/status";

describe("TakePictureButton", () => {
  it("renders action text", () => {
    render(
      <TakePictureButton
        statusType={STATUS_TYPE_ACCEPTED}
        handleClickTakePicture={() => {
          return;
        }}
      />
    );
    expect(screen.getByText("TAKE PICTURE")).toBeInTheDocument();
  });
  it('calls "onClick"', () => {
    const onClick = jest.fn();
    render(
      <TakePictureButton
        statusType={STATUS_TYPE_ACCEPTED}
        handleClickTakePicture={onClick}
      />
    );
    fireEvent.click(screen.getByText("TAKE PICTURE"));
    expect(onClick).toHaveBeenCalled();
  });
});
