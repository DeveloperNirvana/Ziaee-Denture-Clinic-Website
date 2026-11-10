
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
      </head>

      <body className={googleSansFlex.variable}>
        <Header data={headerData} />

        {children}

        <Footer data={footerData} />
      </body>
    </html>
  );
}
