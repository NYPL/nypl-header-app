import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import * as renderer from "react-test-renderer";

import HeaderMobileNavButton from "./HeaderMobileNavButton";

import * as envUtils from "../../../utils";

jest.mock("../../../utils", () => ({
  getEnvVar: jest.fn(),
}));

describe("HeaderMobileNavButton Accessibility", () => {
  beforeAll(() => {
    (envUtils.getEnvVar as jest.Mock).mockImplementation((key) =>
      key === "VITE_APP_ENV" ? "qa" : ""
    );
  });
  it("passes axe accessibility test", async () => {
    const { container } = render(<HeaderMobileNavButton />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("HeaderMobileNavButton", () => {
  beforeAll(() => {
    (envUtils.getEnvVar as jest.Mock).mockImplementation((key) =>
      key === "VITE_APP_ENV" ? "qa" : ""
    );
  });

  beforeEach(() => {
    render(<HeaderMobileNavButton />);
  });

  it("renders a menu button", () => {
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-label", "Open Navigation");
  });

  it("renders a Close button when clicked", () => {
    const menuBtn = screen.getByRole("button");

    expect(menuBtn).toHaveAttribute("aria-label", "Open Navigation");

    userEvent.click(menuBtn);

    expect(menuBtn).toHaveAttribute("aria-label", "Close Navigation");
  });

  it("renders the mobile navigation menu when clicked", () => {
    const menuBtn = screen.getByRole("button");

    userEvent.click(menuBtn);

    const logo = screen.getByRole("img");
    const navList = screen.getByRole("navigation");
    const links = screen.getAllByRole("link");

    expect(logo).toBeInTheDocument();
    expect(navList).toBeInTheDocument();
    expect(links).toHaveLength(11);
  });

  it("renders the UI snapshot correctly", () => {
    const headermobileNavButton = renderer
      .create(<HeaderMobileNavButton />)
      .toJSON();

    expect(headermobileNavButton).toMatchSnapshot();
  });
});
