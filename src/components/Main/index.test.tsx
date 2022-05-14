import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Main } from "./index";

describe("Header", () => {
  it("renders texts", () => {
    render(
      <Main
        image="test-image-uri"
        handleClickTakePicture={() => {
          return;
        }}
      />
    );
    expect(screen.getByText("Scan your ID")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Take a picture. It may take time to validate your personal information."
      )
    ).toBeInTheDocument();
  });

  it('calls "onClick" on button', () => {
    const onClick = jest.fn();
    render(<Main image="test-image-uri" handleClickTakePicture={onClick} />);
    fireEvent.click(screen.getByText("TAKE PICTURE"));
    expect(onClick).toHaveBeenCalled();
  });
});
