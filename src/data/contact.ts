import { fetchGraphQL } from "@/lib/graphql";
import { SeoType } from "./page";
export const contactData = {
  badge: {
    image: '/images/badge.png',
    alt: 'Always on the right path'
  },
  contactInfo: {
    title: 'Contact Us',
    description:
      "If you have questions, concerns, or would like to schedule an appointment, you can call us at (604) 326-0459. You can also email us at info@ziaeedenture.ca or fill out the form below. We at Ziaee Denture Clinic value our client's opinions.",
    address: '2677 Kingsway, Vancouver, BC',
    phone: '(604) 326-0459',
    email: 'info@ziaeedentureclinic.ca'
  },
  formTextData: {
    tagline: '{ APPOINTMENT REQUEST }',
    title: 'Request an assessment',
    description: 'Send us a quick message and we’ll contact you about appointment availability, denture services, or CDCP coverage.',
    privacyText:
      'By submitting this form, you agree to our Privacy Policy and consent to be contacted by Ziaee Denture Clinic regarding your request.'
  },
  reviews: [
    {
      quote:
        'From consultation to final fitting, the experience was exceptional. I highly recommend this clinic to anyone looking for high-quality denture care.',
      author: 'David L.'
    },
    {
      quote:
        'The team provided outstanding care throughout the entire process. The fit, comfort, and quality exceeded my expectations from start to finish.',
      author: 'Sarah M.'
    },
    {
      quote:
        'Every visit was professional and welcoming. I am extremely pleased with the results and would confidently recommend this clinic to others.',
      author: 'Robert K.'
    }
  ],
  map: {
    title: 'Visit Us',
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2604.9900316489975!2d-123.05063159999999!3d49.238678199999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548676a291640277%3A0x39b67c7c367001a5!2s2677%20Kingsway%2C%20Vancouver%2C%20BC%20V5R%205H4%2C%20Canada!5e0!3m2!1sen!2sin!4v1782909589059!5m2!1sen!2sin'
  }
};

const GET_CONTACT_PAGE = `
query GetContactPage($uri: ID!) {
  page(id: $uri, idType: URI) {
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
    contactPage {
      contactTitle
      contactDescription
      contactAddress
      contactPhone
      contactEmail

      formTagline
      formTitle
      formDescription
      privacyText

      mapTitle
      mapEmbedUrl
    }
  }
}
`;

export async function getContactPage() {
  try {
    const data = await fetchGraphQL(GET_CONTACT_PAGE, {
      uri: "contact-us",
    });

    return {
      ...(data?.page?.contactPage ?? {}),
      seo: (data?.page?.seo ?? null) as SeoType | null,
    };
  } catch (error) {
    console.error(
      "Contact Page GraphQL Error:",
      error
    );

    return null;
  }
}