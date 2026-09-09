'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaPhone, FaEnvelope, FaLocationDot, FaChevronDown, FaArrowRight } from 'react-icons/fa6';
import { HiXMark } from 'react-icons/hi2';
import Container from '../common/Container';
export type NavLinkType = {
  label: string;
  href: string;
  description?: string;
  badge?: string;
  target?: '_self' | '_blank';
};
export type MegaColumnType = {
  title: string;
  href?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  links: NavLinkType[];
};
export type MegaFeaturedType = {
  title: string;
  description?: string;
  href: string;
  buttonText?: string;
  image?: string;
};
export type MegaMenuContentType = {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  columns: MegaColumnType[];
  featured?: MegaFeaturedType;
};
export type MenuItemType = {
  id: string;
  label: string;
  href?: string;
  target?: '_self' | '_blank';
  badge?: string;
  type?: 'link' | 'dropdown' | 'mega' | (string & {});
  children?: NavLinkType[];
  mega?: MegaMenuContentType;
};
export type LogoType = {
  sourceUrl: string;
  altText: string;
};
export type HeaderDataType = {
  phone: string;
  email: string;
  address: string;
  logo: LogoType;
  menu: MenuItemType[];
};
export type HeaderPropsType = {
  data: HeaderDataType;
};
export type ContactItemType = {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  href?: string;
};
export type DesktopDropdownPropsType = {
  item: MenuItemType;
  pathname: string;
};
export type DesktopMegaMenuPropsType = {
  item: MenuItemType;
  pathname: string;
};
export type DesktopMenuPropsType = {
  items: MenuItemType[];
  pathname: string;
};
export type HamburgerPropsType = {
  open: boolean;
  onClick: () => void;
};
export type MobileDropdownPropsType = {
  item: MenuItemType;
  pathname: string;
  onClose: () => void;
};
export type MobileMenuPropsType = {
  pathname: string;
  items: MenuItemType[];
  onClose: () => void;
};
export type MobileSidebarPropsType = {
  open: boolean;
  pathname: string;
  items: MenuItemType[];
  onClose: () => void;
};
function normalizePath(url?: string): string {
  if (!url || url === '#') return '';
  try {
    const parsed = url.startsWith('http') ? new URL(url).pathname : url;
    const cleaned = parsed.replace(/\/+$/, '');
    return cleaned === '' ? '/' : cleaned;
  } catch {
    return url.replace(/\/+$/, '') || '/';
  }
}
function isActive(pathname: string, href?: string): boolean {
  const cleanPath = normalizePath(pathname);
  const cleanHref = normalizePath(href);
  if (!cleanHref) return false;
  if (cleanHref === '/') return cleanPath === '/';
  return cleanPath === cleanHref || cleanPath.startsWith(`${cleanHref}/`);
}
export function Hamburger({ open, onClick }: HamburgerPropsType) {
  return (
    <button
      type="button"
      aria-label={open ? 'Close Menu' : 'Open Menu'}
      aria-expanded={open}
      onClick={onClick}
      className="relative flex h-11 w-11 items-center justify-center text-white">
      <span className="sr-only">{open ? 'Close Menu' : 'Open Menu'}</span>
      <span className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ${open ? 'rotate-45' : '-translate-y-2'}`} />
      <span className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ${open ? 'opacity-0' : 'opacity-100'}`} />
      <span className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ${open ? '-rotate-45' : 'translate-y-2'}`} />
    </button>
  );
}
export function DesktopDropdown({ item, pathname }: DesktopDropdownPropsType) {
  const isChildActive = Boolean(item.children?.some((child) => isActive(pathname, child.href)));
  const isSelfActive = isActive(pathname, item.href);
  const parentActive = isSelfActive || isChildActive;
  return (
    <div className="group relative flex h-full items-center">
      <div className={`flex h-full items-center gap-2 ${parentActive ? 'text-primary' : 'hover:text-primary'}`}>
        <Link
          href={item.href || '#'}
          className={`relative flex h-full items-center pb-3 text-sm font-normal uppercase text-shadow-2xs transition-colors duration-200 ${
            parentActive ? 'text-primary' : 'text-white-blue hover:text-white'
          }`}>
          {item.label}
          <span
            className={`absolute bottom-0 left-0 h-0.5 w-full bg-current transition-transform duration-300 ${
              parentActive ? 'scale-x-100' : 'scale-x-0'
            }`}
          />
        </Link>
        <FaChevronDown
          size={12}
          className={`mb-3.25 transition-transform duration-300 group-hover:rotate-180 ${parentActive ? 'text-primary' : 'text-white'}`}
        />
      </div>
      <div className="invisible absolute left-0 top-full z-50 min-w-70 origin-top translate-y-3 opacity-0 transition-all duration-300 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        <div className="overflow-hidden rounded-2xl border border-black/10 bg-white p-2 shadow-2xl">
          {item.children?.map((child) => {
            const active = isActive(pathname, child.href);
            return (
              <Link
                key={child.href}
                href={child.href}
                target={child.target}
                aria-current={active ? 'page' : undefined}
                className={`group/link block rounded-xl px-4 py-2.5 transition-colors duration-200 ${
                  active ? 'bg-white-blue text-primary' : 'text-secondary hover:bg-gray-100 hover:text-primary'
                }`}>
                <div className="flex items-center justify-between text-sm font-normal">
                  <span>{child.label}</span>
                  <FaArrowRight
                    size={12}
                    className="opacity-0 -translate-x-2 transition-all duration-200 group-hover/link:opacity-100 group-hover/link:translate-x-0"
                  />
                </div>
                {child.description && <div className="mt-1 text-xs normal-case text-gray-500">{child.description}</div>}
                {child.badge && (
                  <span className="mt-2 inline-flex rounded-full border border-black/10 px-2 py-0.5 text-[10px]">{child.badge}</span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export function DesktopMegaMenu({ item, pathname }: DesktopMegaMenuPropsType) {
  const mega = item.mega;
  if (!mega) return null;
  const parentActive =
    isActive(pathname, item.href) ||
    mega.columns.some(
      (column) =>
        isActive(pathname, column.href) ||
        isActive(pathname, column.buttonHref) ||
        column.links.some((link) => isActive(pathname, link.href))
    );
  const gridCols = mega.featured
    ? 'grid-cols-4'
    : mega.columns.length === 1
      ? 'grid-cols-1'
      : mega.columns.length === 2
        ? 'grid-cols-2'
        : mega.columns.length === 3
          ? 'grid-cols-3'
          : 'grid-cols-4';
  return (
    <div className="group flex h-full items-center">
      <div className={`flex h-full items-center gap-2 ${parentActive ? 'text-primary' : 'hover:text-primary'}`}>
        <Link
          href={item.href || '#'}
          className={`relative flex h-full items-center pb-3 text-sm font-normal uppercase text-shadow-2xs transition-colors duration-200 ${
            parentActive ? 'text-primary' : 'text-white-blue hover:text-white'
          }`}>
          {item.label}
          <span
            className={`absolute bottom-0 left-0 h-0.5 w-full bg-current transition-transform duration-300 ${
              parentActive ? 'scale-x-100' : 'scale-x-0'
            }`}
          />
        </Link>
        <FaChevronDown
          size={12}
          className={`mb-3.25 transition-transform duration-300 group-hover:rotate-180 ${parentActive ? 'text-primary' : 'text-white'}`}
        />
      </div>
      <div className="invisible fixed inset-x-0 top-full z-50 opacity-0 translate-y-3 transition-all duration-300 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-black/10 bg-white p-8 shadow-2xl">
            {(mega.title || mega.description || mega.buttonText) && (
              <div className="mb-8 flex items-end justify-between border-b border-black/10 pb-6">
                <div>
                  {mega.title && <h2 className="text-2xl font-bold uppercase tracking-tight text-secondary">{mega.title}</h2>}
                  {mega.description && <p className="mt-2 max-w-2xl text-sm text-gray-500">{mega.description}</p>}
                </div>
                {mega.buttonText && mega.buttonHref && (
                  <Link
                    href={mega.buttonHref}
                    className={`inline-flex items-center gap-2 rounded-full border border-black/10 px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:bg-secondary hover:text-white ${
                      isActive(pathname, mega.buttonHref) ? 'bg-secondary text-white' : 'text-secondary'
                    }`}>
                    {mega.buttonText}
                    <FaArrowRight size={12} />
                  </Link>
                )}
              </div>
            )}
            <div className={`grid gap-8 ${gridCols}`}>
              {mega.columns.map((column) => {
                const columnActive = isActive(pathname, column.href);
                return (
                  <div key={column.title} className="flex flex-col">
                    <div className="mb-4">
                      {column.href ? (
                        <Link
                          href={column.href}
                          className={`inline-flex items-center gap-2 text-base font-bold uppercase tracking-wide transition-colors ${
                            columnActive ? 'text-primary' : 'text-secondary hover:text-primary'
                          }`}>
                          {column.title}
                        </Link>
                      ) : (
                        <h3 className="text-base font-bold uppercase tracking-wide text-secondary">{column.title}</h3>
                      )}
                      {column.description && <p className="mt-1 text-xs text-gray-500">{column.description}</p>}
                      {column.buttonText && column.buttonHref && (
                        <Link
                          href={column.buttonHref}
                          className={`mt-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                            isActive(pathname, column.buttonHref) ? 'text-primary' : 'text-secondary hover:text-primary'
                          }`}>
                          {column.buttonText}
                          <FaArrowRight size={10} />
                        </Link>
                      )}
                    </div>
                    <ul className="space-y-1">
                      {column.links.map((link) => {
                        const active = isActive(pathname, link.href);
                        return (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              target={link.target}
                              aria-current={active ? 'page' : undefined}
                              className={`group/item block rounded-xl px-3.5 py-2.5 transition-colors duration-200 ${
                                active ? 'bg-white-blue font-semibold text-primary' : 'text-secondary hover:bg-gray-100 hover:text-primary'
                              }`}>
                              <div className="flex items-center justify-between text-sm">
                                <span>{link.label}</span>
                                <FaArrowRight
                                  size={11}
                                  className="opacity-0 -translate-x-1.5 transition-all duration-200 group-hover/item:opacity-100 group-hover/item:translate-x-0"
                                />
                              </div>
                              {link.description && <div className="mt-0.5 text-xs normal-case text-gray-500">{link.description}</div>}
                              {link.badge && (
                                <span className="mt-1.5 inline-flex rounded-full border border-black/10 px-2 py-0.5 text-[10px]">
                                  {link.badge}
                                </span>
                              )}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
              {mega.featured && (
                <div className="flex flex-col justify-between rounded-2xl bg-white-blue p-6">
                  <div>
                    {mega.featured.image && (
                      <div className="relative mb-4 h-32 w-full overflow-hidden rounded-xl">
                        <Image src={mega.featured.image} alt={mega.featured.title} sizes="100vw" fill className="object-cover" />
                      </div>
                    )}
                    <h3 className="text-lg font-bold uppercase text-secondary">{mega.featured.title}</h3>
                    {mega.featured.description && <p className="mt-2 text-xs leading-relaxed text-gray-600">{mega.featured.description}</p>}
                  </div>
                  <Link
                    href={mega.featured.href}
                    className={`mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-transform duration-200 hover:scale-[1.02] ${
                      isActive(pathname, mega.featured.href) ? 'opacity-90' : ''
                    }`}>
                    {mega.featured.buttonText ?? 'Learn More'}
                    <FaArrowRight size={12} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export function DesktopMenu({ items, pathname }: DesktopMenuPropsType) {
  return (
    <nav aria-label="Primary Navigation" className="hidden h-full lg:flex">
      <ul className="flex h-full items-center gap-5">
        {items.map((item) => {
          const isDropdown = item.type === 'dropdown' || Boolean(item.children?.length);
          const isMega = item.type === 'mega' || Boolean(item.mega);
          if (isDropdown) {
            return (
              <li key={item.id}>
                <DesktopDropdown item={item} pathname={pathname} />
              </li>
            );
          }
          if (isMega) {
            return (
              <li key={item.id}>
                <DesktopMegaMenu item={item} pathname={pathname} />
              </li>
            );
          }
          const active = isActive(pathname, item.href);
          return (
            <li key={item.id}>
              <Link
                href={item.href || '#'}
                target={item.target}
                aria-current={active ? 'page' : undefined}
                className={`relative flex h-full items-center pb-3 text-sm font-normal uppercase text-shadow-2xs transition-colors duration-200 ${
                  active ? 'text-primary' : 'text-white-blue hover:text-white'
                }`}>
                {item.label}
                {item.badge && <span className="ml-2 rounded-full border px-2 py-0.5 text-[10px]">{item.badge}</span>}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 w-full bg-current transition-transform duration-300 ${
                    active ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
export function MobileDropdown({ item, pathname, onClose }: MobileDropdownPropsType) {
  const links = useMemo<NavLinkType[]>(() => {
    if (item.type === 'dropdown') {
      return item.children ?? [];
    }
    if (item.type === 'mega') {
      return item.mega?.columns.flatMap((column) => column.links) ?? [];
    }
    return [];
  }, [item]);
  const hasActiveChild =
    isActive(pathname, item.href) ||
    (item.children?.some((child) => isActive(pathname, child.href)) ?? false) ||
    links.some((link) => isActive(pathname, link.href)) ||
    (item.mega?.columns.some(
      (column) =>
        isActive(pathname, column.href) ||
        isActive(pathname, column.buttonHref) ||
        column.links.some((link) => isActive(pathname, link.href))
    ) ??
      false);
  const [manualOpen, setManualOpen] = useState<boolean | null>(null);
  const open = manualOpen ?? hasActiveChild;
  return (
    <div>
      <div
        className={`flex min-h-14 items-center justify-between text-secondary transition-colors duration-500 uppercase ${
          hasActiveChild ? 'bg-white-blue text-primary' : 'hover:bg-gray-100'
        }`}>
        <Link href={item.href || '#'} target={item.target} onClick={onClose} className="flex-1 px-6 py-4 text-sm font-medium">
          <div className="flex items-center gap-2">
            <span>{item.label}</span>
            {item.badge && <span className="rounded-full border px-2 py-0.5 text-[10px]">{item.badge}</span>}
          </div>
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-label={`Toggle ${item.label}`}
          onClick={() => setManualOpen((prev) => (prev === null ? !hasActiveChild : !prev))}
          className="flex h-14 w-14 items-center justify-center text-secondary">
          <FaChevronDown size={16} className={`transition-transform duration-300 ${open ? 'rotate-180 text-primary' : ''}`} />
        </button>
      </div>
      <div className={`grid overflow-hidden transition-all duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden bg-white">
          {item.type === 'dropdown' && (
            <ul className="pb-2">
              {item.children?.map((child) => {
                const active = isActive(pathname, child.href);
                return (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      target={child.target}
                      onClick={onClose}
                      aria-current={active ? 'page' : undefined}
                      className={`block px-10 py-3 text-sm uppercase transition-colors duration-200 ${
                        active ? 'bg-white-blue font-semibold text-primary' : 'text-secondary hover:bg-gray-100 hover:text-primary'
                      }`}>
                      <div>{child.label}</div>
                      {child.description && <div className="mt-1 text-xs normal-case text-gray-500">{child.description}</div>}
                      {child.badge && <span className="mt-2 inline-flex rounded-full border px-2 py-0.5 text-[10px]">{child.badge}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
          {item.type === 'mega' && (
            <div className="pb-4">
              {item.mega?.title && (
                <div className="px-6 pt-4">
                  <h3 className="text-base font-semibold uppercase text-secondary">{item.mega.title}</h3>
                  {item.mega.description && <p className="mt-2 text-sm normal-case text-gray-500">{item.mega.description}</p>}
                  {item.mega.buttonText && item.mega.buttonHref && (
                    <Link
                      href={item.mega.buttonHref}
                      onClick={onClose}
                      className={`mt-3 inline-flex text-sm font-medium uppercase transition-colors ${
                        isActive(pathname, item.mega.buttonHref) ? 'text-primary' : 'text-secondary hover:text-primary'
                      }`}>
                      {item.mega.buttonText}
                    </Link>
                  )}
                </div>
              )}
              {item.mega?.columns.map((column) => (
                <div key={column.title} className="pt-4">
                  <div className="px-10">
                    {column.href ? (
                      <Link
                        href={column.href}
                        onClick={onClose}
                        className={`text-sm font-semibold uppercase transition-colors ${
                          isActive(pathname, column.href) ? 'text-primary' : 'text-secondary hover:text-primary'
                        }`}>
                        {column.title}
                      </Link>
                    ) : (
                      <div className="text-sm font-semibold uppercase text-secondary">{column.title}</div>
                    )}
                    {column.description && <div className="mt-1 text-xs normal-case text-gray-500">{column.description}</div>}
                    {column.buttonText && column.buttonHref && (
                      <Link
                        href={column.buttonHref}
                        onClick={onClose}
                        className={`mt-2 block text-xs font-medium uppercase transition-colors ${
                          isActive(pathname, column.buttonHref) ? 'text-primary' : 'text-secondary hover:text-primary'
                        }`}>
                        {column.buttonText}
                      </Link>
                    )}
                  </div>
                  <ul className="mt-2">
                    {column.links.map((link) => {
                      const active = isActive(pathname, link.href);
                      return (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            target={link.target}
                            onClick={onClose}
                            aria-current={active ? 'page' : undefined}
                            className={`block px-12 py-3 text-sm uppercase transition-colors duration-200 ${
                              active ? 'bg-white-blue font-semibold text-primary' : 'text-secondary hover:bg-gray-100 hover:text-primary'
                            }`}>
                            <div>{link.label}</div>
                            {link.description && <div className="mt-1 text-xs normal-case text-gray-500">{link.description}</div>}
                            {link.badge && (
                              <span className="mt-2 inline-flex rounded-full border px-2 py-0.5 text-[10px]">{link.badge}</span>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export function MobileMenu({ pathname, items, onClose }: MobileMenuPropsType) {
  return (
    <nav aria-label="Mobile Navigation" className="pb-8">
      <ul>
        {items.map((item) => {
          if (item.type === 'dropdown' || item.type === 'mega' || Boolean(item.children?.length) || Boolean(item.mega)) {
            return (
              <li key={item.id} className="border-b border-black/10">
                <MobileDropdown item={item} pathname={pathname} onClose={onClose} />
              </li>
            );
          }
          const active = isActive(pathname, item.href);
          return (
            <li key={item.id} className="border-b border-black/10">
              <Link
                href={item.href || '#'}
                target={item.target}
                onClick={onClose}
                aria-current={active ? 'page' : undefined}
                className={`flex min-h-14 items-center justify-between px-6 text-sm font-medium uppercase text-secondary transition-colors duration-500 ${
                  active ? 'bg-white-blue text-primary' : 'hover:bg-gray-100'
                }`}>
                <span>{item.label}</span>
                {item.badge && <span className="rounded-full border px-2 py-0.5 text-[10px]">{item.badge}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
export function MobileSidebar({ open, pathname, items, onClose }: MobileSidebarPropsType) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (open) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [open, onClose]);
  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-100 h-dvh w-screen overflow-hidden lg:hidden ${
        open ? 'pointer-events-auto visible' : 'pointer-events-none invisible delay-700'
      }`}>
      <div
        className={`absolute -right-24 -top-24 h-48 w-48 rounded-full bg-white shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          open ? 'scale-[32]' : 'scale-0'
        }`}
      />
      <div
        className={`relative z-10 flex h-full w-full flex-col transition-all duration-300 ease-out ${
          open ? 'translate-y-0 opacity-100 delay-200' : '-translate-y-4 opacity-0 delay-0'
        }`}>
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-black/10 px-6">
          <div className="text-lg font-semibold">
            <Image src="/images/logo.svg" alt="Ziaee Denture" width={49} height={50} />
          </div>
          <button
            type="button"
            aria-label="Close Menu"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-secondary transition-all duration-300 hover:scale-105 hover:bg-gray-100">
            <HiXMark size={22} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <MobileMenu pathname={pathname} items={items} onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
export default function Header({ data }: HeaderPropsType) {
  const pathname = usePathname();
  const menuItems = data?.menu ?? [];
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const contactItems: ContactItemType[] = [
    {
      icon: FaPhone,
      text: data?.phone ?? '',
      href: data?.phone ? `tel:${data.phone.replace(/\D/g, '')}` : undefined
    },
    {
      icon: FaEnvelope,
      text: data?.email ?? '',
      href: data?.email ? `mailto:${data.email}` : undefined
    },
    {
      icon: FaLocationDot,
      text: data?.address ?? ''
    }
  ];
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
        className={`fixed inset-x-0 top-0 z-50 bg-secondary transition-all duration-300 lg:bg-secondary/0 ${
          isScrolled ? 'bg-secondary! shadow-xl' : 'shadow-none'
        }`}>
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
          <div className={`flex h-20 max-w-full items-center justify-between duration-500 ${isScrolled ? 'xl:h-20' : 'xl:h-30'}`}>
            <Link href="/" className="text-xl font-bold">
              <Image
                src={data?.logo?.sourceUrl || '/images/logo.svg'}
                alt={data?.logo?.altText || 'Ziaee Denture Clinic'}
                width={49}
                height={50}
                className={pathname !== '/landing-page' ? 'brightness-280 opacity-90 saturate-75' : ''}
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
