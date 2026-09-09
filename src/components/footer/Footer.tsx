'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  FaChevronDown,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa6';
import { IoLocationSharp } from 'react-icons/io5';
import Container from '../common/Container';
import { staticFooterData } from '@/data/footer';
type FooterData = typeof staticFooterData;
interface FooterProps {
  data?: FooterData;
}
const socialIcons = {
  instagram: FaInstagram,
  facebook: FaFacebookF,
  linkedin: FaLinkedinIn,
  location: IoLocationSharp,
};
export default function Footer({ data }: FooterProps) {
  const footer = data ?? staticFooterData;
  const newsletter = footer.newsletter;
  const contact = footer.contact;
  const services = footer.services;
  const support = footer.support;
  const socials = footer.socials;
  const bottom = footer.bottom;
  const pathname = usePathname();
  const [openItems, setOpenItems] = useState<number[]>([]);
  /**
   * Mobile accordion items
   */
  const accordionItems = [
    {
      title: contact.title,
      type: 'contact',
    },
    {
      title: services.title,
      type: 'services',
    },
    {
      title: support.title,
      type: 'support',
    },
  ] as const;
  /**
   * Toggle mobile accordion
   */
  const toggleAccordion = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };
  const normalizeHref = (href: string) => {
    if (!href) {
      return '#';
    }
    // Keep anchors and special URLs unchanged
    if (
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('http://') === false &&
        href.startsWith('https://') === false
    ) {
      return href;
    }
    try {
      const url = new URL(href);
      if (
        typeof window !== 'undefined' &&
        url.hostname === window.location.hostname
      ) {
        return `${url.pathname}${url.search}${url.hash}`;
      }
      return href;
    } catch {
      return href;
    }
  };
  const isActiveLink = (href: string) => {
    if (!href || href === '#') {
      return false;
    }
    const normalizedHref = normalizeHref(href);
    // Do not mark external links as active
    if (
      normalizedHref.startsWith('http://') ||
      normalizedHref.startsWith('https://') ||
      normalizedHref.startsWith('mailto:') ||
      normalizedHref.startsWith('tel:')
    ) {
      return false;
    }
    const cleanHref = normalizedHref.replace(/\/$/, '') || '/';
    const cleanPathname = pathname.replace(/\/$/, '') || '/';
    return (
      cleanPathname === cleanHref ||
      cleanPathname.startsWith(`${cleanHref}/`)
    );
  };
  const isExternalLink = (href: string) => {
    return (
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:')
    );
  };
  const renderMenuLink = (
    link: { label: string; href: string },
    mobile = false
  ) => {
    if (!link?.label) {
      return null;
    }
    const href = normalizeHref(link.href || '#');
    const active = isActiveLink(href);
    const external = isExternalLink(href);
    const className = mobile
      ? `transition-colors duration-300 ${
          active
            ? 'text-white'
            : 'text-white-blue hover:text-secondary'
        }`
      : `transition-colors duration-500 ${
          active
            ? 'text-white'
            : 'text-white-blue hover:text-secondary'
        }`;
    if (external) {
      return (
        <a
          href={href}
          target={
            href.startsWith('http://') || href.startsWith('https://')
              ? '_blank'
              : undefined
          }
          rel={
            href.startsWith('http://') || href.startsWith('https://')
              ? 'noopener noreferrer'
              : undefined
          }
          className={className}
        >
          {link.label}
        </a>
      );
    }
    return (
      <Link href={href} className={className}>
        {link.label}
      </Link>
    );
  };
  return (
    <footer className="bg-primary text-white-blue text-sm">
      <Container>
        <div className="space-pt">
          <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-[1.8fr_1fr_1fr_1fr] xl:gap-x-20">
            <div>
              {/* <h2 className="mx-auto max-w-110 text-center text-4xl font-bold uppercase leading-none lg:mx-0 lg:max-w-99.75 lg:text-left lg:text-[50px]">
                {newsletter.title}
              </h2> */}
                  <h2 className="relative z-10 mb-0  w-fit bg-primary pr-2 font-sans-flex text-7xl italic uppercase leading-none text-white/90 md:text-[120px] text-center lg:text-left mx-auto lg:mx-0">
              {bottom.logo}
            </h2>
              <p className="mx-auto mt-2 text-center text-sm uppercase lg:mx-0 lg:mt-5 lg:text-left">
                {newsletter.description}
              </p>
              <div className="mt-4 flex overflow-hidden rounded-full bg-white-blue/50 lg:max-w-70">
                <input
                  type="email"
                  placeholder={newsletter.placeholder}
                  className="h-12 w-full min-w-0 bg-transparent px-5 text-secondary/50 outline-none placeholder:text-secondary/50"
                />
              <button
                  type="button"
                  className="m-1 rounded-full bg-white px-6 text-secondary transition-all duration-700 hover:bg-secondary hover:text-white">
                  {newsletter.buttonText}
                </button>
              </div>
              {newsletter.privacyText && (
                <p
                  className="mx-auto mt-3 max-w-70 text-center text-sm leading-tight text-white-blue lg:mx-0 lg:text-left"
                  dangerouslySetInnerHTML={{
                    __html: newsletter.privacyText,
                  }}
                />
              )}
            </div>
            <div className="hidden lg:block">
              <h3 className="mb-5 text-xl font-semibold uppercase">
                {contact.title}
              </h3>
              <div className="space-y-2">
                {contact.phone && (
                  <p>
                    <a
                      href={`tel:${contact.phone}`}
                      className="transition-colors duration-500 hover:text-secondary"
                    >
                      {contact.phone}
                    </a>
                  </p>
                )}
                {contact.email && (
                  <p>
                    <a
                      href={
                        contact.email.startsWith('mailto:')
                          ? contact.email
                          : `mailto:${contact.email}`
                      }
                      className="transition-colors duration-500 hover:text-secondary"
                    >
                      {contact.email.replace('mailto:', '')}
                    </a>
                  </p>
                )}
                {contact.address && (
                  <p>{contact.address}</p>
                )}
              </div>
              {contact.hours?.length > 0 && (
                <div className="mt-6 w-fit border-t border-white/30 pt-6">
                  {contact.hours.map((item, index) => (
                    <div
                      key={`${item.day}-${index}`}
                      className="mb-2 flex items-center justify-between gap-3 gap-x-8"
                    >
                      <span>{item.day}</span>
                      <span>{item.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="hidden lg:block">
              <h3 className="mb-5 text-xl font-semibold uppercase">
                {services.title}
              </h3>
              {services.links?.length > 0 ? (
                <ul className="space-y-2">
                  {services.links.map((link) => (
                    <li
                      key={`${link.label}-${link.href}`}
                    >
                      {renderMenuLink(link)}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-white-blue/60">
                  No services available.
                </p>
              )}
            </div>
            <div className="hidden lg:flex lg:flex-col">
              <h3 className="mb-5 text-xl font-semibold uppercase">
                {support.title}
              </h3>
              {support.links?.length > 0 ? (
                <ul className="space-y-2">
                  {support.links.map((link) => (
                    <li
                      key={`${link.label}-${link.href}`}
                    >
                      {renderMenuLink(link)}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-white-blue/60">
                  No support links available.
                </p>
              )}
              {/* Social Icons */}
              {socials?.length > 0 && (
                <div className="mt-auto flex flex-wrap gap-3 pt-10">
                  {socials.map((social) => {
                    const Icon =
                      socialIcons[
                        social.icon as keyof typeof socialIcons
                      ];
                    if (!Icon || !social.href) {
                      return null;
                    }
                    const external = isExternalLink(
                      social.href
                    );
                    return (
                      <a
                        key={`${social.label}-${social.href}`}
                        href={social.href}
                        aria-label={social.label}
                        target={
                          external &&
                          (social.href.startsWith('http://') ||
                            social.href.startsWith('https://'))
                            ? '_blank'
                            : undefined
                        }
                        rel={
                          external &&
                          (social.href.startsWith('http://') ||
                            social.href.startsWith('https://'))
                            ? 'noopener noreferrer'
                            : undefined
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-primary transition-all duration-300 hover:bg-white hover:text-secondary"
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="lg:hidden lg:col-span-3">
              {accordionItems.map((item, index) => {
                const isOpen = openItems.includes(index);
                return (
                  <div
                    key={`${item.type}-${item.title}`}
                    className="border-b border-white/20"
                  >
                    <button
                      type="button"
                      onClick={() => toggleAccordion(index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between py-5 text-left"
                    >
                      <span className="text-xl font-semibold">
                        {item.title}
                      </span>
                      <FaChevronDown
                        className={`transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isOpen
                          ? 'max-h-125 pb-5 opacity-100'
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      {item.type === 'contact' && (
                        <>
                          <div className="space-y-2">
                            {contact.phone && (
                              <p>
                                <a
                                  href={`tel:${contact.phone}`}
                                  className="transition-colors duration-300 hover:text-secondary"
                                >
                                  {contact.phone}
                                </a>
                              </p>
                            )}
                            {contact.email && (
                              <p>
                                <a
                                  href={
                                    contact.email.startsWith(
                                      'mailto:'
                                    )
                                      ? contact.email
                                      : `mailto:${contact.email}`
                                  }
                                  className="transition-colors duration-300 hover:text-secondary"
                                >
                                  {contact.email.replace(
                                    'mailto:',
                                    ''
                                  )}
                                </a>
                              </p>
                            )}
                            {contact.address && (
                              <p>{contact.address}</p>
                            )}
                          </div>
                          {contact.hours?.length > 0 && (
                            <div className="mt-6">
                              {contact.hours.map(
                                (hour, hourIndex) => (
                                  <div
                                    key={`${hour.day}-${hourIndex}`}
                                    className="mb-2 flex justify-between gap-4"
                                  >
                                    <span>{hour.day}</span>
                                    <span>{hour.time}</span>
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </>
                      )}
                      {item.type === 'services' && (
                        <>
                          {services.links?.length > 0 ? (
                            <ul className="space-y-3">
                              {services.links.map((link) => (
                                <li
                                  key={`${link.label}-${link.href}`}
                                >
                                  {renderMenuLink(link, true)}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-white-blue/60">
                              No services available.
                            </p>
                          )}
                        </>
                      )}
                      {item.type === 'support' && (
                        <>
                          {support.links?.length > 0 ? (
                            <ul className="space-y-3">
                              {support.links.map((link) => (
                                <li
                                  key={`${link.label}-${link.href}`}
                                >
                                  {renderMenuLink(link, true)}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-white-blue/60">
                              No support links available.
                            </p>
                          )}
                          {socials?.length > 0 && (
                            <div className="mt-6 flex flex-wrap gap-3">
                              {socials.map((social) => {
                                const Icon =
                                  socialIcons[
                                    social.icon as keyof typeof socialIcons
                                  ];
                                if (
                                  !Icon ||
                                  !social.href
                                ) {
                                  return null;
                                }
                                const external =
                                  isExternalLink(
                                    social.href
                                  );
                                return (
                                  <a
                                    key={`${social.label}-${social.href}`}
                                    href={social.href}
                                    aria-label={social.label}
                                    target={
                                      external &&
                                      (social.href.startsWith(
                                        'http://'
                                      ) ||
                                        social.href.startsWith(
                                          'https://'
                                        ))
                                        ? '_blank'
                                        : undefined
                                    }
                                    rel={
                                      external &&
                                      (social.href.startsWith(
                                        'http://'
                                      ) ||
                                        social.href.startsWith(
                                          'https://'
                                        ))
                                        ? 'noopener noreferrer'
                                        : undefined
                                    }
                                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 transition-colors duration-300 hover:bg-white/30"
                                  >
                                    <Icon className="h-5 w-5" />
                                  </a>
                                );
                              })}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="lg:mt-10 overflow-hidden">
        
            <div className="hidden lg:block h-px w-full bg-white/20" />
            <div className="flex flex-col gap-1 py-5 text-sm text-white/70 sm:gap-x-3  lg:flex-row lg:items-center text-center justify-center lg:justify-between">
              <p className="flex items-center justify-center gap-3 text-center sm:justify-start lg:text-left w-fit mx-auto lg:mx-0">
                {bottom.copyright}
             
              </p>
              <p className="text-center lg:text-left">
                {bottom.credit}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}