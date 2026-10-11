import { render, screen, fireEvent } from "@testing-library/react";
import App from "@/App";

describe("App", () => {
  it("renders and shows a challenge", () => {
    render(<App />);
    expect(screen.getByRole("img", { name: /\+ \d+ = \?/ })).toBeInTheDocument();
  });

  it("refresh gives a different challenge", () => {
    render(<App />);
    const before = screen.getByRole("img", { name: /= \?/ }).getAttribute("aria-label");
    fireEvent.click(screen.getByRole("button", { name: /refresh/i }));
    const after = screen.getByRole("img", { name: /= \?/ }).getAttribute("aria-label");
    expect(after).not.toBe(before);
  });

  it("toggles dark class on <html>", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /dark theme/i }));
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
