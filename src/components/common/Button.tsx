'use client';
import Link from 'next/link';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
type Variant = 'solid' | 'outline' | 'soft' | 'ghost';
type Color = 'primary' | 'secondary' | 'white' | 'success' | 'danger';
type Size = 'xs' | 'sm' | 'md' | 'lg';
type Rounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
type Animation = 'none' | 'slide-right' | 'slide-left' | 'slide-top' | 'slide-bottom';
type ButtonType = 'button' | 'submit' | 'reset';
type ArrowPosition = 'left' | 'right';
type ArrowStyle = 'default' | 'circle';
export type ButtonItem = {
  label: ReactNode;
  href?: string;
  target?: '_self' | '_blank';
  rel?: string;
  type?: ButtonType;
  variant?: Variant;
  color?: Color;
  size?: Size;
  rounded?: Rounded;
  animation?: Animation;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  arrow?: boolean;
  arrowPosition?: ArrowPosition;
  arrowStyle?: ArrowStyle;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
};
export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  children?: ReactNode;
  href?: string;
  target?: '_self' | '_blank';
  rel?: string;
  variant?: Variant;
  color?: Color;
  size?: Size;
  rounded?: Rounded;
  animation?: Animation;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  arrow?: boolean;
  arrowPosition?: ArrowPosition;
  arrowStyle?: ArrowStyle;
  loading?: boolean;
  fullWidth?: boolean;
  buttons?: ButtonItem[];
  className?: string;
}
const sizes: Record<Size, string> = {
  xs: 'h-8 px-3 text-xs',
  sm: 'h-10 px-4 text-sm',
  md: 'h-12.5 px-6 text-base',
  lg: 'h-14 px-8 text-lg'
};
const roundedStyles: Record<Rounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full'
};
const variants: Record<Color, Record<Variant, string>> = {
  primary: {
    solid: 'bg-primary border-primary text-white before:bg-white hover:text-primary',
    outline: 'border-primary text-primary before:bg-primary hover:text-white',
    soft: 'bg-primary/10 border-primary/10 text-primary before:bg-primary hover:text-white',
    ghost: 'border-transparent text-primary before:bg-primary hover:text-white'
  },
  secondary: {
    solid: 'bg-secondary border-secondary text-white before:bg-white hover:text-secondary',
    outline: 'border-secondary text-secondary before:bg-secondary hover:text-white',
    soft: 'bg-secondary/10 border-secondary/10 text-secondary before:bg-secondary hover:text-white',
    ghost: 'border-transparent text-secondary before:bg-secondary hover:text-white'
  },
  white: {
    solid: 'bg-white border-white text-secondary before:bg-primary hover:text-white hover:border-primary',
    outline: 'border-white text-white before:bg-white hover:text-secondary',
    soft: 'bg-white/10 border-white/10 text-white before:bg-white hover:text-secondary',
    ghost: 'border-transparent text-white before:bg-white hover:text-secondary'
  },
  success: {
    solid: 'bg-green-600 border-green-600 text-white before:bg-white hover:text-green-600',
    outline: 'border-green-600 text-green-600 before:bg-green-600 hover:text-white',
    soft: 'bg-green-600/10 border-green-600/10 text-green-600 before:bg-green-600 hover:text-white',
    ghost: 'border-transparent text-green-600 before:bg-green-600 hover:text-white'
  },
  danger: {
    solid: 'bg-red-600 border-red-600 text-white before:bg-white hover:text-red-600',
    outline: 'border-red-600 text-red-600 before:bg-red-600 hover:text-white',
    soft: 'bg-red-600/10 border-red-600/10 text-red-600 before:bg-red-600 hover:text-white',
    ghost: 'border-transparent text-red-600 before:bg-red-600 hover:text-white'
  }
};
const animations: Record<Animation, string> = {
  none: '',
  'slide-right': 'before:absolute before:top-0 before:-left-full before:h-full before:w-full hover:before:left-0',
  'slide-left': 'before:absolute before:top-0 before:-right-full before:h-full before:w-full hover:before:right-0',
  'slide-top': 'before:absolute before:left-0 before:top-full before:h-full before:w-full hover:before:top-0',
  'slide-bottom': 'before:absolute before:left-0 before:-top-full before:h-full before:w-full hover:before:top-0'
};
function getClasses({
  variant,
  color,
  size,
  rounded,
  animation,
  fullWidth,
  className
}: {
  variant: Variant;
  color: Color;
  size: Size;
  rounded: Rounded;
  animation: Animation;
  fullWidth?: boolean;
  className?: string;
}) {
  return [
    'group relative inline-flex items-center justify-center overflow-hidden border font-medium transition-all duration-300  leading-none',
    'before:transition-all before:duration-300',
    'disabled:pointer-events-none disabled:opacity-50',
    sizes[size],
    roundedStyles[rounded],
    variants[color][variant],
    animations[animation],
    fullWidth ? 'w-full' : '',
    className ?? ''
  ]
    .filter(Boolean)
    .join(' ');
}
function Arrow({ style, color = 'primary', variant = 'solid' }: { style: ArrowStyle; color?: Color; variant?: Variant }) {
  const arrow = (
    <FiArrowUpRight className="text-2xl transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
  );
  if (style !== 'circle') {
    return arrow;
  }
  const circleClass = (() => {
    switch (variant) {
      case 'solid':
        if (color === 'white') {
          return 'bg-white-blue text-secondary';
        }
        return `bg-white ${
          color === 'primary'
            ? 'text-secondary'
            : color === 'secondary'
              ? 'text-primary'
              : color === 'success'
                ? 'text-green-600'
                : 'text-red-600'
        }`;
      case 'outline':
      case 'soft':
      case 'ghost':
        if (color === 'white') {
          return 'bg-white text-secondary';
        }
        return `${
          color === 'primary'
            ? 'bg-primary text-white'
            : color === 'secondary'
              ? 'bg-secondary text-white'
              : color === 'success'
                ? 'bg-green-600 text-white'
                : 'bg-red-600 text-white'
        }`;
      default:
        return 'bg-white text-primary';
    }
  })();
  return (
    <span
      className={`flex h-10.5 w-10.5 items-center justify-center rounded-full transition-transform duration-500  group-hover:bg-black/30! group-hover:text-white! ${circleClass}`}>
      {arrow}
    </span>
  );
}
function RenderButton({
  label,
  href,
  target,
  rel,
  type = 'button',
  variant = 'solid',
  color = 'primary',
  size = 'md',
  rounded = 'md',
  animation = 'slide-right',
  leftIcon,
  rightIcon,
  arrow,
  arrowPosition = 'right',
  arrowStyle = 'default',
  disabled,
  loading,
  fullWidth,
  className,
  onClick
}: ButtonItem) {
  const classes = getClasses({
    variant,
    color,
    size,
    rounded,
    animation,
    fullWidth,
    className
  });
  const content = (
    <span className="relative z-10 flex items-center gap-3">
      {arrow && arrowPosition === 'left' ? <Arrow style={arrowStyle} color={color} variant={variant} /> : leftIcon}
      {loading ? 'Loading...' : label}
      {arrow && arrowPosition === 'right' ? <Arrow style={arrowStyle} color={color} variant={variant} /> : rightIcon}
    </span>
  );
  if (href) {
    return (
      <Link href={href} target={target} rel={rel} className={classes}>
        {content}
      </Link>
    );
  }
  return (
    <button type={type} disabled={disabled || loading} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
export default function Button({
  children,
  href,
  target,
  rel,
  variant = 'solid',
  color = 'primary',
  size = 'md',
  rounded = 'md',
  animation = 'slide-right',
  leftIcon,
  rightIcon,
  arrow,
  arrowPosition = 'right',
  arrowStyle = 'default',
  loading,
  fullWidth,
  buttons,
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  if (buttons?.length) {
    return (
      <div className="flex flex-wrap items-center gap-4">
        {buttons.map((button, index) => (
          <RenderButton key={index} {...button} />
        ))}
      </div>
    );
  }
  const classes = getClasses({
    variant,
    color,
    size,
    rounded,
    animation,
    fullWidth,
    className
  });
  const content = (
    <span className="relative z-10 flex items-center gap-3">
      {arrow && arrowPosition === 'left' ? <Arrow style={arrowStyle} color={color} /> : leftIcon}
      {loading ? 'Loading...' : children}
      {arrow && arrowPosition === 'right' ? <Arrow style={arrowStyle} color={color} /> : rightIcon}
    </span>
  );
  if (href) {
    return (
      <Link href={href} target={target} rel={rel} className={classes}>
        {content}
      </Link>
    );
  }
  return (
    <button {...props} type={type} disabled={loading || props.disabled} className={classes}>
      {content}
    </button>
  );
}
