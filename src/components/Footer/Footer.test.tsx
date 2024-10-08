import { render, screen, within } from "@testing-library/react";
import { axe } from "jest-axe";
import * as React from "react";
import * as renderer from "react-test-renderer";

import Footer from "./Footer";

describe("Footer Accessibility", () => {
  it("passes axe accessibility", async () => {
    const { container } = render(<Footer />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("Footer", () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it("renders a footer element container", () => {
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("renders a list of three link lists", () => {
    const list = screen.getByTestId("text-links");
    const innerLists = within(list).getAllByRole("list");

    expect(innerLists).toHaveLength(3);
    expect(within(innerLists[0]).getAllByRole("link")).toHaveLength(4);
    expect(within(innerLists[0]).getAllByRole("link")[0]).toHaveTextContent(
      "Accessibility"
    );
    expect(within(innerLists[1]).getAllByRole("link")).toHaveLength(4);
    expect(within(innerLists[1]).getAllByRole("link")[0]).toHaveTextContent(
      "Privacy Policy"
    );
    expect(within(innerLists[2]).getAllByRole("link")).toHaveLength(3);
    expect(within(innerLists[2]).getAllByRole("link")[0]).toHaveTextContent(
      "Rules & Regulations"
    );
  });

  it("renders a list of three four social media icons", () => {
    const list = screen.getByTestId("social-media-links");
    const icons = within(list).getAllByRole("img");

    expect(icons).toHaveLength(3);
    const facebookIcon = screen.getByTitle("NYPL on Facebook");
    const instagramIcon = screen.getByTitle("NYPL on Instagram");
    const youtubeIcon = screen.getByTitle("NYPL on Youtube");
    expect(facebookIcon).toBeInTheDocument();
    expect(instagramIcon).toBeInTheDocument();
    expect(youtubeIcon).toBeInTheDocument();
  });

  it("renders a footer image of the NYPL building", () => {
    const nyplBuildingImage = screen.getByAltText("NYPL Main Building Facade");

    expect(nyplBuildingImage).toBeInTheDocument();
    expect(nyplBuildingImage).toHaveAttribute(
      "src",
      "https://cdn-d8.nypl.org/s3fs-public/2020-05/NYPL_MainFacadeRev2Cam2.png"
    );
  });

  it("renders the NYPL logo", () => {
    expect(
      screen.getByTitle("The New York Public Library")
    ).toBeInTheDocument();
  });

  it("renders the UI snapshot correctly", () => {
    const footer = renderer.create(<Footer />).toJSON();
    expect(footer).toMatchSnapshot();
  });
});
