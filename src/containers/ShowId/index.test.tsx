import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ShowId } from "./index";
import { RecoilRoot } from "recoil";

describe("ShowId", () => {
  it("renders", () => {
    render(
      <RecoilRoot>
        <ShowId />
      </RecoilRoot>
    );
    expect(screen.getByText("Scan your ID")).toBeInTheDocument();
  });
});
