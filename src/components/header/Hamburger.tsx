'use client'

type HamburgerProps = {
  open: boolean
  onClick: () => void
}

export default function Hamburger({
  open,
  onClick,
}: HamburgerProps) {
  return (
    <button
      type="button"
      aria-label={
        open ? 'Close Menu' : 'Open Menu'
      }
      aria-expanded={open}
      onClick={onClick}
      className="relative flex h-11 w-11 items-center justify-center text-white"
    >
      <span className="sr-only">
        {open ? 'Close Menu' : 'Open Menu'}
      </span>

      <span
        className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ${
          open
            ? 'rotate-45'
            : '-translate-y-2'
        }`}
      />

      <span
        className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ${
          open
            ? 'opacity-0'
            : 'opacity-100'
        }`}
      />

      <span
        className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ${
          open
            ? '-rotate-45'
            : 'translate-y-2'
        }`}
      />
    </button>
  )
}