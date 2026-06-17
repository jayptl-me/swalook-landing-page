import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

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
  FiPhone: () => <span data-testid="phone-icon" />,
  FiMail: () => <span data-testid="mail-icon" />,
  FiMapPin: () => <span data-testid="map-pin-icon" />,
}));

vi.mock("react-icons/fa6", () => ({
  FaFacebookF: () => <span data-testid="facebook-icon" />,
  FaXTwitter: () => <span data-testid="twitter-icon" />,
  FaYoutube: () => <span data-testid="youtube-icon" />,
  FaLinkedinIn: () => <span data-testid="linkedin-icon" />,
  FaInstagram: () => <span data-testid="instagram-icon" />,
}));

import Footer from "@/components/Footer";

describe("Footer", () => {
  it("renders the brand name", () => {
    render(<Footer />);
    expect(screen.getByText("Swalook")).toBeTruthy();
  });

  it("renders social media links", () => {
    render(<Footer />);
    expect(screen.getByLabelText("Facebook")).toBeTruthy();
    expect(screen.getByLabelText("Twitter")).toBeTruthy();
    expect(screen.getByLabelText("YouTube")).toBeTruthy();
    expect(screen.getByLabelText("LinkedIn")).toBeTruthy();
    expect(screen.getByLabelText("Instagram")).toBeTruthy();
  });

  it("renders CRM features links", () => {
    render(<Footer />);
    expect(screen.getByText("CRM Features")).toBeTruthy();
    expect(screen.getByText("CRM Features")).toBeTruthy();
    expect(screen.getByText("Appointment Scheduling")).toBeTruthy();
  });

  it("renders copyright text", () => {
    render(<Footer />);
    expect(screen.getByText(/All rights reserved/)).toBeTruthy();
  });

  it("renders policy links", () => {
    render(<Footer />);
    expect(screen.getByText("Terms & Conditions")).toBeTruthy();
    expect(screen.getByText("Privacy Policy")).toBeTruthy();
    expect(screen.getByText("Cancellation Policy")).toBeTruthy();
    expect(screen.getByText("Shipping Policy")).toBeTruthy();
  });

  it("renders contact information", () => {
    render(<Footer />);
    expect(screen.getByText("+91 98701 03761")).toBeTruthy();
    expect(screen.getByText("info@swalook.in")).toBeTruthy();
    expect(screen.getByText(/Greater Noida/)).toBeTruthy();
  });
});
