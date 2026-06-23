'use client';
import Link from 'next/link';
import { FaArrowRight, FaChevronDown } from "react-icons/fa6";
import type { MenuItem } from './types';
type DesktopMegaMenuProps = {
  item: MenuItem;
  pathname: string;
};
function isActive(pathname: string, href?: string) {
  if (!href) return false;
  if (href === '/') {
    return pathname === '/';
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
export default function DesktopMegaMenu({ item, pathname }: DesktopMegaMenuProps) {
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
      <div className={`flex h-full items-center gap-2 transition-colors hover:text-primary ${parentActive ? 'text-primary' : ''}`}>
        <Link href={item.href || '#'} className="text-sm font-medium">
          {item.label}
        </Link>
        <FaChevronDown size={16} className="transition-transform duration-300 group-hover:rotate-180" />
      </div>
      <div className="invisible fixed left-0 top-20 z-40 w-screen translate-y-4 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        <div className="border-t bg-white shadow-xl">
          <div className="mx-auto max-w-360 px-6 py-10 lg:px-8">
            {(mega.title || mega.description || mega.buttonText) && (
              <div className="mb-10 border-b pb-8">
                {mega.title && <h2 className="text-2xl font-semibold">{mega.title}</h2>}
                {mega.description && <p className="mt-3 max-w-3xl text-sm text-gray-600">{mega.description}</p>}
                {mega.buttonText && mega.buttonHref && (
                  <Link
                    href={mega.buttonHref}
                    className={`mt-5 inline-flex items-center gap-2 text-sm font-medium transition-colors ${
                      isActive(pathname, mega.buttonHref) ? 'text-primary' : 'hover:text-primary'
                    }`}>
                    {mega.buttonText}
                    <FaChevronDown size={16} />
                  </Link>
                )}
              </div>
            )}
            <div className={`grid gap-8 ${gridCols}`}>
              {mega.columns.map((column) => {
                const columnActive = isActive(pathname, column.href);
                return (
                  <div key={column.title}>
                    <div className="mb-4">
                      {column.href ? (
                        <Link
                          href={column.href}
                          className={`inline-flex items-center gap-2 text-base font-semibold transition-colors ${
                            columnActive ? 'text-primary' : 'hover:text-primary'
                          }`}>
                          {column.title}
                        </Link>
                      ) : (
                        <h3 className="text-base font-semibold">{column.title}</h3>
                      )}
                      {column.description && <p className="mt-2 text-sm text-gray-500">{column.description}</p>}
                      {column.buttonText && column.buttonHref && (
                        <Link
                          href={column.buttonHref}
                          className={`mt-3 inline-flex items-center gap-2 text-sm font-medium transition-colors ${
                            isActive(pathname, column.buttonHref) ? 'text-primary' : 'hover:text-primary'
                          }`}>
                          {column.buttonText}
                          <FaArrowRight  size={14} />
                        </Link>
                      )}
                    </div>
                    <ul className="space-y-2">
                      {column.links.map((link) => {
                        const active = isActive(pathname, link.href);
                        return (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              target={link.target}
                              aria-current={active ? 'page' : undefined}
                              className={`block rounded-lg px-3 py-2 transition-colors duration-200 ${
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
                );
              })}
              {mega.featured && (
                <div className="rounded-2xl border p-6">
                  <h3 className="text-xl font-semibold">{mega.featured.title}</h3>
                  {mega.featured.description && <p className="mt-3 text-sm text-gray-600">{mega.featured.description}</p>}
                  <Link
                    href={mega.featured.href}
                    className={`mt-6 inline-flex items-center gap-2 text-sm font-medium transition-colors ${
                      isActive(pathname, mega.featured.href) ? 'text-primary' : 'hover:text-primary'
                    }`}>
                    {mega.featured.buttonText ?? 'Learn More'}
                    <FaArrowRight size={16} />
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
