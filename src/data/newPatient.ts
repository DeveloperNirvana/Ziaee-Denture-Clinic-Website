import { fetchGraphQL } from '@/lib/graphql';
import { NewPatientData } from '@/components/common/newPatient';
import { SeoType } from './page';
export const hero = {
  badge: {
    image: '/images/badge.png',
    alt: 'Always on the right path'
  },
  image: '/images/health-smile-person-professional.jpg',
  imgAlt: 'New Patients',
  title: {
    highlight: 'New Patients',
    text: 'come to see us at Ziaee Denture Clinic.'
  },
  button: {
    label: 'Request an Appointment',
    href: '/contact-us'
  }
};
export const experience = {
  title: {
    highlight: 'New patients',
    text: 'Experience'
  },
  content: `
      <p>Complete your patient forms online before your appointment for a faster check-in and a personalized care plan ready when you arrive.
      </p>
    `
};
export const newPatientform: NewPatientData = {
  backgroundImage: '/images/clinic.jpg',
  title: {
    highlight: 'COMPLETE',
    text: 'NEW PATIENT FORM'
  },
  description: 'For more information, please call us now or fill out the form below.',
  button: {
    label: 'Submit'
  },
  fields: [
    {
      name: 'fullName',
      placeholder: 'Full name',
      type: 'text'
    },
    {
      name: 'phone',
      placeholder: 'Phone number',
      type: 'tel'
    },
    {
      name: 'email',
      placeholder: 'you@email.com',
      type: 'email',
      fullWidth: true
    },
    {
      name: 'address',
      placeholder: 'Address',
      type: 'text',
      fullWidth: true
    },
    {
      name: 'city',
      placeholder: 'City',
      type: 'text'
    },
    {
      name: 'postalCode',
      placeholder: 'Postal code',
      type: 'text'
    },
    {
      name: 'message',
      placeholder: 'Type your message here',
      type: 'textarea'
    }
  ]
};

export const GET_NEW_PATIENT_PAGE = `
  query GetNewPatientPage {
    page(id: "new-patients", idType: URI) {
    title
      slug
      uri

      seo {
        title
        metaDesc
        canonical

        opengraphTitle
        opengraphDescription
        opengraphType
        opengraphSiteName
        opengraphUrl

        opengraphPublishedTime
        opengraphModifiedTime

        opengraphImage {
          sourceUrl
          altText

          mediaDetails {
            width
            height
          }
        }

        twitterTitle
        twitterDescription

        twitterImage {
          sourceUrl
          altText

          mediaDetails {
            width
            height
          }
        }
      }
      newPatientPage {
        hero {
          image {
            node {
              sourceUrl
              altText
            }
          }
          titleHighlight
          title
          buttonLabel
          buttonLink
        }

        experience {
          titleHighlight
          title
          content
        }
      }
    }
  }
`;

export interface NewPatientPageData {
  title: string;
  slug: string;
  seo: SeoType | null;
  hero: {
    image: string;
    imgAlt: string;
    title: {
      highlight: string;
      text: string;
    };
    button: {
      label: string;
      href: string;
    };
  };

  experience: {
    title: {
      highlight: string;
      text: string;
    };
    content: string;
  };
}

export async function getNewPatientPage(): Promise<
  NewPatientPageData | null
> {
  try {
    const data = await fetchGraphQL(
      GET_NEW_PATIENT_PAGE
    );

    const page = data?.page;

    const newPatientPage =
      page?.newPatientPage;

    if (!newPatientPage) {
      return null;
    }

    return {
      title: page?.title ?? '',
      slug: page?.slug ?? '',

      seo: page?.seo ?? null,

      hero: {
        image:
          newPatientPage.hero?.image?.node
            ?.sourceUrl ?? '',

        imgAlt:
          newPatientPage.hero?.image?.node
            ?.altText ?? '',

        title: {
          highlight:
            newPatientPage.hero?.titleHighlight ??
            '',

          text:
            newPatientPage.hero?.title ??
            '',
        },

        button: {
          label:
            newPatientPage.hero?.buttonLabel ??
            '',

          href:
            newPatientPage.hero?.buttonLink ??
            '',
        },
      },

      experience: {
        title: {
          highlight:
            newPatientPage.experience
              ?.titleHighlight ?? '',

          text:
            newPatientPage.experience
              ?.title ?? '',
        },

        content:
          newPatientPage.experience
            ?.content ?? '',
      },
    };
  } catch (error) {
    console.error(
      'New Patient Page GraphQL Error:',
      error
    );

    return null;
  }
}