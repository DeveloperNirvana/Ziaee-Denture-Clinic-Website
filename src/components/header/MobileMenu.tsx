'use client'

import Link from 'next/link'
import MobileDropdown from './MobileDropdown'
import type { MenuItem } from './types'

type MobileMenuProps = {
  pathname: string
  items: MenuItem[]
  onClose: () => void
}

function isActive(
  pathname: string,
  href?: string
) {
  if (!href) return false

  if (href === '/') {
    return pathname === '/'
  }

  return pathname.startsWith(href)
}

export default function MobileMenu({
  pathname,
  items,
  onClose,
}: MobileMenuProps) {
  return (
    <nav
      aria-label="Mobile Navigation"
      className="pb-4"
    >
      <ul>
        {items.map((item) => {
          if (
            item.type === 'dropdown' ||
            item.type === 'mega'
          ) {
            return (
              <li
                key={item.id}
                className="border-b"
              >
                <MobileDropdown
                  item={item}
                  pathname={pathname}
                  onClose={onClose}
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
              className="border-b border-black/10"
            >
              <Link
                href={item.href || '#'}
                target={item.target}
                onClick={onClose}
                aria-current={
                  active ? 'page' : undefined
                }
                className={`flex min-h-14 items-center  text-secondary justify-between px-6 text-sm font-medium transition-colors duration-500 uppercase ${
                  active
                    ? 'bg-white-blue'
                    : 'hover:bg-gray-50'
                }`}
              >
                <span>{item.label}</span>

                {item.badge && (
                  <span className="rounded-full border px-2 py-0.5 text-[10px]">
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          )
        })}
      </ul>


    </nav>
  )
}