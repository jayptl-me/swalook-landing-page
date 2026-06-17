import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ children, href, className }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

// Mock react-icons
vi.mock("react-icons/fi", () => ({
  FiChevronDown: () => <span data-testid="chevron-down" />,
}));

import Navbar from "@/components/Navbar";

describe("Navbar", () => {
  it("renders the brand name", () => {
    render(<Navbar />);
    expect(screen.getByText("Swalook")).toBeTruthy();
  });

  it("renders navigation links", () => {
    render(<Navbar />);
    expect(screen.getByText("Home")).toBeTruthy();
    expect(screen.getByText("About Us")).toBeTruthy();
    expect(screen.getByText("Products")).toBeTruthy();
    expect(screen.getByText("Resources")).toBeTruthy();
    expect(screen.getByText("Contact Us")).toBeTruthy();
    expect(screen.getByText("FAQ")).toBeTruthy();
    expect(screen.getByText("Careers")).toBeTruthy();
  });

  it("renders CTA button", () => {
    render(<Navbar />);
    expect(screen.getByText("Request a Demo")).toBeTruthy();
  });

  it("renders mobile menu toggle button", () => {
    render(<Navbar />);
    const toggle = screen.getByLabelText("Open navigation menu");
    expect(toggle).toBeTruthy();
  });

  it("opens mobile menu when toggle is clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const toggle = screen.getByLabelText("Open navigation menu");
    await user.click(toggle);
    const mobileMenu = screen.getByRole("navigation");
    expect(mobileMenu).toBeTruthy();
  });
});
