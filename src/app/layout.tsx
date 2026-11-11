
import type { Metadata } from "next";
import { Google_Sans_Flex } from "next/font/google";
import Script from "next/script";
import { headers } from "next/headers";

import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { getHeaderData } from "@/data/header";
import { getFooterData } from "@/data/footer";
import { getPageSchema } from "@/data/schema";

import "./globals.css";

const googleSansFlex = Google_Sans_Flex({
  variable: "--font-google-sans-flex",
  adjustFontFallback: false,
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ziaee Denture",
  description:
    "Ziaee Denture Modern denture care designed around comfort, clarity, and confidence.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
};

function getPageName(slug: string) {
  if (slug === "home") return "Home";

  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();

  const pathname = headerList.get("x-current-path") || "/";

  const cleanPath = pathname.replace(/\/+$/, "") || "/";

  const slug =
    cleanPath === "/"
      ? "home"
      : cleanPath.split("/").filter(Boolean).pop() || "home";

  const pageName = getPageName(slug);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://www.ziaeedentureclinic.ca";

  const currentUrl = `${siteUrl.replace(/\/+$/, "")}${cleanPath === "/" ? "/" : cleanPath + "/"}`;

  const [headerData, footerData, schemaCode] = await Promise.all([
    getHeaderData(),
    getFooterData(),
    getPageSchema(cleanPath),
  ]);

  let safeSchema: string | null = null;

  if (schemaCode) {
    try {
      // Validate the JSON before adding it to the page.
      JSON.parse(schemaCode);

      // Prevent HTML/script injection through a closing script tag.
      safeSchema = schemaCode.replace(/</g, "\\u003c");
    } catch (error) {
      console.error("Invalid schema JSON:", error);
    }
  }

  console.log("Current Path:", cleanPath);
  console.log("Current Slug:", slug);
  console.log("Current Page Name:", pageName);
  console.log("Current URL:", currentUrl);

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2QNSEVJYKB"
          strategy="beforeInteractive"
        />

        <Script id="google-analytics" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2QNSEVJYKB');
          `}
        </Script>

      {slug === "home" && (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "MedicalClinic",
            "@id": "https://www.ziaeedentureclinic.ca/#clinic",
            "name": "Ziaee Denture Clinic",
            "url": "https://www.ziaeedentureclinic.ca/",
            "telephone": "+1-604-326-0459",
            "description":
              "Denture clinic in Vancouver providing complete, partial and implant-supported dentures, maintenance services and custom dental appliances.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "2677 Kingsway",
              "addressLocality": "Vancouver",
              "addressRegion": "BC",
              "addressCountry": "CA"
            },
            "areaServed": {
              "@type": "City",
              "name": "Vancouver"
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "09:00",
                "closes": "17:00"
              }
            ]
          },
          {
            "@type": "WebSite",
            "@id": "https://www.ziaeedentureclinic.ca/#website",
            "url": "https://www.ziaeedentureclinic.ca/",
            "name": "Ziaee Denture Clinic",
            "publisher": {
              "@id": "https://www.ziaeedentureclinic.ca/#clinic"
            },
            "inLanguage": "en-CA"
          },
          {
            "@type": "WebPage",
            "@id": `https://www.ziaeedentureclinic.ca${pathname}#webpage`,
            "url": `https://www.ziaeedentureclinic.ca${pathname}`,
            "name": pageName,
            "description":
              "Denture care at 2677 Kingsway in Vancouver, British Columbia, with complete, partial and implant-supported dentures and ongoing denture maintenance services.",
            "inLanguage": "en-CA",
            "isPartOf": {
              "@id": "https://www.ziaeedentureclinic.ca/#website"
            },
            "about": {
              "@id": "https://www.ziaeedentureclinic.ca/#clinic"
            }
          }
        ]
      }).replace(/</g, "\\u003c")
    }}
  />
)}
{slug === "about-us" && (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "MedicalClinic",
            "@id": "https://www.ziaeedentureclinic.ca/#clinic",
            "name": "Ziaee Denture Clinic",
            "url": "https://www.ziaeedentureclinic.ca/",
            "telephone": "+1-604-326-0459",
            "description":
              "Denture clinic in Vancouver providing complete, partial and implant-supported dentures, maintenance services and custom dental appliances.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "2677 Kingsway",
              "addressLocality": "Vancouver",
              "addressRegion": "BC",
              "addressCountry": "CA"
            },
            "areaServed": {
              "@type": "City",
              "name": "Vancouver"
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "https://schema.org/Monday",
                  "https://schema.org/Tuesday",
                  "https://schema.org/Wednesday",
                  "https://schema.org/Thursday",
                  "https://schema.org/Friday"
                ],
                "opens": "09:00",
                "closes": "17:00"
              }
            ]
          },
          {
            "@type": "WebSite",
            "@id": "https://www.ziaeedentureclinic.ca/#website",
            "url": "https://www.ziaeedentureclinic.ca/",
            "name": "Ziaee Denture Clinic",
            "publisher": {
              "@id": "https://www.ziaeedentureclinic.ca/#clinic"
            },
            "inLanguage": "en-CA"
          },
          {
            "@type": "AboutPage",
            "@id": "https://www.ziaeedentureclinic.ca/about-us#webpage",
            "url": "https://www.ziaeedentureclinic.ca/about-us",
            "name": "About Ziaee Denture Clinic",
            "description":
              "The clinic's approach to denture care and its owner and licensed denturist, Mohammad Kabir Ziaee.",
            "inLanguage": "en-CA",
            "isPartOf": {
              "@id": "https://www.ziaeedentureclinic.ca/#website"
            },
            "about": [
              {
                "@id": "https://www.ziaeedentureclinic.ca/#clinic"
              },
              {
                "@id": "https://www.ziaeedentureclinic.ca/#denturist"
              }
            ]
          },
          {
            "@type": "Person",
            "@id": "https://www.ziaeedentureclinic.ca/#denturist",
            "name": "Mohammad Kabir Ziaee",
            "jobTitle": "Denturist",
            "worksFor": {
              "@id": "https://www.ziaeedentureclinic.ca/#clinic"
            },
            "knowsLanguage": [
              "English",
              "Farsi",
              "Pashto",
              "Hindi",
              "Punjabi",
              "Urdu"
            ]
          }
        ]
      }).replace(/</g, "\\u003c")
    }}
  />
)}
{slug === "services" && (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "MedicalClinic",
            "@id": "https://www.ziaeedentureclinic.ca/#clinic",
            "name": "Ziaee Denture Clinic",
            "url": "https://www.ziaeedentureclinic.ca/",
            "telephone": "+1-604-326-0459",
            "description":
              "Denture clinic in Vancouver providing complete, partial and implant-supported dentures, maintenance services and custom dental appliances.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "2677 Kingsway",
              "addressLocality": "Vancouver",
              "addressRegion": "BC",
              "addressCountry": "CA"
            },
            "areaServed": {
              "@type": "City",
              "name": "Vancouver"
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "https://schema.org/Monday",
                  "https://schema.org/Tuesday",
                  "https://schema.org/Wednesday",
                  "https://schema.org/Thursday",
                  "https://schema.org/Friday"
                ],
                "opens": "09:00",
                "closes": "17:00"
              }
            ]
          },
          {
            "@type": "WebSite",
            "@id": "https://www.ziaeedentureclinic.ca/#website",
            "url": "https://www.ziaeedentureclinic.ca/",
            "name": "Ziaee Denture Clinic",
            "publisher": {
              "@id": "https://www.ziaeedentureclinic.ca/#clinic"
            },
            "inLanguage": "en-CA"
          },
          {
            "@type": "CollectionPage",
            "@id": "https://www.ziaeedentureclinic.ca/services#webpage",
            "url": "https://www.ziaeedentureclinic.ca/services",
            "name": "Denture Services",
            "description":
              "An overview of the clinic's ten denture and dental-appliance service categories.",
            "inLanguage": "en-CA",
            "isPartOf": {
              "@id": "https://www.ziaeedentureclinic.ca/#website"
            },
            "about": {
              "@id": "https://www.ziaeedentureclinic.ca/#clinic"
            }
          }
        ]
      }).replace(/</g, "\\u003c")
    }}
  />
)}
{slug === "new-patients" && (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "MedicalClinic",
            "@id": "https://www.ziaeedentureclinic.ca/#clinic",
            "name": "Ziaee Denture Clinic",
            "url": "https://www.ziaeedentureclinic.ca/",
            "telephone": "+1-604-326-0459",
            "description":
              "Denture clinic in Vancouver providing complete, partial and implant-supported dentures, maintenance services and custom dental appliances.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "2677 Kingsway",
              "addressLocality": "Vancouver",
              "addressRegion": "BC",
              "addressCountry": "CA"
            },
            "areaServed": {
              "@type": "City",
              "name": "Vancouver"
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "https://schema.org/Monday",
                  "https://schema.org/Tuesday",
                  "https://schema.org/Wednesday",
                  "https://schema.org/Thursday",
                  "https://schema.org/Friday"
                ],
                "opens": "09:00",
                "closes": "17:00"
              }
            ]
          },
          {
            "@type": "WebSite",
            "@id": "https://www.ziaeedentureclinic.ca/#website",
            "url": "https://www.ziaeedentureclinic.ca/",
            "name": "Ziaee Denture Clinic",
            "publisher": {
              "@id": "https://www.ziaeedentureclinic.ca/#clinic"
            },
            "inLanguage": "en-CA"
          },
          {
            "@type": "WebPage",
            "@id": "https://www.ziaeedentureclinic.ca/new-patients#webpage",
            "url": "https://www.ziaeedentureclinic.ca/new-patients",
            "name": "New Patient Information",
            "description":
              "Initial appointment enquiries and the clinic's new-patient form pathway.",
            "inLanguage": "en-CA",
            "isPartOf": {
              "@id": "https://www.ziaeedentureclinic.ca/#website"
            },
            "about": {
              "@id": "https://www.ziaeedentureclinic.ca/#clinic"
            }
          }
        ]
      }).replace(/</g, "\\u003c")
    }}
  />
)}
{slug === "contact-us" && (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "MedicalClinic",
            "@id": "https://www.ziaeedentureclinic.ca/#clinic",
            "name": "Ziaee Denture Clinic",
            "url": "https://www.ziaeedentureclinic.ca/",
            "telephone": "+1-604-326-0459",
            "description":
              "Denture clinic in Vancouver providing complete, partial and implant-supported dentures, maintenance services and custom dental appliances.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "2677 Kingsway",
              "addressLocality": "Vancouver",
              "addressRegion": "BC",
              "addressCountry": "CA"
            },
            "areaServed": {
              "@type": "City",
              "name": "Vancouver"
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "https://schema.org/Monday",
                  "https://schema.org/Tuesday",
                  "https://schema.org/Wednesday",
                  "https://schema.org/Thursday",
                  "https://schema.org/Friday"
                ],
                "opens": "09:00",
                "closes": "17:00"
              }
            ]
          },
          {
            "@type": "WebSite",
            "@id": "https://www.ziaeedentureclinic.ca/#website",
            "url": "https://www.ziaeedentureclinic.ca/",
            "name": "Ziaee Denture Clinic",
            "publisher": {
              "@id": "https://www.ziaeedentureclinic.ca/#clinic"
            },
            "inLanguage": "en-CA"
          },
          {
            "@type": "ContactPage",
            "@id": "https://www.ziaeedentureclinic.ca/contact-us#webpage",
            "url": "https://www.ziaeedentureclinic.ca/contact-us",
            "name": "Contact and Consultation Requests",
            "description":
              "Clinic address, telephone and consultation enquiry form for Ziaee Denture Clinic in Vancouver.",
            "inLanguage": "en-CA",
            "isPartOf": {
              "@id": "https://www.ziaeedentureclinic.ca/#website"
            },
            "about": {
              "@id": "https://www.ziaeedentureclinic.ca/#clinic"
            }
          }
        ]
      }).replace(/</g, "\\u003c")
    }}
  />
)}
{slug === "blog" && (
  <Script
    id="blog-schema"
    type="application/ld+json"
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "MedicalClinic",
            "@id": "https://www.ziaeedentureclinic.ca/#clinic",
            name: "Ziaee Denture Clinic",
            url: "https://www.ziaeedentureclinic.ca/",
            telephone: "+1-604-326-0459",
            description:
              "Denture clinic in Vancouver providing complete, partial and implant-supported dentures, maintenance services and custom dental appliances.",
            address: {
              "@type": "PostalAddress",
              streetAddress: "2677 Kingsway",
              addressLocality: "Vancouver",
              addressRegion: "BC",
              addressCountry: "CA",
            },
            areaServed: {
              "@type": "City",
              name: "Vancouver",
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "https://schema.org/Monday",
                  "https://schema.org/Tuesday",
                  "https://schema.org/Wednesday",
                  "https://schema.org/Thursday",
                  "https://schema.org/Friday",
                ],
                opens: "09:00",
                closes: "17:00",
              },
            ],
          },
          {
            "@type": "WebSite",
            "@id": "https://www.ziaeedentureclinic.ca/#website",
            url: "https://www.ziaeedentureclinic.ca/",
            name: "Ziaee Denture Clinic",
            publisher: {
              "@id": "https://www.ziaeedentureclinic.ca/#clinic",
            },
            inLanguage: "en-CA",
          },
          {
            "@type": "CollectionPage",
            "@id": "https://www.ziaeedentureclinic.ca/blog#webpage",
            url: "https://www.ziaeedentureclinic.ca/blog",
            name: "Denture Care Guides and Clinic Updates",
            description:
              "The website's index of denture-care articles and clinic updates.",
            inLanguage: "en-CA",
            isPartOf: {
              "@id": "https://www.ziaeedentureclinic.ca/#website",
            },
            about: {
              "@id": "https://www.ziaeedentureclinic.ca/#clinic",
            },
          },
        ],
      }),
    }}
  />
)}
{slug === "services/adjustments" && (
  <Script
    id="adjustments-schema"
    type="application/ld+json"
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "MedicalClinic",
            "@id": "https://www.ziaeedentureclinic.ca/#clinic",
            name: "Ziaee Denture Clinic",
            url: "https://www.ziaeedentureclinic.ca/",
            telephone: "+1-604-326-0459",
            description:
              "Denture clinic in Vancouver providing complete, partial and implant-supported dentures, maintenance services and custom dental appliances.",
            address: {
              "@type": "PostalAddress",
              streetAddress: "2677 Kingsway",
              addressLocality: "Vancouver",
              addressRegion: "BC",
              addressCountry: "CA",
            },
            areaServed: {
              "@type": "City",
              name: "Vancouver",
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "https://schema.org/Monday",
                  "https://schema.org/Tuesday",
                  "https://schema.org/Wednesday",
                  "https://schema.org/Thursday",
                  "https://schema.org/Friday",
                ],
                opens: "09:00",
                closes: "17:00",
              },
            ],
          },
          {
            "@type": "WebSite",
            "@id": "https://www.ziaeedentureclinic.ca/#website",
            url: "https://www.ziaeedentureclinic.ca/",
            name: "Ziaee Denture Clinic",
            publisher: {
              "@id": "https://www.ziaeedentureclinic.ca/#clinic",
            },
            inLanguage: "en-CA",
          },
          {
            "@type": "WebPage",
            "@id": "https://www.ziaeedentureclinic.ca/services/adjustments#webpage",
            url: "https://www.ziaeedentureclinic.ca/services/adjustments",
            name: "Denture Adjustments",
            description:
              "Assessment and adjustment of pressure points, bite and appliance fit for denture comfort.",
            inLanguage: "en-CA",
            isPartOf: {
              "@id": "https://www.ziaeedentureclinic.ca/#website",
            },
            mainEntity: {
              "@id": "https://www.ziaeedentureclinic.ca/services/adjustments#service",
            },
            breadcrumb: {
              "@id": "https://www.ziaeedentureclinic.ca/services/adjustments#breadcrumb",
            },
          },
          {
            "@type": "Service",
            "@id": "https://www.ziaeedentureclinic.ca/services/adjustments#service",
            name: "Denture Adjustments",
            serviceType: "Denture Adjustments",
            description:
              "Assessment and adjustment of pressure points, bite and appliance fit for denture comfort.",
            url: "https://www.ziaeedentureclinic.ca/services/adjustments",
            provider: {
              "@id": "https://www.ziaeedentureclinic.ca/#clinic",
            },
            areaServed: {
              "@type": "City",
              name: "Vancouver",
            },
          },
          {
            "@type": "BreadcrumbList",
            "@id": "https://www.ziaeedentureclinic.ca/services/adjustments#breadcrumb",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.ziaeedentureclinic.ca/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Services",
                item: "https://www.ziaeedentureclinic.ca/services",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Denture Adjustments",
                item: "https://www.ziaeedentureclinic.ca/services/adjustments",
              },
            ],
          },
        ],
      }),
    }}
  />
)}
{slug === "services/complete-dentures" && (
  <Script
    id="complete-dentures-schema"
    type="application/ld+json"
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "MedicalClinic",
            "@id": "https://www.ziaeedentureclinic.ca/#clinic",
            name: "Ziaee Denture Clinic",
            url: "https://www.ziaeedentureclinic.ca/",
            telephone: "+1-604-326-0459",
            description:
              "Denture clinic in Vancouver providing complete, partial and implant-supported dentures, maintenance services and custom dental appliances.",
            address: {
              "@type": "PostalAddress",
              streetAddress: "2677 Kingsway",
              addressLocality: "Vancouver",
              addressRegion: "BC",
              addressCountry: "CA",
            },
            areaServed: {
              "@type": "City",
              name: "Vancouver",
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "https://schema.org/Monday",
                  "https://schema.org/Tuesday",
                  "https://schema.org/Wednesday",
                  "https://schema.org/Thursday",
                  "https://schema.org/Friday",
                ],
                opens: "09:00",
                closes: "17:00",
              },
            ],
          },
          {
            "@type": "WebSite",
            "@id": "https://www.ziaeedentureclinic.ca/#website",
            url: "https://www.ziaeedentureclinic.ca/",
            name: "Ziaee Denture Clinic",
            publisher: {
              "@id": "https://www.ziaeedentureclinic.ca/#clinic",
            },
            inLanguage: "en-CA",
          },
          {
            "@type": "WebPage",
            "@id": "https://www.ziaeedentureclinic.ca/services/complete-dentures#webpage",
            url: "https://www.ziaeedentureclinic.ca/services/complete-dentures",
            name: "Complete Dentures",
            description:
              "Custom complete dentures to replace a full upper or lower arch of missing teeth.",
            inLanguage: "en-CA",
            isPartOf: {
              "@id": "https://www.ziaeedentureclinic.ca/#website",
            },
            mainEntity: {
              "@id": "https://www.ziaeedentureclinic.ca/services/complete-dentures#service",
            },
            breadcrumb: {
              "@id": "https://www.ziaeedentureclinic.ca/services/complete-dentures#breadcrumb",
            },
          },
          {
            "@type": "Service",
            "@id": "https://www.ziaeedentureclinic.ca/services/complete-dentures#service",
            name: "Complete Dentures",
            serviceType: "Complete Dentures",
            description:
              "Custom complete dentures to replace a full upper or lower arch of missing teeth.",
            url: "https://www.ziaeedentureclinic.ca/services/complete-dentures",
            provider: {
              "@id": "https://www.ziaeedentureclinic.ca/#clinic",
            },
            areaServed: {
              "@type": "City",
              name: "Vancouver",
            },
          },
          {
            "@type": "BreadcrumbList",
            "@id": "https://www.ziaeedentureclinic.ca/services/complete-dentures#breadcrumb",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.ziaeedentureclinic.ca/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Services",
                item: "https://www.ziaeedentureclinic.ca/services",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Complete Dentures",
                item: "https://www.ziaeedentureclinic.ca/services/complete-dentures",
              },
            ],
          },
        ],
      }),
    }}
  />
)}
{slug === "services/denture-repairs" && (
  <Script
    id="denture-repairs-schema"
    type="application/ld+json"
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "MedicalClinic",
            "@id": "https://www.ziaeedentureclinic.ca/#clinic",
            name: "Ziaee Denture Clinic",
            url: "https://www.ziaeedentureclinic.ca/",
            telephone: "+1-604-326-0459",
            description:
              "Denture clinic in Vancouver providing complete, partial and implant-supported dentures, maintenance services and custom dental appliances.",
            address: {
              "@type": "PostalAddress",
              streetAddress: "2677 Kingsway",
              addressLocality: "Vancouver",
              addressRegion: "BC",
              addressCountry: "CA",
            },
            areaServed: {
              "@type": "City",
              name: "Vancouver",
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "https://schema.org/Monday",
                  "https://schema.org/Tuesday",
                  "https://schema.org/Wednesday",
                  "https://schema.org/Thursday",
                  "https://schema.org/Friday",
                ],
                opens: "09:00",
                closes: "17:00",
              },
            ],
          },
          {
            "@type": "WebSite",
            "@id": "https://www.ziaeedentureclinic.ca/#website",
            url: "https://www.ziaeedentureclinic.ca/",
            name: "Ziaee Denture Clinic",
            publisher: {
              "@id": "https://www.ziaeedentureclinic.ca/#clinic",
            },
            inLanguage: "en-CA",
          },
          {
            "@type": "WebPage",
            "@id": "https://www.ziaeedentureclinic.ca/services/denture-repairs#webpage",
            url: "https://www.ziaeedentureclinic.ca/services/denture-repairs",
            name: "Denture Repairs",
            description:
              "Professional repair enquiries for damaged denture bases, teeth and clasps, including additions to suitable partial dentures.",
            inLanguage: "en-CA",
            isPartOf: {
              "@id": "https://www.ziaeedentureclinic.ca/#website",
            },
            mainEntity: {
              "@id": "https://www.ziaeedentureclinic.ca/services/denture-repairs#service",
            },
            breadcrumb: {
              "@id": "https://www.ziaeedentureclinic.ca/services/denture-repairs#breadcrumb",
            },
          },
          {
            "@type": "Service",
            "@id": "https://www.ziaeedentureclinic.ca/services/denture-repairs#service",
            name: "Denture Repairs",
            serviceType: "Denture Repairs",
            description:
              "Professional repair enquiries for damaged denture bases, teeth and clasps, including additions to suitable partial dentures.",
            url: "https://www.ziaeedentureclinic.ca/services/denture-repairs",
            provider: {
              "@id": "https://www.ziaeedentureclinic.ca/#clinic",
            },
            areaServed: {
              "@type": "City",
              name: "Vancouver",
            },
          },
          {
            "@type": "BreadcrumbList",
            "@id": "https://www.ziaeedentureclinic.ca/services/denture-repairs#breadcrumb",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.ziaeedentureclinic.ca/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Services",
                item: "https://www.ziaeedentureclinic.ca/services",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Denture Repairs",
                item: "https://www.ziaeedentureclinic.ca/services/denture-repairs",
              },
            ],
          },
        ],
      }),
    }}
  />
)}
{slug === "services/digital-dentures" && (
  <Script
    id="digital-dentures-schema"
    type="application/ld+json"
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "MedicalClinic",
            "@id": "https://www.ziaeedentureclinic.ca/#clinic",
            name: "Ziaee Denture Clinic",
            url: "https://www.ziaeedentureclinic.ca/",
            telephone: "+1-604-326-0459",
            description:
              "Denture clinic in Vancouver providing complete, partial and implant-supported dentures, maintenance services and custom dental appliances.",
            address: {
              "@type": "PostalAddress",
              streetAddress: "2677 Kingsway",
              addressLocality: "Vancouver",
              addressRegion: "BC",
              addressCountry: "CA",
            },
            areaServed: {
              "@type": "City",
              name: "Vancouver",
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "https://schema.org/Monday",
                  "https://schema.org/Tuesday",
                  "https://schema.org/Wednesday",
                  "https://schema.org/Thursday",
                  "https://schema.org/Friday",
                ],
                opens: "09:00",
                closes: "17:00",
              },
            ],
          },
          {
            "@type": "WebSite",
            "@id": "https://www.ziaeedentureclinic.ca/#website",
            url: "https://www.ziaeedentureclinic.ca/",
            name: "Ziaee Denture Clinic",
            publisher: {
              "@id": "https://www.ziaeedentureclinic.ca/#clinic",
            },
            inLanguage: "en-CA",
          },
          {
            "@type": "WebPage",
            "@id": "https://www.ziaeedentureclinic.ca/services/digital-dentures#webpage",
            url: "https://www.ziaeedentureclinic.ca/services/digital-dentures",
            name: "Digital Dentures",
            description:
              "Dentures designed using digital scanning and computerized design, with manufacturing methods described on the clinic's service page.",
            inLanguage: "en-CA",
            isPartOf: {
              "@id": "https://www.ziaeedentureclinic.ca/#website",
            },
            mainEntity: {
              "@id": "https://www.ziaeedentureclinic.ca/services/digital-dentures#service",
            },
            breadcrumb: {
              "@id": "https://www.ziaeedentureclinic.ca/services/digital-dentures#breadcrumb",
            },
          },
          {
            "@type": "Service",
            "@id": "https://www.ziaeedentureclinic.ca/services/digital-dentures#service",
            name: "Digital Dentures",
            serviceType: "Digital Dentures",
            description:
              "Dentures designed using digital scanning and computerized design, with manufacturing methods described on the clinic's service page.",
            url: "https://www.ziaeedentureclinic.ca/services/digital-dentures",
            provider: {
              "@id": "https://www.ziaeedentureclinic.ca/#clinic",
            },
            areaServed: {
              "@type": "City",
              name: "Vancouver",
            },
          },
          {
            "@type": "BreadcrumbList",
            "@id": "https://www.ziaeedentureclinic.ca/services/digital-dentures#breadcrumb",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.ziaeedentureclinic.ca/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Services",
                item: "https://www.ziaeedentureclinic.ca/services",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Digital Dentures",
                item: "https://www.ziaeedentureclinic.ca/services/digital-dentures",
              },
            ],
          },
        ],
      }),
    }}
  />
)}
{slug === "services/implant-supported-dentures" && (
  <Script
    id="implant-supported-dentures-schema"
    type="application/ld+json"
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "MedicalClinic",
            "@id": "https://www.ziaeedentureclinic.ca/#clinic",
            name: "Ziaee Denture Clinic",
            url: "https://www.ziaeedentureclinic.ca/",
            telephone: "+1-604-326-0459",
            description:
              "Denture clinic in Vancouver providing complete, partial and implant-supported dentures, maintenance services and custom dental appliances.",
            address: {
              "@type": "PostalAddress",
              streetAddress: "2677 Kingsway",
              addressLocality: "Vancouver",
              addressRegion: "BC",
              addressCountry: "CA",
            },
            areaServed: {
              "@type": "City",
              name: "Vancouver",
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "https://schema.org/Monday",
                  "https://schema.org/Tuesday",
                  "https://schema.org/Wednesday",
                  "https://schema.org/Thursday",
                  "https://schema.org/Friday",
                ],
                opens: "09:00",
                closes: "17:00",
              },
            ],
          },
          {
            "@type": "WebSite",
            "@id": "https://www.ziaeedentureclinic.ca/#website",
            url: "https://www.ziaeedentureclinic.ca/",
            name: "Ziaee Denture Clinic",
            publisher: {
              "@id": "https://www.ziaeedentureclinic.ca/#clinic",
            },
            inLanguage: "en-CA",
          },
          {
            "@type": "WebPage",
            "@id": "https://www.ziaeedentureclinic.ca/services/implant-supported-dentures#webpage",
            url: "https://www.ziaeedentureclinic.ca/services/implant-supported-dentures",
            name: "Implant-Supported Dentures",
            description:
              "Custom dentures that attach to implants, with the denture pathway coordinated with dental surgeons.",
            inLanguage: "en-CA",
            isPartOf: {
              "@id": "https://www.ziaeedentureclinic.ca/#website",
            },
            mainEntity: {
              "@id": "https://www.ziaeedentureclinic.ca/services/implant-supported-dentures#service",
            },
            breadcrumb: {
              "@id": "https://www.ziaeedentureclinic.ca/services/implant-supported-dentures#breadcrumb",
            },
          },
          {
            "@type": "Service",
            "@id": "https://www.ziaeedentureclinic.ca/services/implant-supported-dentures#service",
            name: "Implant-Supported Dentures",
            serviceType: "Implant-Supported Dentures",
            description:
              "Custom dentures that attach to implants, with the denture pathway coordinated with dental surgeons.",
            url: "https://www.ziaeedentureclinic.ca/services/implant-supported-dentures",
            provider: {
              "@id": "https://www.ziaeedentureclinic.ca/#clinic",
            },
            areaServed: {
              "@type": "City",
              name: "Vancouver",
            },
          },
          {
            "@type": "BreadcrumbList",
            "@id": "https://www.ziaeedentureclinic.ca/services/implant-supported-dentures#breadcrumb",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.ziaeedentureclinic.ca/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Services",
                item: "https://www.ziaeedentureclinic.ca/services",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Implant-Supported Dentures",
                item: "https://www.ziaeedentureclinic.ca/services/implant-supported-dentures",
              },
            ],
          },
        ],
      }),
    }}
  />
)}

{slug === "services/night-guards" && (
  <Script
    id="night-guards-schema"
    type="application/ld+json"
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "MedicalClinic",
            "@id": "https://www.ziaeedentureclinic.ca/#clinic",
            name: "Ziaee Denture Clinic",
            url: "https://www.ziaeedentureclinic.ca/",
            telephone: "+1-604-326-0459",
            description:
              "Denture clinic in Vancouver providing complete, partial and implant-supported dentures, maintenance services and custom dental appliances.",
            address: {
              "@type": "PostalAddress",
              streetAddress: "2677 Kingsway",
              addressLocality: "Vancouver",
              addressRegion: "BC",
              addressCountry: "CA",
            },
            areaServed: {
              "@type": "City",
              name: "Vancouver",
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "https://schema.org/Monday",
                  "https://schema.org/Tuesday",
                  "https://schema.org/Wednesday",
                  "https://schema.org/Thursday",
                  "https://schema.org/Friday",
                ],
                opens: "09:00",
                closes: "17:00",
              },
            ],
          },
          {
            "@type": "WebSite",
            "@id": "https://www.ziaeedentureclinic.ca/#website",
            url: "https://www.ziaeedentureclinic.ca/",
            name: "Ziaee Denture Clinic",
            publisher: {
              "@id": "https://www.ziaeedentureclinic.ca/#clinic",
            },
            inLanguage: "en-CA",
          },
          {
            "@type": "WebPage",
            "@id": "https://www.ziaeedentureclinic.ca/services/night-guards#webpage",
            url: "https://www.ziaeedentureclinic.ca/services/night-guards",
            name: "Custom Night Guards",
            description:
              "Custom-fitted night guard appliances, with design and fit assessed by the clinic.",
            inLanguage: "en-CA",
            isPartOf: {
              "@id": "https://www.ziaeedentureclinic.ca/#website",
            },
            mainEntity: {
              "@id": "https://www.ziaeedentureclinic.ca/services/night-guards#service",
            },
            breadcrumb: {
              "@id": "https://www.ziaeedentureclinic.ca/services/night-guards#breadcrumb",
            },
          },
          {
            "@type": "Service",
            "@id": "https://www.ziaeedentureclinic.ca/services/night-guards#service",
            name: "Custom Night Guards",
            serviceType: "Custom Night Guards",
            description:
              "Custom-fitted night guard appliances, with design and fit assessed by the clinic.",
            url: "https://www.ziaeedentureclinic.ca/services/night-guards",
            provider: {
              "@id": "https://www.ziaeedentureclinic.ca/#clinic",
            },
            areaServed: {
              "@type": "City",
              name: "Vancouver",
            },
          },
          {
            "@type": "BreadcrumbList",
            "@id": "https://www.ziaeedentureclinic.ca/services/night-guards#breadcrumb",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.ziaeedentureclinic.ca/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Services",
                item: "https://www.ziaeedentureclinic.ca/services",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Custom Night Guards",
                item: "https://www.ziaeedentureclinic.ca/services/night-guards",
              },
            ],
          },
        ],
      }),
    }}
  />
)}
{slug === "services/partial-dentures" && (
  <Script
    id="partial-dentures-schema"
    type="application/ld+json"
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "MedicalClinic",
            "@id": "https://www.ziaeedentureclinic.ca/#clinic",
            name: "Ziaee Denture Clinic",
            url: "https://www.ziaeedentureclinic.ca/",
            telephone: "+1-604-326-0459",
            description:
              "Denture clinic in Vancouver providing complete, partial and implant-supported dentures, maintenance services and custom dental appliances.",
            address: {
              "@type": "PostalAddress",
              streetAddress: "2677 Kingsway",
              addressLocality: "Vancouver",
              addressRegion: "BC",
              addressCountry: "CA",
            },
            areaServed: {
              "@type": "City",
              name: "Vancouver",
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "https://schema.org/Monday",
                  "https://schema.org/Tuesday",
                  "https://schema.org/Wednesday",
                  "https://schema.org/Thursday",
                  "https://schema.org/Friday",
                ],
                opens: "09:00",
                closes: "17:00",
              },
            ],
          },
          {
            "@type": "WebSite",
            "@id": "https://www.ziaeedentureclinic.ca/#website",
            url: "https://www.ziaeedentureclinic.ca/",
            name: "Ziaee Denture Clinic",
            publisher: {
              "@id": "https://www.ziaeedentureclinic.ca/#clinic",
            },
            inLanguage: "en-CA",
          },
          {
            "@type": "WebPage",
            "@id": "https://www.ziaeedentureclinic.ca/services/partial-dentures#webpage",
            url: "https://www.ziaeedentureclinic.ca/services/partial-dentures",
            name: "Partial Dentures",
            description:
              "Custom removable partial dentures for people who have missing teeth and retain some natural teeth.",
            inLanguage: "en-CA",
            isPartOf: {
              "@id": "https://www.ziaeedentureclinic.ca/#website",
            },
            mainEntity: {
              "@id": "https://www.ziaeedentureclinic.ca/services/partial-dentures#service",
            },
            breadcrumb: {
              "@id": "https://www.ziaeedentureclinic.ca/services/partial-dentures#breadcrumb",
            },
          },
          {
            "@type": "Service",
            "@id": "https://www.ziaeedentureclinic.ca/services/partial-dentures#service",
            name: "Partial Dentures",
            serviceType: "Partial Dentures",
            description:
              "Custom removable partial dentures for people who have missing teeth and retain some natural teeth.",
            url: "https://www.ziaeedentureclinic.ca/services/partial-dentures",
            provider: {
              "@id": "https://www.ziaeedentureclinic.ca/#clinic",
            },
            areaServed: {
              "@type": "City",
              name: "Vancouver",
            },
          },
          {
            "@type": "BreadcrumbList",
            "@id": "https://www.ziaeedentureclinic.ca/services/partial-dentures#breadcrumb",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.ziaeedentureclinic.ca/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Services",
                item: "https://www.ziaeedentureclinic.ca/services",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Partial Dentures",
                item: "https://www.ziaeedentureclinic.ca/services/partial-dentures",
              },
            ],
          },
        ],
      }),
    }}
  />
)}

{slug === "services/rebase" && (
  <Script
    id="denture-rebase-schema"
    type="application/ld+json"
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "MedicalClinic",
            "@id": "https://www.ziaeedentureclinic.ca/#clinic",
            name: "Ziaee Denture Clinic",
            url: "https://www.ziaeedentureclinic.ca/",
            telephone: "+1-604-326-0459",
            description:
              "Denture clinic in Vancouver providing complete, partial and implant-supported dentures, maintenance services and custom dental appliances.",
            address: {
              "@type": "PostalAddress",
              streetAddress: "2677 Kingsway",
              addressLocality: "Vancouver",
              addressRegion: "BC",
              addressCountry: "CA",
            },
            areaServed: {
              "@type": "City",
              name: "Vancouver",
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "https://schema.org/Monday",
                  "https://schema.org/Tuesday",
                  "https://schema.org/Wednesday",
                  "https://schema.org/Thursday",
                  "https://schema.org/Friday",
                ],
                opens: "09:00",
                closes: "17:00",
              },
            ],
          },
          {
            "@type": "WebSite",
            "@id": "https://www.ziaeedentureclinic.ca/#website",
            url: "https://www.ziaeedentureclinic.ca/",
            name: "Ziaee Denture Clinic",
            publisher: {
              "@id": "https://www.ziaeedentureclinic.ca/#clinic",
            },
            inLanguage: "en-CA",
          },
          {
            "@type": "WebPage",
            "@id": "https://www.ziaeedentureclinic.ca/services/rebase#webpage",
            url: "https://www.ziaeedentureclinic.ca/services/rebase",
            name: "Denture Rebase",
            description:
              "Replacement of an existing denture's base while retaining its teeth when the appliance is suitable for rebasing.",
            inLanguage: "en-CA",
            isPartOf: {
              "@id": "https://www.ziaeedentureclinic.ca/#website",
            },
            mainEntity: {
              "@id": "https://www.ziaeedentureclinic.ca/services/rebase#service",
            },
            breadcrumb: {
              "@id": "https://www.ziaeedentureclinic.ca/services/rebase#breadcrumb",
            },
          },
          {
            "@type": "Service",
            "@id": "https://www.ziaeedentureclinic.ca/services/rebase#service",
            name: "Denture Rebase",
            serviceType: "Denture Rebase",
            description:
              "Replacement of an existing denture's base while retaining its teeth when the appliance is suitable for rebasing.",
            url: "https://www.ziaeedentureclinic.ca/services/rebase",
            provider: {
              "@id": "https://www.ziaeedentureclinic.ca/#clinic",
            },
            areaServed: {
              "@type": "City",
              name: "Vancouver",
            },
          },
          {
            "@type": "BreadcrumbList",
            "@id": "https://www.ziaeedentureclinic.ca/services/rebase#breadcrumb",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.ziaeedentureclinic.ca/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Services",
                item: "https://www.ziaeedentureclinic.ca/services",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Denture Rebase",
                item: "https://www.ziaeedentureclinic.ca/services/rebase",
              },
            ],
          },
        ],
      }),
    }}
  />
)}

{slug === "services/relines" && (
  <Script
    id="denture-relines-schema"
    type="application/ld+json"
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "MedicalClinic",
            "@id": "https://www.ziaeedentureclinic.ca/#clinic",
            name: "Ziaee Denture Clinic",
            url: "https://www.ziaeedentureclinic.ca/",
            telephone: "+1-604-326-0459",
            description:
              "Denture clinic in Vancouver providing complete, partial and implant-supported dentures, maintenance services and custom dental appliances.",
            address: {
              "@type": "PostalAddress",
              streetAddress: "2677 Kingsway",
              addressLocality: "Vancouver",
              addressRegion: "BC",
              addressCountry: "CA",
            },
            areaServed: {
              "@type": "City",
              name: "Vancouver",
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "https://schema.org/Monday",
                  "https://schema.org/Tuesday",
                  "https://schema.org/Wednesday",
                  "https://schema.org/Thursday",
                  "https://schema.org/Friday",
                ],
                opens: "09:00",
                closes: "17:00",
              },
            ],
          },
          {
            "@type": "WebSite",
            "@id": "https://www.ziaeedentureclinic.ca/#website",
            url: "https://www.ziaeedentureclinic.ca/",
            name: "Ziaee Denture Clinic",
            publisher: {
              "@id": "https://www.ziaeedentureclinic.ca/#clinic",
            },
            inLanguage: "en-CA",
          },
          {
            "@type": "WebPage",
            "@id": "https://www.ziaeedentureclinic.ca/services/relines#webpage",
            url: "https://www.ziaeedentureclinic.ca/services/relines",
            name: "Denture Relines",
            description:
              "Assessment and adjustment of the fitting surface of an existing denture, with hard and soft reline options described.",
            inLanguage: "en-CA",
            isPartOf: {
              "@id": "https://www.ziaeedentureclinic.ca/#website",
            },
            mainEntity: {
              "@id": "https://www.ziaeedentureclinic.ca/services/relines#service",
            },
            breadcrumb: {
              "@id": "https://www.ziaeedentureclinic.ca/services/relines#breadcrumb",
            },
          },
          {
            "@type": "Service",
            "@id": "https://www.ziaeedentureclinic.ca/services/relines#service",
            name: "Denture Relines",
            serviceType: "Denture Relines",
            description:
              "Assessment and adjustment of the fitting surface of an existing denture, with hard and soft reline options described.",
            url: "https://www.ziaeedentureclinic.ca/services/relines",
            provider: {
              "@id": "https://www.ziaeedentureclinic.ca/#clinic",
            },
            areaServed: {
              "@type": "City",
              name: "Vancouver",
            },
          },
          {
            "@type": "BreadcrumbList",
            "@id": "https://www.ziaeedentureclinic.ca/services/relines#breadcrumb",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.ziaeedentureclinic.ca/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Services",
                item: "https://www.ziaeedentureclinic.ca/services",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Denture Relines",
                item: "https://www.ziaeedentureclinic.ca/services/relines",
              },
            ],
          },
        ],
      }),
    }}
  />
)}

{slug === "services/sports-mouthguard" && (
  <Script
    id="sports-mouthguard-schema"
    type="application/ld+json"
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "MedicalClinic",
            "@id": "https://www.ziaeedentureclinic.ca/#clinic",
            name: "Ziaee Denture Clinic",
            url: "https://www.ziaeedentureclinic.ca/",
            telephone: "+1-604-326-0459",
            description:
              "Denture clinic in Vancouver providing complete, partial and implant-supported dentures, maintenance services and custom dental appliances.",
            address: {
              "@type": "PostalAddress",
              streetAddress: "2677 Kingsway",
              addressLocality: "Vancouver",
              addressRegion: "BC",
              addressCountry: "CA",
            },
            areaServed: {
              "@type": "City",
              name: "Vancouver",
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "https://schema.org/Monday",
                  "https://schema.org/Tuesday",
                  "https://schema.org/Wednesday",
                  "https://schema.org/Thursday",
                  "https://schema.org/Friday",
                ],
                opens: "09:00",
                closes: "17:00",
              },
            ],
          },
          {
            "@type": "WebSite",
            "@id": "https://www.ziaeedentureclinic.ca/#website",
            url: "https://www.ziaeedentureclinic.ca/",
            name: "Ziaee Denture Clinic",
            publisher: {
              "@id": "https://www.ziaeedentureclinic.ca/#clinic",
            },
            inLanguage: "en-CA",
          },
          {
            "@type": "WebPage",
            "@id": "https://www.ziaeedentureclinic.ca/services/sports-mouthguard#webpage",
            url: "https://www.ziaeedentureclinic.ca/services/sports-mouthguard",
            name: "Custom Sports Mouthguards",
            description:
              "Custom-fitted sports mouthguards for youth and adult athletes.",
            inLanguage: "en-CA",
            isPartOf: {
              "@id": "https://www.ziaeedentureclinic.ca/#website",
            },
            mainEntity: {
              "@id": "https://www.ziaeedentureclinic.ca/services/sports-mouthguard#service",
            },
            breadcrumb: {
              "@id": "https://www.ziaeedentureclinic.ca/services/sports-mouthguard#breadcrumb",
            },
          },
          {
            "@type": "Service",
            "@id": "https://www.ziaeedentureclinic.ca/services/sports-mouthguard#service",
            name: "Custom Sports Mouthguards",
            serviceType: "Custom Sports Mouthguards",
            description:
              "Custom-fitted sports mouthguards for youth and adult athletes.",
            url: "https://www.ziaeedentureclinic.ca/services/sports-mouthguard",
            provider: {
              "@id": "https://www.ziaeedentureclinic.ca/#clinic",
            },
            areaServed: {
              "@type": "City",
              name: "Vancouver",
            },
          },
          {
            "@type": "BreadcrumbList",
            "@id": "https://www.ziaeedentureclinic.ca/services/sports-mouthguard#breadcrumb",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.ziaeedentureclinic.ca/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Services",
                item: "https://www.ziaeedentureclinic.ca/services",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Custom Sports Mouthguards",
                item: "https://www.ziaeedentureclinic.ca/services/sports-mouthguard",
              },
            ],
          },
        ],
      }),
    }}
  />
)}
      </head>

      <body className={googleSansFlex.variable}>
        <Header data={headerData} />

        {children}

        <Footer data={footerData} />
      </body>
    </html>
  );
}
