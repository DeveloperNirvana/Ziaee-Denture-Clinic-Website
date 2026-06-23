'use client'

import Link from 'next/link'
import DesktopDropdown from './DesktopDropdown'
import DesktopMegaMenu from './DesktopMegaMenu'
import type { MenuItem } from './types'

type DesktopMenuProps = {
  items: MenuItem[]
  pathname: string
}

function isActive(pathname: string, href?: string) {
  if (!href) return false

  if (href === '/') {
    return pathname === '/'
  }

  return pathname.startsWith(href)
}

export default function DesktopMenu({
  items,
  pathname,
}: DesktopMenuProps) {
  return (
    <nav
      aria-label="Primary Navigation"
      className="hidden h-full lg:flex"
    >
      <ul className="flex h-full items-center  gap-5">
        {items.map((item) => {
          if (item.type === 'dropdown') {
            return (
              <li
                key={item.id}
                className="h-full"
              >
                <DesktopDropdown
                  item={item}
                  pathname={pathname}
                />
              </li>
            )
          }

          if (item.type === 'mega') {
            return (
              <li
                key={item.id}
                className="h-full"
              >
                <DesktopMegaMenu
                  item={item}
                  pathname={pathname}
                />
              </li>
            )
          }

          const active = isActive(
            pathname,
            item.href
          )

          return (
            <li
              key={item.id}
              className="h-full"
            >
              <Link
                href={item.href || '#'}
                target={item.target}
                aria-current={
                  active ? 'page' : undefined
                }
                className={`relative flex h-full items-center text-sm font-normal transition-colors duration-200 uppercase text-white-blue text-shadow-2xs ${
                  active
                    ? 'text-primary'
                    : 'hover:text-white'
                }`}
              >
                {item.label}

                {item.badge && (
                  <span className="ml-2 rounded-full border px-2 py-0.5 text-[10px]">
                    {item.badge}
                  </span>
                )}

                <span
                  className={`absolute bottom-5 left-0 h-0.5 w-full bg-current transition-transform duration-300 ${
                    active
                      ? 'scale-x-100'
                      : 'scale-x-0'
                  }`}
                />
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}