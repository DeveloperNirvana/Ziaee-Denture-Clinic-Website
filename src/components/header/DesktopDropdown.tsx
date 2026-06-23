'use client'

import Link from 'next/link'
import { FaChevronDown } from "react-icons/fa6"
import type { MenuItem } from './types'

type DesktopDropdownProps = {
  item: MenuItem
  pathname: string
}

function isActive(pathname: string, href?: string) {
  if (!href) return false

  if (href === '/') {
    return pathname === '/'
  }

  return pathname.startsWith(href)
}

export default function DesktopDropdown({
  item,
  pathname,
}: DesktopDropdownProps) {
const parentActive =
  isActive(pathname, item.href) ||
  item.children?.some((child) =>
    isActive(pathname, child.href)
  ) ||
  false

  return (
    <div className="group relative flex h-full items-center">
  <div
  className={`flex h-full items-center gap-2 ${
    parentActive
      ? 'text-primary'
      : 'hover:text-primary'
  }`}
>
  <Link
    href={item.href || '#'}
    className="text-sm font-medium"
  >
    {item.label}
  </Link>

  <FaChevronDown
    size={16}
    className="transition-transform duration-300 group-hover:rotate-180"
  />
</div>

      <div className="invisible absolute left-0 top-full z-50 min-w-70 translate-y-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        <div className="overflow-hidden rounded-xl border bg-white shadow-xl">
          <div className="py-2">
            {item.children?.map((child) => {
              const active = isActive(
                pathname,
                child.href
              )

              return (
                <Link
                  key={child.href}
                  href={child.href}
                  target={child.target}
                  aria-current={
                    active ? 'page' : undefined
                  }
                  className={`block px-5 py-3 transition-colors duration-200 ${
                    active
                      ? 'bg-gray-100 font-medium text-primary'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="text-sm font-medium">
                    {child.label}
                  </div>

                  {child.description && (
                    <div className="mt-1 text-xs text-gray-500">
                      {child.description}
                    </div>
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}