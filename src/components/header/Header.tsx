'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import DesktopMenu from './DesktopMenu';
import MobileSidebar from './MobileSidebar';
import Hamburger from './Hamburger';
import type { MenuItem } from './types';
import Container from '../common/Container';
import { FaPhone, FaEnvelope, FaLocationDot } from 'react-icons/fa6';
const contactItems = [
  {
    icon: FaPhone,
    text: '(604) 326-0459',
    href: 'tel:+16043260459'
  },
  {
    icon: FaEnvelope,
    text: 'info@ziaeedenture.ca',
    href: 'mailto:info@ziaeedenture.ca'
  },
  {
    icon: FaLocationDot,
    text: '2677 Kingsway, Vancouver, BC'
  }
];
const menuItems: MenuItem[] = [
  {
    id: 'home',
    label: 'home',
    href: '#'
  },
  {
    id: 'About',
    label: 'About',
    href: '#'
  },
  {
    id: 'Services',
    label: 'Services',
    href: '#'
  },
  {
    id: 'NewPatients',
    label: 'New Patients',
    href: '#'
  },
  {
    id: 'Contact',
    label: 'Contact',
    href: '#'
  }
];
export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);
  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 bg-secondary lg:bg-secondary/0 transition-all duration-300 ${isScrolled ? 'shadow-xl bg-secondary!' : 'shadow-none'}`}>
        <div className={`w-full ${pathname !== '/landing-page' ? 'bg-white-blue' : 'bg-white'}`}>
          <Container className="lg:max-w-[98%]!">
            <div className="flex h-10 items-center justify-between">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const content = (
                  <>
                    <Icon className="size-4" />
                    <span className={item.href ? 'hidden sm:block' : ''}>{item.text}</span>
                  </>
                );
                return item.href ? (
                  <Link
                    key={item.text}
                    href={item.href}
                    className="flex items-center gap-2 text-sm font-normal text-secondary transition-colors hover:text-primary">
                    {content}
                  </Link>
                ) : (
                  <div key={item.text} className="flex items-center gap-2 text-sm font-normal text-secondary">
                    {content}
                  </div>
                );
              })}
            </div>
          </Container>
        </div>
        <Container className="lg:max-w-[96%]!">
          <div className={`flex  max-w-full items-center h-20 justify-between duration-500 ${isScrolled ? 'xl:h-20' : 'xl:h-30'}`}>
            <Link href="/" className="text-xl font-bold">
              <Image
                src="/images/logo.svg"
                alt="Ziaee Denture"
                width={49}
                height={50}
                className={pathname !== '/landing-page' ? 'brightness-280 saturate-75 opacity-90' : ''}
                unoptimized
              />
            </Link>
            <DesktopMenu items={menuItems} pathname={pathname} />
            <div className="lg:hidden">
              <Hamburger open={mobileOpen} onClick={() => setMobileOpen((prev) => !prev)} />
            </div>
          </div>
        </Container>
      </header>
      <div className="h-30 lg:h-10" />
      <MobileSidebar open={mobileOpen} pathname={pathname} items={menuItems} onClose={() => setMobileOpen(false)} />
    </>
  );
}
