'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { FaChevronDown  } from "react-icons/fa6";
import type { MenuItem, NavLink } from './types';
type MobileDropdownProps = {
  item: MenuItem;
  pathname: string;
  onClose: () => void;
};
function isActive(pathname: string, href?: string) {
  if (!href) return false;
  if (href === '/') {
    return pathname === '/';
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
export default function MobileDropdown({ item, pathname, onClose }: MobileDropdownProps) {
  const links = useMemo<NavLink[]>(() => {
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
      <div className={`flex min-h-14 items-center transition-colors ${hasActiveChild ? 'bg-gray-100 text-primary' : ''}`}>
        <Link
          href={item.href || '#'}
          target={item.target}
          onClick={onClose}
          className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${isActive(pathname, item.href) ? 'text-primary' : ''}`}>
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
          className="flex h-14 w-14 items-center justify-center">
          <FaChevronDown size={18} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>
      <div className={`grid overflow-hidden transition-all duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
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
                      className={`block px-10 py-3 transition-colors duration-200 ${
                        active ? 'bg-gray-100 font-medium text-primary' : 'hover:bg-gray-50'
                      }`}>
                      <div className="text-sm">{child.label}</div>
                      {child.description && <div className="mt-1 text-xs text-gray-500">{child.description}</div>}
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
                  <h3 className="text-base font-semibold">{item.mega.title}</h3>
                  {item.mega.description && <p className="mt-2 text-sm text-gray-500">{item.mega.description}</p>}
                  {item.mega.buttonText && item.mega.buttonHref && (
                    <Link
                      href={item.mega.buttonHref}
                      onClick={onClose}
                      className={`mt-3 inline-flex text-sm font-medium transition-colors ${
                        isActive(pathname, item.mega.buttonHref) ? 'text-primary' : ''
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
                        className={`text-sm font-semibold transition-colors ${isActive(pathname, column.href) ? 'text-primary' : ''}`}>
                        {column.title}
                      </Link>
                    ) : (
                      <div className="text-sm font-semibold">{column.title}</div>
                    )}
                    {column.description && <div className="mt-1 text-xs text-gray-500">{column.description}</div>}
                    {column.buttonText && column.buttonHref && (
                      <Link
                        href={column.buttonHref}
                        onClick={onClose}
                        className={`mt-2 block text-xs font-medium transition-colors ${
                          isActive(pathname, column.buttonHref) ? 'text-primary' : ''
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
                            className={`block px-12 py-3 transition-colors duration-200 ${
                              active ? 'bg-gray-100 font-medium text-primary' : 'hover:bg-gray-50'
                            }`}>
                            <div className="text-sm">{link.label}</div>
                            {link.description && <div className="mt-1 text-xs text-gray-500">{link.description}</div>}
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
