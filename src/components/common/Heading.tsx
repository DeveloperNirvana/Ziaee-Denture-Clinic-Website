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
  lg: 'text-3xl lg:text-[40px]',
  xl: 'text-[33px] lg:text-[40px] xl:text-[46px]',
  xxl: 'text-[33px] lg:text-[42px] xl:text-[50px] uppercase lg:leading-none xl:leading-none'
};
export default function Heading({ as: Tag = 'h2', variant = 'lg', className = '', children }: HeadingProps) {
  return <Tag className={`font-normal text- font-fabulous text-primary leading-tight ${variants[variant]} ${className}`}>{children}</Tag>;
}