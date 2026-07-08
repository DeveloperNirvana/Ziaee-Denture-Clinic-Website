'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { FaChevronDown, FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa6';
import { IoLocationSharp } from 'react-icons/io5';
import Container from '../common/Container';
const footerData = {
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
        time: '9:00 AM – 5:00 PM'
      },
      {
        day: 'Saturday',
        time: 'By appointment'
      }
    ]
  },
  services: {
    title: 'SERVICES',
    links: [
      {
        label: 'Complete Dentures',
        href: '#'
      },
      {
        label: 'Partial Dentures',
        href: '#'
      },
      {
        label: 'Denture Repairs',
        href: '#'
      },
      {
        label: 'Relines & Adjustments',
        href: '#'
      },
      {
        label: 'Digital Denture Design',
        href: '#'
      },
      {
        label: 'Custom Fit Assessment',
        href: '#'
      }
    ]
  },
  support: {
    title: 'SUPPORT',
    links: [
      {
        label: 'Book an Appointment',
        href: '#'
      },
      {
        label: 'Request an Assessment',
        href: '#'
      },
      {
        label: 'CDCP Coverage',
        href: '#'
      },
      {
        label: 'New Patient Information',
        href: '#'
      },
      {
        label: 'Insurance Questions',
        href: '#'
      }
    ]
  },
  socials: [
    {
      icon: 'instagram',
      href: '#',
      label: 'Instagram'
    },
    {
      icon: 'tiktok',
      href: '#',
      label: 'TikTok'
    },
    {
      icon: 'facebook',
      href: '#',
      label: 'Facebook'
    },
    {
      icon: 'location',
      href: '#',
      label: 'Location'
    }
  ],
  bottom: {
    logo: 'ZIAEE',
    copyright: '© 2026 Ziaee Denture Clinic',
    credit: 'Designed & Developed by Nirvana Canada'
  }
};
const socialIcons = {
  instagram: FaInstagram,
  tiktok: FaTiktok,
  facebook: FaFacebookF,
  location: IoLocationSharp
};
export default function Footer() {
  const pathname = usePathname();
  const [openItems, setOpenItems] = useState<number[]>([]);
  const accordionItems = [
    {
      title: footerData.contact.title,
      type: 'contact'
    },
    {
      title: footerData.services.title,
      type: 'services'
    },
    {
      title: footerData.support.title,
      type: 'support'
    }
  ];
  const toggleAccordion = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]));
  };
  return (
    <footer className="bg-primary text-white-blue text-sm xl:pb-10">
      <Container>
        <div className="pt-10 lg:pt-20">
          <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-[1.8fr_1fr_1fr_1fr] xl:gap-x-20">
            <div>
              <h2 className="max-w-110 lg:max-w-99.75 text-4xl font-bold uppercase leading-none lg:text-[50px] text-center lg:text-left mx-auto lg:mx-0">
                {footerData.newsletter.title}
              </h2>
              <p className="mt-7 lg:mt-12 text-sm uppercase mx-auto lg:mx-0 text-center lg:text-left">
                {footerData.newsletter.description}
              </p>
              <div className="mt-4 flex lg:max-w-70 overflow-hidden rounded-full bg-white-blue/50">
                <input
                  type="email"
                  placeholder={footerData.newsletter.placeholder}
                  className="h-12 w-full bg-transparent px-5 text-secondary/50 outline-none placeholder:text-secondary/50"
                />
                <button
                  type="button"
                  className="m-1 rounded-full bg-white px-6 text-secondary transition-all duration-700 hover:bg-secondary hover:text-white">
                  {footerData.newsletter.buttonText}
                </button>
              </div>
              <p
                className="mt-3 text-sm leading-tight text-white-blue  max-w-70 mx-auto lg:mx-0  text-center lg:text-left"
                dangerouslySetInnerHTML={{ __html: footerData.newsletter.privacyText }}
              />
            </div>
            <div className="hidden lg:block">
              <h3 className="mb-5 text-[25px] font-bold uppercase">{footerData.contact.title}</h3>
              <div className="space-y-2">
                <p>
                  <a href={`tel:${footerData.contact.phone}`} className="hover:text-secondary transition-colors duration-500">
                    {footerData.contact.phone}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${footerData.contact.email}`} className="hover:text-secondary transition-colors duration-500">
                    {footerData.contact.email}
                  </a>
                </p>
                <p>{footerData.contact.address}</p>
              </div>
              <div className="mt-6 border-t border-white/30 pt-6 w-fit">
                {footerData.contact.hours.map((item) => (
                  <div key={item.day} className="mb-2 flex items-center justify-between gap-3 gap-x-8">
                    <span>{item.day}</span>
                    <span>{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:block">
              <h3 className="mb-5 text-[25px] font-bold uppercase">{footerData.services.title}</h3>
              <ul className="space-y-2">
                {footerData.services.links.map((link) => {
                  const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className={`transition-colors duration-500 ${active ? 'text-white' : 'text-white-blue hover:text-secondary'}`}>
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="hidden lg:flex lg:flex-col">
              <h3 className="mb-5 text-[25px] font-bold uppercase">{footerData.support.title}</h3>
              <ul className="space-y-2">
                {footerData.support.links.map((link) => {
                  const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className={`transition-colors duration-500 ${active ? 'text-white' : 'text-white-blue hover:text-secondary'}`}>
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-auto flex flex-wrap gap-3 pt-10">
                {footerData.socials.map((social) => {
                  const Icon = socialIcons[social.icon as keyof typeof socialIcons];
                  return (
                    <Link
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full text-primary bg-white/80 transition-all duration-300 hover:bg-white hover:text-secondary">
                      <Icon className="h-5 w-5" />
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="lg:hidden">
              {accordionItems.map((item, index) => {
                const isOpen = openItems.includes(index);
                return (
                  <div key={item.title} className="border-b border-white/20">
                    <button type="button" onClick={() => toggleAccordion(index)} className="flex w-full items-center justify-between py-5">
                      <span className="text-xl font-semibold">{item.title}</span>
                      <FaChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isOpen ? 'max-h-125 pb-5 opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                      {item.type === 'contact' && (
                        <>
                          <div className="space-y-2">
                            <p>{footerData.contact.phone}</p>
                            <p>{footerData.contact.email}</p>
                            <p>{footerData.contact.address}</p>
                          </div>
                          <div className="mt-6">
                            {footerData.contact.hours.map((hour) => (
                              <div key={hour.day} className="mb-2 flex justify-between">
                                <span>{hour.day}</span>
                                <span>{hour.time}</span>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                      {item.type === 'services' && (
                        <ul className="space-y-3">
                          {footerData.services.links.map((link) => (
                            <li key={link.label}>
                              <Link href={link.href}>{link.label}</Link>
                            </li>
                          ))}
                        </ul>
                      )}
                      {item.type === 'support' && (
                        <>
                          <ul className="space-y-3">
                            {footerData.support.links.map((link) => (
                              <li key={link.label}>
                                <Link href={link.href}>{link.label}</Link>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-6 flex flex-wrap gap-3">
                            {footerData.socials.map((social) => {
                              const Icon = socialIcons[social.icon as keyof typeof socialIcons];
                              return (
                                <Link
                                  key={social.label}
                                  href={social.href}
                                  aria-label={social.label}
                                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20">
                                  <Icon className="h-5 w-5" />
                                </Link>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-12 lg:mt-20 overflow-hidden">
            <h2 className="text-7xl font-adrianna italic uppercase leading-none text-white/90 md:text-[120px] xl:text-[150px] bg-primary w-fit -mb-7 md:-mb-10 relative z-10 pr-2">
              {footerData.bottom.logo}
            </h2>
            <div className="mt-4 h-px w-full bg-white/20" />
            <div className="flex flex-col gap-1 sm:gap-x-3 py-5 text-sm text-white/70 lg:flex-row lg:items-center sm:pl-60 md:pl-102 xl:pl-126">
              <p className="flex items-center gap-3 text-center sm:text-left justify-center sm:justify-start">
                {footerData.bottom.copyright} <Image src="/images/star.png" width={17} height={17} alt="star" className="shirnk-0" />
              </p>
              <p className="text-center sm:text-left">{footerData.bottom.credit}</p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
