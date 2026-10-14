import { getEnvVar } from "../../utils";

const envPrefix = getEnvVar("VITE_APP_ENV") === "qa" ? "qa-" : "";

const link = {
  nyplLinks: [
    [
      {
        text: "Accessibility",
        href: `//${envPrefix}www.nypl.org/accessibility`,
      },
      {
        text: "Press",
        href: `//${envPrefix}www.nypl.org/press`,
      },
      {
        text: "Careers",
        href: `//${envPrefix}www.nypl.org/careers`,
      },
      {
        text: "Space Rental",
        href: `//${envPrefix}www.nypl.org/spacerental`,
      },
    ],
    [
      {
        text: "Privacy Policy",
        href: `//${envPrefix}www.nypl.org/help/about-nypl/legal-notices/privacy-policy`,
      },
      {
        text: "Other Policies",
        href: `//${envPrefix}www.nypl.org/policies`,
      },
      {
        text: "Terms & Conditions",
        href: `//${envPrefix}www.nypl.org/terms-conditions`,
      },
      {
        text: "Governance",
        href: `//${envPrefix}www.nypl.org/help/about-nypl/leadership/board-trustees`,
      },
    ],
    [
      {
        text: "Rules & Regulations",
        href: `//${envPrefix}www.nypl.org/help/about-nypl/legal-notices/rules-and-regulations`,
      },
      {
        text: "About NYPL",
        href: `//${envPrefix}www.nypl.org/help/about-nypl`,
      },
      {
        text: "Language",
        href: `//${envPrefix}www.nypl.org/language`,
      },
    ],
  ],
  socialMedia: [
    {
      href: "https://www.facebook.com/nypl",
      iconName: "legacySocialFacebook",
      title: "NYPL on Facebook",
    },
    {
      href: "https://twitter.com/nypl",
      iconName: "legacySocialTwitter",
      title: "NYPL on Twitter",
    },
    {
      href: "https://instagram.com/nypl",
      iconName: "legacySocialInstagram",
      title: "NYPL on Instagram",
    },
    {
      href: "https://www.youtube.com/user/NewYorkPublicLibrary",
      iconName: "legacySocialYoutube",
      title: "NYPL on Youtube",
    },
  ],
};

export default link;
