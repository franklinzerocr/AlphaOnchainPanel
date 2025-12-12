import { render, screen } from "@testing-library/react";
import React from "react";

function Smoke() {
  return <h1>AlphaOnchain Panel</h1>;
}

describe("Smoke", () => {
  it("renders", () => {
    render(<Smoke />);
    expect(screen.getByText("AlphaOnchain Panel")).toBeInTheDocument();
  });
});
