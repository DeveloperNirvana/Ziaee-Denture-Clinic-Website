import type { Metadata } from "next";
import { Google_Sans_Flex } from "next/font/google";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import "./globals.css";
import { getHeaderData } from "@/data/header";
import { getFooterData } from "@/data/footer";
const googleSansFlex = Google_Sans_Flex({ variable: "--font-google-sans-flex",adjustFontFallback: false, subsets: ["latin"], display: "swap",   });
export const metadata: Metadata = {
  title: 'Ziaee Denture',
  description:
    'Ziaee Denture Modern denture care designed around comfort, clarity, and confidence.',

  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      'http://localhost:3000'
  ),
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [headerData, footerData] = await Promise.all([
    getHeaderData(),
    getFooterData(),
  ]);
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={googleSansFlex.variable}>
        <Header data={headerData} />
        {children}
        <Footer data={footerData} />
      </body>
    </html>
  );
}