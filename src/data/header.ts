import { fetchGraphQL } from "@/lib/graphql";
type GraphQLMenuItemType = {
  id: string;
  label: string;
  url: string | null;
  path: string | null;
  parentId: string | null;
  order: number | null;
};
type GraphQLMenuNodeType = {
  name: string;
  slug: string;
  menuItems: {
    nodes: GraphQLMenuItemType[];
  } | null;
};
type GraphQLThemeSettingsType = {
  headerFooterSections: {
    hphone: string | null;
    hemail: string | null;
    haddress: string | null;
    hlogo: {
      node: {
        sourceUrl: string | null;
        altText: string | null;
      } | null;
    } | null;
  } | null;
};
type HeaderGraphQLResponseType = {
  themeSettings: GraphQLThemeSettingsType | null;
  menus: {
    nodes: GraphQLMenuNodeType[];
  } | null;
};
type NavLinkType = {
  label: string;
  href: string;
  description?: string;
  badge?: string;
  target?: "_self" | "_blank";
};
type MenuItemType = {
  id: string;
  label: string;
  href?: string;
  target?: "_self" | "_blank";
  badge?: string;
  type?: "link" | "dropdown" | "mega";
  children?: NavLinkType[];
};
type LogoType = {
  sourceUrl: string;
  altText: string;
};
type HeaderDataType = {
  phone: string;
  email: string;
  address: string;
  logo: LogoType;
  menu: MenuItemType[];
};
const staticHeaderData: HeaderDataType = {
  phone: "(604) 326-0459",
  email: "info@ziaeedentureclinic.ca",
  address: "2677 Kingsway, Vancouver, BC",
  logo: {
    sourceUrl: "/images/logo.svg",
    altText: "Ziaee Denture Clinic",
  },
  menu: [],
};
export async function getHeaderData(): Promise<HeaderDataType> {
  try {
    const query = `
      query Header {
        themeSettings {
          headerFooterSections {
            hphone
            hemail
            haddress
            hlogo {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
        menus {
          nodes {
            name
            slug
            menuItems(first: 100) {
              nodes {
                id
                label
                url
                path
                parentId
                order
              }
            }
          }
        }
      }
    `;
    const data = await fetchGraphQL<HeaderGraphQLResponseType>(query);
    const header = data?.themeSettings?.headerFooterSections;
    const headerMenu = data?.menus?.nodes?.find(
      (menu) => menu.name === "Header Menu" || menu.slug === "header-menu"
    );
    const rawNodes = headerMenu?.menuItems?.nodes ?? [];
    const sortedNodes = [...rawNodes].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const parentNodes = sortedNodes.filter((item) => !item.parentId);
    const childNodes = sortedNodes.filter((item) => Boolean(item.parentId));
    const menu: MenuItemType[] = parentNodes.map((parent) => {
      const children: NavLinkType[] = childNodes
        .filter((child) => child.parentId === parent.id)
        .map((child) => ({
          label: child.label,
          href:
            child.path && child.path !== "#"
              ? child.path
              : child.url && child.url !== "#"
                ? child.url
                : "#",
        }));
      const isDropdown = children.length > 0;
      return {
        id: parent.id,
        label: parent.label,
        href:
          parent.path && parent.path !== "#"
            ? parent.path
            : parent.url && parent.url !== "#"
              ? parent.url
              : "#",
        type: isDropdown ? "dropdown" : "link",
        children: isDropdown ? children : undefined,
      };
    });
    if (!header) {
      return {
        ...staticHeaderData,
        menu,
      };
    }
    return {
      phone: header.hphone || staticHeaderData.phone,
      email: header.hemail || staticHeaderData.email,
      address: header.haddress || staticHeaderData.address,
      logo: {
        sourceUrl:
          header.hlogo?.node?.sourceUrl ||
          staticHeaderData.logo.sourceUrl,
        altText:
          header.hlogo?.node?.altText ||
          staticHeaderData.logo.altText,
      },
      menu,
    };
  } catch (error) {
    console.error("Error fetching header data:", error);
    return staticHeaderData;
  }
}