import { fetchGraphQL } from '@/lib/graphql';

export const staticFooterData = {
 newsletter: {
    title: 'Bringing light to every smile*',
    description: 'Sign up to receive health tips.',
    placeholder: 'Email address',
    buttonText: 'Submit',
    privacyText:
      'By subscribing, you agree to our <strong>Privacy Policy</strong> and consent to receive updates from <strong>Ziaee Denture Clinic</strong>.'
  },

  contact: {
    title: 'CONTACT',
    phone: '604-326-0459',
    email: 'info@ziaeedenture.ca',
    address: '2677 Kingsway, Vancouver, BC',

    hours: [
      {
        day: 'Mon – Fri',
        time: '9:00 AM – 5:00 PM',
      },
      {
        day: 'Saturday',
        time: 'By appointment',
      },
    ],
  },

  socials: [
    {
      icon: 'instagram',
      href: '#',
      label: 'Instagram',
    },
    {
      icon: 'facebook',
      href: '#',
      label: 'Facebook',
    },
    {
      icon: 'linkedin',
      href: '#',
      label: 'LinkedIn',
    },
    {
      icon: 'location',
      href: 'https://maps.app.goo.gl/JsTGDxQSQb48TLcE9',
      label: 'Location',
    },
  ],

  services: {
    title: 'SERVICES',
    links: [] as {
      label: string;
      href: string;
    }[],
  },

  support: {
    title: 'SUPPORT',
    links: [] as {
      label: string;
      href: string;
    }[],
  },

  bottom: {
    logo: 'ZIAEE',
    copyright: '© 2026 Ziaee Denture Clinic',
    credit: 'Designed & Developed by Nirvana Canada',
  },
};

const GET_FOOTER = `
  query Footer {
    themeSettings {
      headerFooterSections {
        fcontactTitle
        fphone
        femail
        faddress

        fhours {
          fday
          ftime
        }

        finstagram
        ffacebook
        flinkedin
        flocation

        fcopyright
        fcredit
        ffooterLogo
      }
    }

    serviceMenu: menu(
      id: "Service Menu"
      idType: NAME
    ) {
      name
      menuItems(first: 50) {
        nodes {
          id
          label
          url
          parentId
        }
      }
    }

    supportMenu: menu(
      id: "Support Menu"
      idType: NAME
    ) {
      name
      menuItems(first: 50) {
        nodes {
          id
          label
          url
          parentId
        }
      }
    }
  }
`;

type MenuItem = {
  id?: string;
  label?: string;
  url?: string;
  parentId?: string | null;
};

function formatMenuItems(items: MenuItem[] = []) {
  return items
    .filter((item) => !item.parentId)
    .map((item) => ({
      label: item.label || '',
      href: item.url || '#',
    }))
    .filter((item) => item.label && item.href);
}

export async function getFooterData() {
  try {
    const data = await fetchGraphQL(GET_FOOTER);

    const footer =
      data?.themeSettings?.headerFooterSections;

    const serviceMenuItems: MenuItem[] =
      data?.serviceMenu?.menuItems?.nodes ?? [];

    const supportMenuItems: MenuItem[] =
      data?.supportMenu?.menuItems?.nodes ?? [];

    return {
      newsletter: staticFooterData.newsletter,

      contact: {
        title:
          footer?.fcontactTitle ||
          staticFooterData.contact.title,

        phone:
          footer?.fphone ||
          staticFooterData.contact.phone,

        email:
          footer?.femail ||
          staticFooterData.contact.email,

        address:
          footer?.faddress ||
          staticFooterData.contact.address,

        hours:
          Array.isArray(footer?.fhours) &&
          footer.fhours.length > 0
            ? footer.fhours.map((item: any) => ({
                day: item?.fday || '',
                time: item?.ftime || '',
              }))
            : staticFooterData.contact.hours,
      },

      socials: [
        {
          icon: 'instagram',
          href:
            footer?.finstagram ||
            staticFooterData.socials[0].href,
          label: 'Instagram',
        },

        {
          icon: 'facebook',
          href:
            footer?.ffacebook ||
            staticFooterData.socials[1].href,
          label: 'Facebook',
        },

        {
          icon: 'linkedin',
          href:
            footer?.flinkedin ||
            staticFooterData.socials[2].href,
          label: 'LinkedIn',
        },

        {
          icon: 'location',
          href:
            footer?.flocation ||
            staticFooterData.socials[3].href,
          label: 'Location',
        },
      ],

      services: {
        title: 'SERVICES',
        links:
          serviceMenuItems.length > 0
            ? formatMenuItems(serviceMenuItems)
            : staticFooterData.services.links,
      },

      support: {
        title: 'SUPPORT',
        links:
          supportMenuItems.length > 0
            ? formatMenuItems(supportMenuItems)
            : staticFooterData.support.links,
      },

      bottom: {
        logo:
          footer?.ffooterLogo ||
          staticFooterData.bottom.logo,

        copyright:
          footer?.fcopyright ||
          staticFooterData.bottom.copyright,

        credit:
          footer?.fcredit ||
          staticFooterData.bottom.credit,
      },
    };
  } catch (error) {
    console.error(
      'Footer GraphQL Error:',
      error
    );

    return staticFooterData;
  }
}