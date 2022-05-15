import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { TakePicture } from "./index";
import { RecoilRoot } from "recoil";

describe("ShowId", () => {
  it("renders", () => {
    render(
      <RecoilRoot>
        <TakePicture />
      </RecoilRoot>
    );
    expect(screen.getByText("Take picture")).toBeInTheDocument();
  });
});
