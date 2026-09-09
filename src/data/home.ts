import { fetchGraphQL } from "@/lib/graphql";

/* =========================================================
 GRAPHQL QUERY
========================================================= */

const HOME_PAGE_QUERY = `
query HomePageData {
  page(id: "home", idType: URI) {

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
    homePage {

      # Banner
       bannerHighlight
      bannerTitle
      bannerDescription
      bannerButtonLink

      bannerImage {
        node {
          sourceUrl
          altText
        }
      }

     

      # Coverage
      coverageSubtitle
      coverageTitleHighlight
      coverageTitleText
      coverageDescription
      coverageButtonLabel
      coverageButtonLink
      coverageDisclaimer

      coverageBackgroundImage {
        node {
          sourceUrl
        }
      }

      coverageCards {
        eyebrow
        title
        description

        image {
          node {
            sourceUrl
            altText
          }
        }
      }

      # Services
      servicesTagline
      servicesTitleHighlight
      servicesTitleText
      servicesDescription
      servicesButtonText
      servicesButtonLink

      servicesCards {
        label
        title
        description
        href

        image {
          node {
            sourceUrl
            altText
          }
        }
      }

      # Technology
      technologyTagline
      technologyTitleHighlight
      technologyTitleText
      technologyDescription
      technologyButtonText
      technologyButtonLink

      technologyCards {
        eyebrow
        title
        description
        note

        image {
          node {
            sourceUrl
            altText
          }
        }
      }

      # Process
      processTagline
      processTitleHighlight
      processTitleText
      processDescription

      processSteps {
        number
        eyebrow
        title
        description

        image {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
}
`;

export const homeBannerData = {
  highlight: "BRINGING",
  title: "LIGHT TO EVERY SMILE",
  description:
    "Ziaee Denture Clinic provides personalized denture care in a calm, modern setting. From new dentures to adjustments, relines, and repairs, we help patients feel comfortable, informed, and confident at every step.",

  buttonText: "Request an Assessment",
  buttonHref: "/contact-us",

  mainImage: "/images/banner.jpg",
  mainImageAlt: "Denture Clinic Banner",

  badgeImage: "/images/badge.png",

  serviceCard: {
    category: "{ Custom Fit }",
    title: "Complete Dentures",
    description:
      "Custom dentures designed to restore comfort, function, and confidence.",
    href: "/services/complete-dentures",
  },
};

export const coverageData = {
  subtitle: "CDCP COVERAGE",

  title: {
    highlight: "CDCP",
    text: "PATIENTS WELCOME",
  },

  description:
    "Ziaee Denture Clinic welcomes eligible Canadian Dental Care Plan patients. Our team can help you understand your coverage, treatment options, and next steps before your appointment.",

  backgroundImage: "/images/coverage-bg.jpg",

  button: {
    label: "Learn About CDCP Coverage",
    href: "/cdcp-coverage",
  },

  disclaimer:
    "Coverage depends on eligibility and approved treatment. Contact the clinic for details.",

  cards: [
    {
      eyebrow: "Eligibility",
      title: "Know What to Prepare",
      description:
        "Bring your CDCP details and any coverage information you have.",
      image: "/images/card-1.png",
    },
    {
      eyebrow: "Treatment Options",
      title: "Care That Fits Your Needs",
      description:
        "From new dentures to adjustments and repairs.",
      image: "/images/card-2.png",
    },
    {
      eyebrow: "Cost Clarity",
      title: "Clear Before Treatment",
      description:
        "We explain coverage and costs before treatment.",
      image: "/images/card-3.png",
    },
    {
      eyebrow: "Next Steps",
      title: "Request an Assessment",
      description:
        "Contact us about appointments and CDCP questions.",
      image: "/images/card-4.png",
    },
  ],
};

export const servicesData = {
  tagline: "OUR SERVICES",

  title: {
    highlight: "DENTURE",
    text: "SERVICES MADE CLEAR",
  },

  description:
    "From new dentures to adjustments and repairs, Ziaee Denture Clinic helps patients find comfortable, personalized solutions.",

  buttonText: "View All Services",

  buttonLink: "/services",

  services: [
    {
      label: "FULL SMILE CARE",
      title: "Complete Dentures",
      description:
        "Custom full dentures designed to restore comfort, function, and confidence.",
      image: "/images/services/complete-dentures.jpg",
      href: "/services/complete-dentures",
    },
    {
      label: "PARTIAL REPLACEMENT",
      title: "Partial Dentures",
      description:
        "A practical option for replacing missing teeth.",
      image: "/images/services/partial-dentures.jpg",
      href: "/services/partial-dentures",
    },
    {
      label: "SECURE SUPPORT",
      title: "Implant-Supported Dentures",
      description:
        "Implant-retained dentures that provide enhanced stability.",
      image: "/images/services/implant-supported-dentures.jpg",
      href: "/services/implant-supported-dentures",
    },
    {
      label: "BETTER FIT",
      title: "Relines",
      description:
        "Restore the fit of your dentures over time.",
      image: "/images/services/relines.jpg",
      href: "/services/relines",
    },
    {
      label: "DENTURE RESTORATION",
      title: "Rebase",
      description:
        "Replace the denture base while preserving existing teeth.",
      image: "/images/services/rebase.jpg",
      href: "/services/rebase",
    },
    {
      label: "QUICK REPAIR",
      title: "Denture Repairs",
      description:
        "Fast, reliable denture repairs.",
      image: "/images/services/denture-repairs.jpg",
      href: "/services/denture-repairs",
    },
    {
      label: "COMFORT CARE",
      title: "Adjustments",
      description:
        "Improve comfort and fit.",
      image: "/images/services/adjustments.jpg",
      href: "/services/adjustments",
    },
    {
      label: "NIGHT PROTECTION",
      title: "Night Guard",
      description:
        "Custom night guards for teeth grinding.",
      image: "/images/services/night-guard.jpg",
      href: "/services/night-guard",
    },
    {
      label: "SPORTS PROTECTION",
      title: "Sports Mouthguard",
      description:
        "Custom-fitted sports mouthguards.",
      image: "/images/services/sports-mouthguard.jpg",
      href: "/services/sports-mouthguard",
    },
    {
      label: "DIGITAL PRECISION",
      title: "Digital Dentures",
      description:
        "Advanced digital denture solutions.",
      image: "/images/services/digital-dentures.jpg",
      href: "/services/digital-dentures",
    },
  ],
};

export const technologyData = {
  tagline: "TECHNOLOGY",

  title: {
    highlight: "MODERN",
    text: "technology, personal care",
  },

  description:
    "Ziaee Denture Clinic uses modern denture technology to support accurate planning, a smoother patient experience, and a more comfortable final fit.",

  buttonText: "Request an Assessment",

  buttonLink: "/contact",

  cards: [
    {
      eyebrow: "DIGITAL SCANNING",
      title: "3D scanning and denture design",
      image: "/images/scanning-and-denture.png",
      description:
        "Digital scanning helps capture detailed information with comfort and accuracy.",

      note:
        "Treatment methods may vary and are recommended after assessment.",
    },

    {
      eyebrow: "DIGITAL DESIGN",
      title: "Digital Denture Workflow",
      image: "/images/scanning-and-denture-2.png",
      description:
        "Advanced digital planning provides greater precision and predictable results.",

      note:
        "Technology is selected according to individual patient needs.",
    },
  ],
};

export const processData = {
  tagline: "WHAT TO EXPECT",

  title: {
    highlight: "A clearer path",
    text: "to comfortable dentures",
  },

  description:
    "Our process keeps denture treatment simple, comfortable and easy to understand from consultation to follow-up care.",

  steps: [
    {
      number: "01",
      eyebrow: "FIRST VISIT",
      title: "Consultation",
      image: "/images/Consultation.jpg",
      description:
        "We discuss your denture history, concerns and treatment goals.",
    },

    {
      number: "02",
      eyebrow: "FIT REVIEW",
      title: "Assessment",
      image: "/images/Assessment.jpg",
      description:
        "We carefully assess your bite, fit and oral condition.",
    },

    {
      number: "03",
      eyebrow: "CLEAR OPTIONS",
      title: "Treatment Plan",
      image: "/images/Treatment-Plan.jpg",
      description:
        "We explain treatment options, timelines and expected outcomes.",
    },

    {
      number: "04",
      eyebrow: "COMFORT REFINEMENT",
      title: "Fitting & Adjustments",
      image: "/images/Fitting-Adjustments.jpg",
      description:
        "Your dentures are fitted and adjusted for maximum comfort.",
    },

    {
      number: "05",
      eyebrow: "FOLLOW-UP CARE",
      title: "Ongoing Support",
      image: "/images/Ongoing-Support.jpg",
      description:
        "We continue supporting you with adjustments, repairs and follow-up visits.",
    },
  ],
};

export const careGuidesData = {
  tagline: "Designed for comfort. Built on care.",

  title: {
    text: "Care Guides & Clinic",
    highlight: "Updates",
  },

  description:
    "Simple articles and updates to help you understand denture care and long-term comfort.",

  buttonText: "Read More Articles",

  buttonLink: "/blog",

  cards: [
    {
      id: 1,
      tagline: "FIRST VISIT GUIDE",
      title: "What to Expect at Your First Denture Appointment",
      description:
        "A simple guide explaining your first visit and treatment process.",
      date: "June 10, 2026",
      readTime: "4 min read",
      image: "/images/care-guide-img-1.png",
      link: "/",
    },

    {
      id: 2,
      tagline: "CDCP COVERAGE",
      title: "Understanding CDCP Coverage",
      description:
        "Everything eligible patients should know before booking.",
      date: "June 3, 2026",
      readTime: "5 min read",
      image: "/images/care-guide-img-2.png",
      link: "/",
    },

    {
      id: 3,
      tagline: "FIT & COMFORT",
      title: "Signs Your Dentures Need Adjustment",
      description:
        "Recognize common signs that your dentures require adjustment.",
      date: "June 3, 2026",
      readTime: "5 min read",
      image: "/images/care-guide-img-3.png",
      link: "/",
    },
  ],
};

/* =========================================================
   FETCH HOMEPAGE DATA (ONE GRAPHQL REQUEST)
========================================================= */

export async function getHomePageData() {
  try {
    const data = await fetchGraphQL(HOME_PAGE_QUERY);

    const home = data?.page?.homePage;

    if (!home) {
      return {
        banner: homeBannerData,
        coverage: coverageData,
        services: servicesData,
        technology: technologyData,
        process: processData,
        careGuides: careGuidesData,
      };
    }

    return {

      /* =========================================================
         Banner
      ========================================================= */

      banner: {
        highlight:
          home.bannerHighlight || homeBannerData.highlight,

        title:
          home.bannerTitle || homeBannerData.title,

        description:
          home.bannerDescription ||
          homeBannerData.description,

        buttonText:
          home.bannerButtonText ||
          homeBannerData.buttonText,

        buttonHref:
          home.bannerButtonLink ||
          homeBannerData.buttonHref,

        mainImage:
          home.bannerImage?.node?.sourceUrl ||
          homeBannerData.mainImage,

        mainImageAlt:
          home.bannerImage?.node?.altText ||
          homeBannerData.mainImageAlt,

        badgeImage:
          home.badgeImage?.node?.sourceUrl ||
          homeBannerData.badgeImage,

        serviceCard: {
          category:
            home.serviceCard?.category ||
            homeBannerData.serviceCard.category,

          title:
            home.serviceCard?.title ||
            homeBannerData.serviceCard.title,

          description:
            home.serviceCard?.description ||
            homeBannerData.serviceCard.description,

          href:
            home.serviceCard?.href ||
            homeBannerData.serviceCard.href,
        },
      },

      /* =========================================================
         Coverage
      ========================================================= */

      coverage: {
        subtitle:
          home.coverageSubtitle ||
          coverageData.subtitle,

        title: {
          highlight:
            home.coverageTitleHighlight ||
            coverageData.title.highlight,

          text:
            home.coverageTitleText ||
            coverageData.title.text,
        },

        description:
          home.coverageDescription ||
          coverageData.description,

        backgroundImage:
          home.coverageBackgroundImage?.node?.sourceUrl ||
          coverageData.backgroundImage,

        button: {
          label:
            home.coverageButtonLabel ||
            coverageData.button.label,

          href:
            home.coverageButtonLink ||
            coverageData.button.href,
        },

        disclaimer:
          home.coverageDisclaimer ||
          coverageData.disclaimer,

        cards:
          home.coverageCards?.length
            ? home.coverageCards.map((card: any) => ({
                eyebrow: card.eyebrow,
                title: card.title,
                description: card.description,
                image:
                  card.image?.node?.sourceUrl,
              }))
            : coverageData.cards,
      },

      /* =========================================================
         Services
      ========================================================= */

      services: {
        tagline:
          home.servicesTagline ||
          servicesData.tagline,

        title: {
          highlight:
            home.servicesTitleHighlight ||
            servicesData.title.highlight,

          text:
            home.servicesTitleText ||
            servicesData.title.text,
        },

        description:
          home.servicesDescription ||
          servicesData.description,

        buttonText:
          home.servicesButtonText ||
          servicesData.buttonText,

        buttonLink:
          home.servicesButtonLink ||
          servicesData.buttonLink,

        services:
          home.servicesCards?.length
            ? home.servicesCards.map((item: any) => ({
                label: item.label,
                title: item.title,
                description: item.description,
                href: item.href,
                image:
                  item.image?.node?.sourceUrl,
              }))
            : servicesData.services,
      },

     
     /* =========================================================
         Technology
      ========================================================= */

      technology: {
        tagline:
          home.technologyTagline ||
          technologyData.tagline,

        title: {
          highlight:
            home.technologyTitleHighlight ||
            technologyData.title.highlight,

          text:
            home.technologyTitleText ||
            technologyData.title.text,
        },

        description:
          home.technologyDescription ||
          technologyData.description,

        buttonText:
          home.technologyButtonText ||
          technologyData.buttonText,

        buttonLink:
          home.technologyButtonLink ||
          technologyData.buttonLink,

        cards:
          home.technologyCards?.length
            ? home.technologyCards.map((card: any) => ({
                eyebrow: card.eyebrow,
                title: card.title,
                description: card.description,
                note: card.note,
                image:
                  card.image?.node?.sourceUrl ||
                  "/images/default-technology.jpg",
              }))
            : technologyData.cards,
      },

      /* =========================================================
         Process
      ========================================================= */

      process: {
        tagline:
          home.processTagline ||
          processData.tagline,

        title: {
          highlight:
            home.processTitleHighlight ||
            processData.title.highlight,

          text:
            home.processTitleText ||
            processData.title.text,
        },

        description:
          home.processDescription ||
          processData.description,

        steps:
          home.processSteps?.length
            ? home.processSteps.map((step: any) => ({
                number: step.number,
                eyebrow: step.eyebrow,
                title: step.title,
                description: step.description,
                image:
                  step.image?.node?.sourceUrl ||
                  "/images/default-process.jpg",
              }))
            : processData.steps,
      },
  /* =========================================================
         Care Guides
         
      ========================================================= */

      careGuides: careGuidesData,
      
    };
  } catch (error) {
    console.error("Home Page GraphQL Error:", error);

    return {
      banner: homeBannerData,
      coverage: coverageData,
      services: servicesData,
      technology: technologyData,
      process: processData,
      careGuides: careGuidesData,
    };
  }
}

const GET_HOME = `
  query GetHomePage {
    page(id: "home", idType: URI) {
title
      slug

      # ==========================================
      # YOAST SEO
      # ==========================================

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
      faqSection {
        faqCategory {
          nodes {
            databaseId
          }
        }
      }

     
    }
  }
`;

export async function getHomePage() {
  try {
    const data = await fetchGraphQL(GET_HOME);

    return data?.page || null;
  } catch (error) {
    console.error('Home SEO GraphQL Error:', error);

    return null;
  }
}