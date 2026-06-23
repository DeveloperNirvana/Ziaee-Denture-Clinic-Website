'use client'

import { useEffect } from 'react'
import { HiXMark } from "react-icons/hi2";
import MobileMenu from './MobileMenu'
import Image from 'next/image';
import type { MenuItem } from './types'

type MobileSidebarProps = {
  open: boolean
  pathname: string
  items: MenuItem[]
  onClose: () => void
}

export default function MobileSidebar({
  open,
  pathname,
  items,
  onClose,
}: MobileSidebarProps) {
  useEffect(() => {
    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (open) {
      window.addEventListener(
        'keydown',
        handleEscape
      )
    }

    return () => {
      window.removeEventListener(
        'keydown',
        handleEscape
      )
    }
  }, [open, onClose])

  return (
    <>
      <div
        aria-hidden={!open}
        onClick={onClose}
        className={`fixed inset-0 z-90 bg-black/20 backdrop-blur-sm transition-all duration-300 lg:hidden ${
          open
            ? 'visible opacity-100'
            : 'invisible opacity-0'
        }`}
      />

      <aside
        aria-hidden={!open}
        className={`fixed right-0 top-0 z-100 h-dvh w-full max-w-95 bg-white shadow-2xl transition-transform duration-300 lg:hidden ${
          open
            ? 'translate-x-0'
            : 'translate-x-full'
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-black/20 px-6">
          <div>
            <div className="text-lg font-semibold">
               <Image src="/images/logo.svg" alt="Ziaee Denture" width={49} height={50} />
            </div>
          </div>

          <button
            type="button"
            aria-label="Close Menu"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-md border transition-colors hover:bg-gray-50"
          >
            <HiXMark size={20} />
          </button>
        </div>

        <div className="h-[calc(100dvh-80px)] overflow-y-auto">
          <MobileMenu
            pathname={pathname}
            items={items}
            onClose={onClose}
          />
        </div>
      </aside>
    </>
  )
}