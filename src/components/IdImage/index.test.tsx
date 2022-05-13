import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { IdImage } from "./index";

describe("IdImage", () => {
  it("renders IdImage", () => {
    render(<IdImage image="my-image-src" />);
    expect(screen.getByRole("img")).toHaveAttribute("src", "my-image-src");
  });
});
