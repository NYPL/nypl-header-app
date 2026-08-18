import { Link } from "@nypl/design-system-react-components";
// Utils
import { sendAnalyticsNavClickEvent } from "../../utils";

export type LinkItem = {
  href: string;
  text: string;
  key?: string;
  ga4clickText?: string;
};

interface ListLinkProps {
  linkItem: LinkItem;
  isDonateLink?: boolean;
  additionalStyles?: object;
  icon?: React.ReactNode;
}

const ListLink = ({
  linkItem,
  isDonateLink,
  additionalStyles,
  icon,
}: ListLinkProps) => {
  const { href, text, ga4clickText } = linkItem;
  return (
    <Link
      href={href}
      // Clicks from the Donate button are already tracked separately
      onClick={() =>
        !isDonateLink &&
        sendAnalyticsNavClickEvent({
          clickText: ga4clickText || text,
          clickUrl: href,
        })
      }
      {...(isDonateLink && { type: "buttonCallout" })}
      {...(additionalStyles && { __css: additionalStyles })}
    >
      {icon}
      {text}
    </Link>
  );
};

export default ListLink;
