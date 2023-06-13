import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import Cookies from "js-cookie";
import * as renderer from "react-test-renderer";

import Header from "./Header";
import {
  patronApiUrlWithToken,
  mockExpiredResponseData,
  mockLoginCookie,
  mockResponseData,
} from "./utils/authApiMockResponse";
import { alertsApiUrl, tokenRefreshLink } from "./utils/headerUtils";
import { refineryResponse } from "./utils/sitewideAlertsMocks";

jest.mock("js-cookie", () => ({
  get: () => mockLoginCookie,
  remove: jest.fn(),
}));

describe("Header Accessibility", () => {
  it("passes axe accessibility test", async () => {
    // Mock the fetch API call in `SitewideAlerts`.
    (global as any).fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(refineryResponse),
      })
    ) as jest.Mock;

    const { container } = await waitFor(() =>
      render(<Header isProduction={false} />)
    );
    expect(await axe(container)).toHaveNoViolations();

    jest.clearAllMocks();
  });
});

// TODO: These tests do not currently test the mobile web view.
// We need to determine a way of doing this for all responsive
// components, and will add this in at a later date.
describe.skip("Header", () => {
  let container;

  beforeEach(async () => {
    // Mock the fetch API call in `SitewideAlerts`.
    (global as any).fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(refineryResponse),
      })
    ) as jest.Mock;

    // Mocks matchMedia so that the desktop view renders rather than mobile.
    global.matchMedia = jest.fn(() => ({
      addListener: () => {},
      removeListener: () => {},
      matches: true,
    })) as jest.Mock;

    await waitFor(() => {
      const utils = render(<Header isProduction={false} />);
      container = utils.container;
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("renders a skip navigation", () => {
    const skipNavigation = screen.getAllByRole("navigation")[0];
    const { getByRole } = within(skipNavigation);

    expect(skipNavigation).toBeInTheDocument();
    expect(skipNavigation).toHaveAttribute("aria-label", "Skip Navigation");
    expect(getByRole("list")).toBeInTheDocument();
  });

  it("renders a notification", () => {
    const notification = screen.getByRole("complementary");
    const { getByText } = within(notification);

    expect(notification).toBeInTheDocument();
    expect(getByText(/masks are encouraged/i)).toBeInTheDocument();
  });

  it("renders the NYPL logo", () => {
    const nyplLink = screen.getAllByRole("link", {
      name: "The New York Public Library",
    })[0];

    const logo = within(nyplLink).getByRole("img");

    expect(logo).toHaveAttribute("aria-label", "NYPL Header Logo");
  });

  it("renders the upper links", () => {
    // Removes automatically added, unused Chakra toast elements.
    document.getElementById("chakra-toast-portal")?.remove();

    // The first list is the skip navigation.
    // The second list is the list of alerts in the `SitewideAlerts` component.
    // The third list is the upper navigation.

    const upperList = screen.getAllByRole("list")[2];
    const upperLinks = within(upperList).getAllByRole("listitem");

    expect(upperLinks.length).toEqual(6);
    expect(upperLinks[0]).toHaveTextContent(/log in/i);
    expect(upperLinks[5]).toHaveTextContent(/shop/i);
  });

  it("renders the lower links", () => {
    // Removes automatically added, unused Chakra toast elements.
    document.getElementById("chakra-toast-portal")?.remove();

    // The first list is the skip navigation.
    // The second list is the list of alerts in the `SitewideAlerts` component.
    // The third list is the upper navigation.
    // The fourth list is the lower navigation.
    const lowerList = screen.getAllByRole("list")[3];
    const lowerLinks = within(lowerList).getAllByRole("listitem");

    expect(lowerLinks.length).toEqual(8);
    expect(lowerLinks[0]).toHaveTextContent(/books/i);
    expect(lowerLinks[7]).toHaveTextContent(/search/i);
  });

  it("opens the login menu", () => {
    // Removes automatically added, unused Chakra toast elements.
    document.getElementById("chakra-toast-portal")?.remove();

    // The third list is the upper navigation links.
    let upperList = screen.getAllByRole("list")[2];
    let upperLinks = within(upperList).getAllByRole("listitem");

    expect(upperLinks.length).toEqual(6);

    const myAccountButton = within(upperLinks[0]).getByRole("button");
    expect(upperLinks[0]).toHaveTextContent(/my account/i);
    expect(upperLinks[1]).toHaveTextContent(/locations/i);

    userEvent.click(myAccountButton);

    upperList = screen.getAllByRole("list")[2];
    upperLinks = within(upperList).getAllByRole("listitem");

    // Login menu opens, revealing two additional list items.
    expect(upperLinks.length).toEqual(8);
    expect(upperLinks[0]).toHaveTextContent(/close/i);
    expect(upperLinks[1]).toHaveTextContent(/go to the catalog/i);
  });

  it("renders the horizontal rule", () => {
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("renders the UI snapshot correctly", () => {
    const header = renderer.create(<Header isProduction={false} />).toJSON();

    expect(header).toMatchSnapshot();
  });
});

// Skipping because this functionality is temporarily removed.
describe.skip("Patron API call succeeds", () => {
  beforeAll(async () => {
    (Cookies as any).setMockImplementation(() => ({
      get: () => mockLoginCookie,
    }));
    // When the Header mounts, it immediately checks for the cookie value.
    // That is why this mock is here.
    // Cookies.get = jest.fn().mockReturnValue(mockLoginCookie);
    // This is assuming that the sitewide alerts fetch call runs
    // before the patron information call. If the alerts call runs
    // after the patron information call, the wrong response will be
    // returned for each and this test will fail.

    // TODO: Fix the indeterministic fetch calls.
    (global as any).fetch = jest
      .fn()
      // Mock the fetch API call for sitewide alerts.
      .mockReturnValueOnce(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(refineryResponse),
        })
      )
      // Mock the fetch API call for patron data (successful).
      .mockReturnValueOnce(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(mockResponseData),
        })
      );

    await waitFor(() => render(<Header isProduction={false} />));
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("displays the logged in view when call succeeds", async () => {
    document.getElementById("chakra-toast-portal")?.remove();

    expect(Cookies.get).toHaveBeenCalledWith("nyplIdentityPatron");

    // The third list is the upper navigation links.
    const upperList = await screen.getAllByRole("list")[2];
    const upperLinks = within(upperList).getAllByRole("listitem");
    const firstListElement = within(upperLinks[0]).getByRole("button");
    let greeting = screen.queryByText(/jane/i);
    let logoutButton = screen.queryByRole("link", { name: /log out/i });

    expect(greeting).not.toBeInTheDocument();
    expect(logoutButton).not.toBeInTheDocument();

    expect(firstListElement).toHaveTextContent(/account/i);

    userEvent.click(firstListElement);

    greeting = screen.queryByText(/jane/i);
    logoutButton = screen.queryByRole("link", { name: /log out/i });

    expect(greeting).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });
});

// Skipping because this functionality is temporarily removed.
describe.skip("Patron API call fails", () => {
  beforeAll(async () => {
    (Cookies as any).setMockImplementation(() => ({
      get: () => mockLoginCookie,
    }));
    (global as any).fetch = jest
      .fn()
      // Mock the fetch API call for sitewide alerts.
      .mockReturnValueOnce(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(refineryResponse),
        })
      )
      // Mock the fetch API call for patron data (unsuccessful).
      .mockReturnValueOnce(
        Promise.resolve({
          status: 500,
        })
      );

    await waitFor(() => render(<Header isProduction={false} />));
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("logs warning and displays the logged out view if call fails", async () => {
    const warn = jest.spyOn(console, "warn");
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Header: There was an error fetching NYPL patron data."
    );

    document.getElementById("chakra-toast-portal")?.remove();

    // If the call fails, the Header should render the logged out state.
    const upperList = await screen.getAllByRole("list")[2];
    const upperLinks = within(upperList).getAllByRole("listitem");
    const firstListElement = within(upperLinks[0]).getByRole("button");

    expect(firstListElement).toHaveTextContent(/log in/i);
  });
});

// Skipping because this functionality is temporarily removed.
describe.skip("Patron API returns wrong data", () => {
  beforeAll(async () => {
    (Cookies as any).setMockImplementation(() => ({
      get: () => mockLoginCookie,
    }));

    (global as any).fetch = jest
      .fn()
      // Mock the fetch API call for sitewide alerts.
      .mockReturnValueOnce(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(refineryResponse),
        })
      )
      // Mock the fetch API call for patron data (wrong data).
      .mockReturnValueOnce(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({}),
        })
      );

    await waitFor(() => render(<Header isProduction={false} />));
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("displays the logged out view if wrong data is received", async () => {
    document.getElementById("chakra-toast-portal")?.remove();

    // Without the correct data, the Header should render the logged out state.
    const upperList = await screen.getAllByRole("list")[2];
    const upperLinks = within(upperList).getAllByRole("listitem");
    const firstListElement = within(upperLinks[0]).getByRole("button");

    expect(firstListElement).toHaveTextContent(/log in/i);
  });
});

// Skipping because this functionality is temporarily removed.
describe.skip("Patron API returns expired data, but refreshes the token successfully", () => {
  beforeAll(async () => {
    (Cookies as any).setMockImplementation(() => ({
      get: () => mockLoginCookie,
    }));

    (global as any).fetch = jest
      .fn()
      // Mock the fetch API call for sitewide alerts.
      .mockReturnValueOnce(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(refineryResponse),
        })
      )
      // Mock the fetch API call for patron data (token expired).
      .mockReturnValueOnce(
        Promise.resolve({
          status: 401,
          json: () => Promise.resolve(mockExpiredResponseData),
        })
      )
      // Mock the fetch API call to refresh the access token (successful).
      .mockReturnValueOnce(
        Promise.resolve({
          status: 200,
        })
      )
      // Mock the fetch API call for patron data (successful).
      .mockReturnValueOnce(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(mockResponseData),
        })
      );

    await waitFor(() => render(<Header isProduction={false} />));
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("displays logged in view if refresh is successful", async () => {
    expect((global as any).fetch).toHaveBeenNthCalledWith(1, alertsApiUrl);
    expect((global as any).fetch).toHaveBeenNthCalledWith(
      2,
      patronApiUrlWithToken
    );
    expect((global as any).fetch).toHaveBeenNthCalledWith(
      3,
      // Using the development environment.
      tokenRefreshLink(false),
      {
        credentials: "include",
      }
    );
    expect((global as any).fetch).toHaveBeenNthCalledWith(
      4,
      patronApiUrlWithToken
    );

    document.getElementById("chakra-toast-portal")?.remove();

    // The third list is the upper navigation links.
    const upperList = await screen.getAllByRole("list")[2];
    const upperLinks = within(upperList).getAllByRole("listitem");
    const firstListElement = within(upperLinks[0]).getByRole("button");
    let greeting = screen.queryByText(/jane/i);
    let logoutButton = screen.queryByRole("link", { name: /log out/i });

    expect(greeting).not.toBeInTheDocument();
    expect(logoutButton).not.toBeInTheDocument();

    expect(firstListElement).toHaveTextContent(/account/i);

    userEvent.click(firstListElement);

    greeting = screen.queryByText(/jane/i);
    logoutButton = screen.queryByRole("link", { name: /log out/i });

    expect(greeting).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });
});

// Skipping because this functionality is temporarily removed.
describe.skip("Patron API returns expired data and cannot refresh the token successfully", () => {
  beforeAll(async () => {
    (Cookies as any).setMockImplementation(() => ({
      get: () => mockLoginCookie,
    }));

    (global as any).fetch = jest
      .fn()
      // Mock the fetch API call for sitewide alerts.
      .mockReturnValueOnce(
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(refineryResponse),
        })
      )
      // Mock the fetch API call for patron data (token expired).
      .mockReturnValueOnce(
        Promise.resolve({
          status: 401,
          json: () => Promise.resolve(mockExpiredResponseData),
        })
      )
      // Mock the fetch API call to refresh accessToken (unsuccessful)
      .mockReturnValueOnce(
        Promise.resolve({
          status: 500,
        })
      );

    await waitFor(() => render(<Header isProduction={false} />));
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("displays logged out view if refresh is unsuccessful", async () => {
    const warn = jest.spyOn(console, "warn");
    expect(warn).toHaveBeenCalledWith(
      "NYPL Reservoir Header: There was an error refreshing NYPL patron data."
    );

    document.getElementById("chakra-toast-portal")?.remove();

    // If the access token is expired, the Header should render the logged out state.
    const upperList = await screen.getAllByRole("list")[2];
    const upperLinks = within(upperList).getAllByRole("listitem");
    const firstListElement = within(upperLinks[0]).getByRole("button");

    expect(firstListElement).toHaveTextContent(/log in/i);
  });
});
