export type NavLink = {
  label: string
  href: string
  description?: string
  badge?: string
  target?: '_self' | '_blank'
}

export type MegaColumn = {
  title: string
  href?: string
  description?: string
  buttonText?: string
  buttonHref?: string
  links: NavLink[]
}

export type MegaFeatured = {
  title: string
  description?: string
  href: string
  buttonText?: string
  image?: string
}

export type MegaMenuContent = {
  title?: string
  description?: string
  buttonText?: string
  buttonHref?: string
  columns: MegaColumn[]
  featured?: MegaFeatured
}

export type MenuItem = {
  id: string
  label: string
  href?: string
  target?: '_self' | '_blank'
  badge?: string
  type?: 'link' | 'dropdown' | 'mega'
  children?: NavLink[]
  mega?: MegaMenuContent
}