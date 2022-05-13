import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Header } from "./index";

describe("Header", () => {
  it("renders header", () => {
    const { container } = render(<Header />);
    expect(screen.getByText("BankClient")).toBeInTheDocument();
  });
});
