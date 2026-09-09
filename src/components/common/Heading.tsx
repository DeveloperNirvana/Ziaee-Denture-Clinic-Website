type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
type HeadingProps = {
  as?: HeadingTag;
  variant?: HeadingVariant;
  className?: string;
  children: React.ReactNode;
};
const variants: Record<HeadingVariant, string> = {
  xs: 'text-xl',
  sm: 'text-2xl',
  md: 'text-2xl',
  lg: 'text-3xl',
  xl: 'text-4xl lg:text-[40px]',
  xxl: 'text-4xl lg:text-[40px]  xl:text-[42px] uppercase'
};
export default function Heading({ as: Tag = 'h2', variant = 'lg', className = '', children }: HeadingProps) {
  return <Tag className={`font-normal font-sans-flex text-primary leading-[1.1]! ${variants[variant]} ${className}`}>{children}</Tag>;
}